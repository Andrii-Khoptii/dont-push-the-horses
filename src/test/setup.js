import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { setupLayoutMocks } from './mocks/layouts.js';

config.global.stubs = {
  'router-link': true,
  'router-view': true,
};

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('vuex', () => ({
  useStore: vi.fn(),
  createStore: vi.fn(),
}));

vi.mock('@features/game/stores/gameStore', () => ({
  default: {
    state: () => ({
      horseList: [],
      programList: [],
      currentProgram: null,
      raceInterval: null,
    }),
    getters: {},
    mutations: {
      setHorses: vi.fn(),
      setPrograms: vi.fn(),
      setCurrentProgram: vi.fn(),
      setRaceInterval: vi.fn(),
      clearRaceInterval: vi.fn(),
    },
    actions: {
      fetchHorses: vi.fn(),
      generateProgramList: vi.fn(),
      startRace: vi.fn(),
      pauseRace: vi.fn(),
      horseBet: vi.fn(),
    },
  },
}));

setupLayoutMocks();
