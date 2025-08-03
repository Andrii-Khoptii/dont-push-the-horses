import gameStore from '@features/game/stores/gameStore';
import { DEFAULT_BALANCE } from '@utils/constants';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      player: {},
    };
  },
  getters: {},
  mutations: {
    initPlayer(state, playerData) {
      state.player = playerData;
    },
  },
  actions: {
    initPlayer(context, playerName) {
      context.commit('initPlayer', { name: playerName, balance: DEFAULT_BALANCE });
    },
  },

  modules: {
    game: gameStore,
  },
});

export default store;
