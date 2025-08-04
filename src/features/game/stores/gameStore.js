import { DEFAULT_BET, LAPS } from '@utils/constants';
import { getRandomCondition } from '@utils/helpers';
import { MOCK_HORSE_LIST } from '@utils/mock';
import { GameService } from '../services/gameService';

const gameStore = {
  state() {
    return {
      horseList: [],
      programList: [],
      currentProgram: null,
      raceInterval: null,
    };
  },
  getters: {},
  mutations: {
    setHorses(state, data) {
      state.horseList = data;
    },

    setPrograms(state, data) {
      state.programList = data;
    },

    setCurrentProgram(state, data) {
      state.currentProgram = data;
    },

    setRaceInterval(state, data) {
      state.raceInterval = data;
    },

    clearRaceInterval(state) {
      clearInterval(state.raceInterval);
      state.raceInterval = null;
    },
  },
  actions: {
    fetchHorses({ commit }) {
      const data = MOCK_HORSE_LIST.map(horse => ({ ...horse, condition: getRandomCondition() }));
      commit('setHorses', data);
    },

    generateProgramList({ state, commit }) {
      const programs = GameService.generateProgramList(state.horseList);
      commit('setPrograms', programs);
      commit('setCurrentProgram', programs[0]);
    },

    startRace({ state, commit, dispatch, rootState }) {
      if (state.raceInterval) {
        return;
      }

      const interval = setInterval(() => {
        const currentProgram = GameService.raceTick(state.currentProgram);

        const updatedProgramsList = state.programList.map((program) => {
          if (program.lap === currentProgram.lap) {
            return currentProgram;
          }
          return program;
        });
        commit('setPrograms', updatedProgramsList);

        if (currentProgram.raceFinished) {
          const horseWithBet = currentProgram.horses.find(({ bet }) => bet);

          if (horseWithBet && horseWithBet.place === 1) {
            const newBalance = rootState.player.balance + DEFAULT_BET * horseWithBet.coef;
            dispatch('updateBalance', newBalance, { root: true });
          }

          if (currentProgram.lap !== LAPS) {
            commit('setCurrentProgram', state.programList[currentProgram.lap]);
            return;
          }

          commit('clearRaceInterval');
          return;
        }

        commit('setCurrentProgram', currentProgram);
      }, 50);

      commit('setRaceInterval', interval);
    },

    pauseRace({ commit }) {
      commit('clearRaceInterval');
    },

    horseBet({ commit, state }, data) {
      const updatedProgramList = state.programList.map((program) => {
        if (program.lap === data.lap) {
          return {
            ...program,
            horses: program.horses.map((horse) => {
              if (horse.id === data.horseId) {
                horse.bet = DEFAULT_BET;
              }
              return horse;
            }),
          };
        }
        return program;
      });

      commit('setPrograms', updatedProgramList);
    },
  },

};

export default gameStore;
