import gameStore from '@features/game/stores/gameStore';
import { DEFAULT_BALANCE, LOCAL_STORAGE_KEY } from '@utils/constants';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      player: null,
    };
  },
  getters: {},
  mutations: {
    initPlayer(state, playerData) {
      state.player = playerData;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.player));
    },

    setBalance(state, data) {
      state.player.balance = data;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.player));
    },
  },
  actions: {
    initPlayer({ commit }, playerName) {
      commit('initPlayer', { name: playerName, balance: DEFAULT_BALANCE });
    },

    updateBalance({ commit }, data) {
      commit('setBalance', data);
    },
  },

  modules: {
    gameStore,
  },
});

export default store;
