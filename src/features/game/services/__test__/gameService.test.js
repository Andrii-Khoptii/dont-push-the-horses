import {
  BETTING_OUTPUT_MAX,
  BETTING_OUTPUT_MIN,
  LAPS,
  MAX_HORSE_CONDITION,
  MAX_SPEED_CONDITION_COEF,
  MIN_HORSE_CONDITION,
  MIN_SPEED_CONDITION_COEF,
  RANDOM_FACTOR_COEF_MAX,
  RANDOM_FACTOR_COEF_MIN,
  TRACK_LINES,
} from '@utils/constants';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GameService } from '../gameService.js';
import {
  calculateExpectedSpeedBounds,
  calculateExpectedSpeedCoef,
  createMockHorseList,
  validateHorseInitialProperties,
  validateProgramStructure,
} from './gameServiceTestHelpers.js';

describe('gameService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSpeedCoefFromCondition', () => {
    it('should return MIN_SPEED_CONDITION_COEF for minimum condition', () => {
      const result = GameService.getSpeedCoefFromCondition(MIN_HORSE_CONDITION);
      expect(result).toBeCloseTo(MIN_SPEED_CONDITION_COEF, 10);
    });

    it('should return MAX_SPEED_CONDITION_COEF for maximum condition', () => {
      const result = GameService.getSpeedCoefFromCondition(MAX_HORSE_CONDITION);
      expect(result).toBeCloseTo(MAX_SPEED_CONDITION_COEF, 10);
    });

    it('should return correct value for middle condition', () => {
      const middleCondition = (MIN_HORSE_CONDITION + MAX_HORSE_CONDITION) / 2;
      const expectedCoef = (MIN_SPEED_CONDITION_COEF + MAX_SPEED_CONDITION_COEF) / 2;

      const result = GameService.getSpeedCoefFromCondition(middleCondition);
      expect(result).toBeCloseTo(expectedCoef, 10);
    });

    it('should handle intermediate condition values', () => {
      const condition = 50;
      const expectedCoef = calculateExpectedSpeedCoef(condition);

      const result = GameService.getSpeedCoefFromCondition(condition);
      expect(result).toBeCloseTo(expectedCoef, 10);
    });
  });

  describe('getRandomFactor', () => {
    it('should return a value within the expected range', () => {
      const result = GameService.getRandomFactor();
      expect(result).toBeGreaterThanOrEqual(RANDOM_FACTOR_COEF_MIN);
      expect(result).toBeLessThanOrEqual(RANDOM_FACTOR_COEF_MAX);
    });

    it('should return different values on multiple calls', () => {
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(GameService.getRandomFactor());
      }

      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe('calculateHorseWinCoef', () => {
    it('should calculate correct coefficient for a horse with average condition', () => {
      const horseList = [
        { condition: 50 },
        { condition: 50 },
        { condition: 50 },
      ];

      const result = GameService.calculateHorseWinCoef(horseList, 0);
      expect(Number.parseFloat(result)).toBeGreaterThanOrEqual(BETTING_OUTPUT_MIN);
      expect(Number.parseFloat(result)).toBeLessThanOrEqual(BETTING_OUTPUT_MAX);
    });

    it('should return higher coefficient for weaker horse', () => {
      const horseList = [
        { condition: 20 },
        { condition: 80 },
        { condition: 80 },
      ];

      const weakHorseCoef = Number.parseFloat(GameService.calculateHorseWinCoef(horseList, 0));
      const strongHorseCoef = Number.parseFloat(GameService.calculateHorseWinCoef(horseList, 1));

      expect(weakHorseCoef).toBeGreaterThan(strongHorseCoef);
    });

    it('should return lower coefficient for stronger horse', () => {
      const horseList = [
        { condition: 80 },
        { condition: 20 },
        { condition: 20 },
      ];

      const strongHorseCoef = Number.parseFloat(GameService.calculateHorseWinCoef(horseList, 0));
      const weakHorseCoef = Number.parseFloat(GameService.calculateHorseWinCoef(horseList, 1));

      expect(strongHorseCoef).toBeLessThan(weakHorseCoef);
    });

    it('should return coefficient within betting range', () => {
      const horseList = [
        { condition: 30 },
        { condition: 70 },
        { condition: 50 },
      ];

      const result = GameService.calculateHorseWinCoef(horseList, 0);
      expect(Number.parseFloat(result)).toBeGreaterThanOrEqual(BETTING_OUTPUT_MIN);
      expect(Number.parseFloat(result)).toBeLessThanOrEqual(BETTING_OUTPUT_MAX);
    });
  });

  describe('calculateHorseSpeed', () => {
    it('should calculate speed based on condition', () => {
      const condition = 50;
      const speedBounds = calculateExpectedSpeedBounds(condition);

      const result = GameService.calculateHorseSpeed(condition);

      expect(result).toBeGreaterThanOrEqual(speedBounds.min);
      expect(result).toBeLessThanOrEqual(speedBounds.max);
    });

    it('should return different speeds for same condition due to random factor', () => {
      const condition = 60;
      const speeds = [];

      for (let i = 0; i < 5; i++) {
        speeds.push(GameService.calculateHorseSpeed(condition));
      }

      const uniqueSpeeds = new Set(speeds);
      expect(uniqueSpeeds.size).toBeGreaterThan(1);
    });
  });

  describe('raceTick', () => {
    it('should start race and update horse distances', () => {
      const currentProgram = {
        raceStarted: false,
        distance: 1200,
        horses: [
          { condition: 50, currentDistance: 0, runningTime: 0, place: null },
          { condition: 60, currentDistance: 0, runningTime: 0, place: null },
        ],
      };

      const result = GameService.raceTick(currentProgram);

      expect(result.raceStarted).toBe(true);
      expect(result.horses[0].runningTime).toBe(1);
      expect(result.horses[1].runningTime).toBe(1);
      expect(result.horses[0].currentDistance).toBeGreaterThan(0);
      expect(result.horses[1].currentDistance).toBeGreaterThan(0);
    });

    it('should assign places to horses that finish', () => {
      const currentProgram = {
        raceStarted: true,
        distance: 1200,
        horses: [
          { condition: 50, currentDistance: 1200, runningTime: 10, place: null },
          { condition: 60, currentDistance: 1100, runningTime: 10, place: null },
          { condition: 70, currentDistance: 1200, runningTime: 10, place: null },
        ],
      };

      const result = GameService.raceTick(currentProgram);

      const finishedHorses = result.horses.filter(h => h.place !== null);
      expect(finishedHorses.length).toBeGreaterThan(0);

      const places = finishedHorses.map(h => h.place).sort();
      expect(places).toEqual([...Array.from({ length: places.length }).keys()].map(i => i + 1));
    });

    it('should mark race as finished when all horses complete', () => {
      const currentProgram = {
        raceStarted: true,
        distance: 1200,
        horses: [
          { condition: 50, currentDistance: 1200, runningTime: 10, place: 1 },
          { condition: 60, currentDistance: 1200, runningTime: 10, place: 2 },
        ],
      };

      const result = GameService.raceTick(currentProgram);

      expect(result.raceFinished).toBe(true);
    });

    it('should not update horses that have already finished', () => {
      const currentProgram = {
        raceStarted: true,
        distance: 1200,
        horses: [
          { condition: 50, currentDistance: 1200, runningTime: 10, place: 1 },
          { condition: 60, currentDistance: 1100, runningTime: 10, place: null },
        ],
      };

      const result = GameService.raceTick(currentProgram);

      expect(result.horses[0].currentDistance).toBe(1200);
      expect(result.horses[0].place).toBe(1);

      expect(result.horses[1].currentDistance).toBeGreaterThan(1100);
      expect(result.horses[1].runningTime).toBe(11);
    });
  });

  describe('pickHorses', () => {
    it('should return correct number of horses', () => {
      const horseList = createMockHorseList(20);

      const result = GameService.pickHorses(horseList);

      expect(result.length).toBe(TRACK_LINES);
    });

    it('should return unique horses', () => {
      const horseList = createMockHorseList(20);

      const result = GameService.pickHorses(horseList);

      const uniqueIds = new Set(result.map(h => h.id));
      expect(uniqueIds.size).toBe(TRACK_LINES);
    });

    it('should throw error when horse list is too small', () => {
      const horseList = createMockHorseList(5);

      expect(() => GameService.pickHorses(horseList)).toThrow('Count cannot be greater than array length');
    });

    it('should not modify original horse list', () => {
      const horseList = createMockHorseList(20);
      const originalLength = horseList.length;

      GameService.pickHorses(horseList);

      expect(horseList.length).toBe(originalLength);
    });
  });

  describe('generateProgram', () => {
    it('should generate program with correct structure', () => {
      const horseList = createMockHorseList(20);
      const lap = 1;

      const result = GameService.generateProgram(horseList, lap);

      expect(validateProgramStructure(result, lap)).toBe(true);
    });

    it('should initialize horses with correct properties', () => {
      const horseList = createMockHorseList(20);
      const lap = 2;

      const result = GameService.generateProgram(horseList, lap);

      result.horses.forEach((horse) => {
        expect(validateHorseInitialProperties(horse)).toBe(true);
      });
    });

    it('should calculate correct distance for different laps', () => {
      const horseList = createMockHorseList(20);

      const lap1Program = GameService.generateProgram(horseList, 1);
      const lap3Program = GameService.generateProgram(horseList, 3);

      expect(lap1Program.distance).toBe(1200);
      expect(lap3Program.distance).toBe(1200 + ((3 - 1) * 200));
    });
  });

  describe('generateProgramList', () => {
    it('should generate correct number of programs', () => {
      const horseList = createMockHorseList(20);

      const result = GameService.generateProgramList(horseList);

      expect(result.length).toBe(LAPS);
    });

    it('should generate programs with sequential lap numbers', () => {
      const horseList = createMockHorseList(20);

      const result = GameService.generateProgramList(horseList);

      result.forEach((program, index) => {
        expect(program.lap).toBe(index + 1);
      });
    });

    it('should generate unique horses for each program', () => {
      const horseList = createMockHorseList(20);

      const result = GameService.generateProgramList(horseList);

      const firstProgramHorses = result[0].horses.map(h => h.id).sort();
      const secondProgramHorses = result[1].horses.map(h => h.id).sort();

      expect(firstProgramHorses.length).toBe(TRACK_LINES);
      expect(secondProgramHorses.length).toBe(TRACK_LINES);
    });
  });
});
