import { AVG_HORSE_SPEED, BETTING_OUTPUT_MAX, BETTING_OUTPUT_MIN, LAPS, MAX_HORSE_CONDITION, MAX_SPEED_CONDITION_COEF, MIN_HORSE_CONDITION, MIN_SPEED_CONDITION_COEF, RANDOM_FACTOR_COEF_MAX, RANDOM_FACTOR_COEF_MIN, TRACK_LINES } from '@utils/constants';

export class GameService {
  static getSpeedCoefFromCondition(condition) {
    // X  | MIN_HORSE_CONDITION      | 10  | 20  | 30  | 40  | 50  | 60  | 70  | 80  | 90  | 100 | MAX_HORSE_CONDITION      |
    // Y  | MIN_SPEED_CONDITION_COEF | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 | 1.1 | 1.2 | MAX_SPEED_CONDITION_COEF |

    // linear interpolation formula: y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)

    return MIN_SPEED_CONDITION_COEF + ((condition - MIN_HORSE_CONDITION) * (MAX_SPEED_CONDITION_COEF - MIN_SPEED_CONDITION_COEF)) / (MAX_HORSE_CONDITION - MIN_HORSE_CONDITION);
  }

  static getRandomFactor() {
    return RANDOM_FACTOR_COEF_MIN + Math.random() * (RANDOM_FACTOR_COEF_MAX - RANDOM_FACTOR_COEF_MIN);
  }

  static calculateHorseWinCoef(horseList, currentHorseIdx) {
    const currentHorse = horseList[currentHorseIdx];
    const currentCondition = currentHorse.condition;

    const otherHorsesConditions = horseList.filter((_, idx) => idx !== currentHorseIdx).map(horse => horse.condition);

    const avgOtherCondition = otherHorsesConditions.reduce((sum, condition) => sum + condition, 0) / otherHorsesConditions.length;

    // Invert the ratio for better liniar transformation on betting odds
    const relativeStrength = avgOtherCondition / currentCondition;

    // Linear transformation that maps one range to another formula:
    // q = (v - A) * (D - C) / (B - A) + C

    const A = MIN_HORSE_CONDITION / MAX_HORSE_CONDITION;
    const B = MAX_HORSE_CONDITION / MIN_HORSE_CONDITION;
    const C = BETTING_OUTPUT_MIN;
    const D = BETTING_OUTPUT_MAX;

    return ((relativeStrength - A) * (D - C) / (B - A) + C).toFixed(2);
  }

  static calculateHorseSpeed(condition) {
    const speedCoef = this.getRandomFactor() * this.getSpeedCoefFromCondition(condition);
    return AVG_HORSE_SPEED * speedCoef;
  }

  static raceTick(currentProgram) {
    const updatedProgram = {
      ...currentProgram,
      raceStarted: true,
      horses: currentProgram.horses.map((horse) => {
        if (horse.currentDistance >= currentProgram.distance) {
          return horse;
        }

        horse.runningTime += 1; // 1s

        const horseSpeed = this.calculateHorseSpeed(horse.condition);

        const speedMs = horseSpeed / 3.6; // kph to m/s conversion
        horse.currentDistance += speedMs;

        return horse;
      }),
    };

    const tickFinishers = updatedProgram.horses.filter(horse => !horse.place && horse.currentDistance >= currentProgram.distance).sort((a, b) => b.currentDistance - a.currentDistance);

    tickFinishers.forEach((horse) => {
      const prevPlace = Math.max(0, ...currentProgram.horses.filter(({ place }) => !!place).map(({ place }) => place));
      horse.place = prevPlace + 1;
    });

    updatedProgram.raceFinished = updatedProgram.horses.every(({ place }) => !!place);

    return updatedProgram;
  }

  static pickHorses(horseList) {
    if (TRACK_LINES > horseList.length) {
      throw new Error('Count cannot be greater than array length');
    }

    const arrayCopy = [...horseList];
    const result = [];

    for (let i = 0; i < TRACK_LINES; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy.splice(randomIndex, 1)[0]);
    }

    return result;
  }

  static generateProgram(horseList, lap) {
    const horses = this.pickHorses(horseList);

    const program = {
      horses: horses.map((item, idx) => ({
        ...item,
        coef: this.calculateHorseWinCoef(horses, idx),
        bet: null,
        place: null,
        runningTime: null,
        currentDistance: 0,
      })),
      lap,
      distance: 1200 + ((lap - 1) * 200),
      raceStarted: false,
      raceFinished: false,
    };

    return program;
  }

  static generateProgramList(horseList) {
    const programs = [];

    for (let i = 1; i <= LAPS; i++) {
      programs.push(this.generateProgram(horseList, i));
    }

    return programs;
  }
}
