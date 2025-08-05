import { vi } from 'vitest';
import { useRoute, useRouter } from 'vue-router';

export function mockRoute(meta = {}) {
  const route = {
    meta,
    path: '/test',
    name: 'Test',
  };

  vi.mocked(useRoute).mockReturnValue(route);
  return route;
}

export function mockRouter() {
  const mockPush = vi.fn();
  const mockRouter = {
    push: mockPush,
  };

  vi.mocked(useRouter).mockReturnValue(mockRouter);
  return { router: mockRouter, push: mockPush };
}

export function createTestStore(actions = {}) {
  const mockActions = {};

  Object.keys(actions).forEach((actionName) => {
    mockActions[actionName] = vi.fn();
  });

  return {
    state: {
      player: null,
    },
    actions: mockActions,
    getters: {},
    mutations: {},
  };
}

export function resetMocks() {
  vi.clearAllMocks();
}

export function createMockHorse(overrides = {}) {
  return {
    id: 1,
    name: 'Thunder',
    color: { value: '#FF0000' },
    currentDistance: 500,
    place: null,
    condition: 'good',
    coef: 2.5,
    bet: null,
    ...overrides,
  };
}

export function createMockProgram(overrides = {}) {
  return {
    lap: 1,
    distance: 1000,
    horses: [
      createMockHorse(),
      createMockHorse({ id: 2, name: 'Lightning', color: { value: '#00FF00' } }),
    ],
    raceFinished: false,
    ...overrides,
  };
}

export function createMockGameStore(currentProgram = null) {
  return {
    state: {
      horseList: [],
      programList: [],
      currentProgram,
      raceInterval: null,
    },
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
  };
}
