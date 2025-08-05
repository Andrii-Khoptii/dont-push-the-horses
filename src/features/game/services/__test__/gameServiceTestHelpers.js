import {
  AVG_HORSE_SPEED,
  MAX_HORSE_CONDITION,
  MAX_SPEED_CONDITION_COEF,
  MIN_HORSE_CONDITION,
  MIN_SPEED_CONDITION_COEF,
  RANDOM_FACTOR_COEF_MAX,
  RANDOM_FACTOR_COEF_MIN,
  TRACK_LINES,
} from '@utils/constants';

export function createMockHorse(overrides = {}) {
  return {
    id: 1,
    name: 'Test Horse',
    condition: 50,
    currentDistance: 0,
    runningTime: 0,
    place: null,
    bet: null,
    coef: null,
    ...overrides,
  };
}

export function createMockHorseList(count = 20, baseOverrides = {}) {
  return Array.from({ length: count }, (_, i) => createMockHorse({
    id: i,
    name: `Horse ${i}`,
    condition: 30 + (i * 3),
    ...baseOverrides,
  }));
}

export function createMockProgram(overrides = {}) {
  return {
    horses: createMockHorseList(TRACK_LINES),
    lap: 1,
    distance: 1200,
    raceStarted: false,
    raceFinished: false,
    ...overrides,
  };
}

export function calculateExpectedSpeedCoef(condition) {
  return MIN_SPEED_CONDITION_COEF
    + ((condition - MIN_HORSE_CONDITION) * (MAX_SPEED_CONDITION_COEF - MIN_SPEED_CONDITION_COEF))
    / (MAX_HORSE_CONDITION - MIN_HORSE_CONDITION);
}

export function calculateExpectedSpeedBounds(condition) {
  const speedCoef = calculateExpectedSpeedCoef(condition);
  return {
    min: AVG_HORSE_SPEED * RANDOM_FACTOR_COEF_MIN * speedCoef,
    max: AVG_HORSE_SPEED * RANDOM_FACTOR_COEF_MAX * speedCoef,
  };
}

export function validateProgramStructure(program, expectedLap = 1) {
  return (
    program.lap === expectedLap
    && program.horses.length === TRACK_LINES
    && program.raceStarted === false
    && program.raceFinished === false
    && program.distance === (1200 + ((expectedLap - 1) * 200))
  );
}

export function validateHorseInitialProperties(horse) {
  return (
    horse.coef !== null
    && horse.bet === null
    && horse.place === null
    && horse.runningTime === null
    && horse.currentDistance === 0
    && horse.condition !== undefined
  );
}
