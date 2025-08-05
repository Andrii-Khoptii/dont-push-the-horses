import { createMockHorse } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import GameProgramTableRow from '../GameProgramTableRow.vue';

vi.mock('@ui', () => ({
  UIButton: {
    name: 'UIButton',
    props: ['variant', 'size'],
    template: '<button class="mock-ui-button"><slot></slot></button>',
  },
  UITableRow: {
    name: 'UITableRow',
    template: '<tr class="mock-ui-table-row"><slot></slot></tr>',
  },
  UITableTd: {
    name: 'UITableTd',
    props: ['align'],
    template: '<td class="mock-ui-table-td"><slot></slot></td>',
  },
}));

vi.mock('@utils/constants', () => ({
  DEFAULT_BET: 100,
}));

vi.mock('@utils/helpers', () => ({
  secondsToHHMMSS: vi.fn(seconds => `00:${seconds.toString().padStart(2, '0')}:00`),
}));

describe('feature GameProgramTableRow', () => {
  let mockStore;
  let wrapper;

  const createMockProgramWithState = (overrides = {}) => {
    return {
      lap: 1,
      distance: 1000,
      horses: [
        createMockHorse({ id: 1, name: 'Thunder', coef: 2.5 }),
        createMockHorse({ id: 2, name: 'Lightning', coef: 3.0 }),
      ],
      raceStarted: false,
      raceFinished: false,
      ...overrides,
    };
  };

  const createMockHorseWithState = (overrides = {}) => {
    return {
      id: 1,
      name: 'Thunder',
      color: { value: '#FF0000' },
      coef: 2.5,
      bet: null,
      place: null,
      runningTime: null,
      ...overrides,
    };
  };

  const defaultProps = {
    row: createMockHorseWithState(),
    program: createMockProgramWithState(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = {
      state: {
        player: {
          balance: 1000,
        },
      },
      dispatch: vi.fn(),
    };
    vi.mocked(useStore).mockReturnValue(mockStore);
  });

  describe('props Validation', () => {
    it('should require row prop', () => {
      expect(() => {
        mount(GameProgramTableRow, {
          props: {
            program: defaultProps.program,
          },
        });
      }).toThrow();
    });

    it('should require program prop', () => {
      expect(() => {
        mount(GameProgramTableRow, {
          props: {
            row: defaultProps.row,
          },
        });
      }).toThrow();
    });

    it('should accept valid props', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      expect(wrapper.props('row')).toEqual(defaultProps.row);
      expect(wrapper.props('program')).toEqual(defaultProps.program);
    });
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      expect(wrapper.find('.mock-ui-table-row').exists()).toBe(true);
    });

    it('should display horse ID with correct color', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const horseId = wrapper.find('span[style*="color: rgb(255, 0, 0)"]');
      expect(horseId.exists()).toBe(true);
      expect(horseId.text()).toBe('1');
    });

    it('should display horse name with correct color', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const horseName = wrapper.findAll('span[style*="color: rgb(255, 0, 0)"]')[1];
      expect(horseName.exists()).toBe(true);
      expect(horseName.text()).toBe('Thunder');
    });

    it('should display horse coefficient', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const coefCell = wrapper.findAll('.mock-ui-table-td')[2];
      expect(coefCell.text()).toBe('2.5');
    });
  });

  describe('computed Properties', () => {
    describe('hideBets', () => {
      it('should hide bets when race has started', () => {
        const programWithStartedRace = {
          ...defaultProps.program,
          raceStarted: true,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            ...defaultProps,
            program: programWithStartedRace,
          },
        });

        expect(wrapper.vm.hideBets).toBe(true);
      });

      it('should hide bets when any horse has a bet', () => {
        const programWithBets = {
          ...defaultProps.program,
          horses: [
            { ...defaultProps.row, bet: 100 },
            createMockHorseWithState({ id: 2 }),
          ],
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            ...defaultProps,
            program: programWithBets,
          },
        });

        expect(wrapper.vm.hideBets).toBe(true);
      });

      it('should hide bets when player balance is insufficient', () => {
        mockStore.state.player.balance = 50; // Less than DEFAULT_BET (100)

        wrapper = mount(GameProgramTableRow, {
          props: defaultProps,
        });

        expect(wrapper.vm.hideBets).toBe(true);
      });

      it('should show bets when conditions are met', () => {
        mockStore.state.player.balance = 1000;
        const programWithoutBets = {
          ...defaultProps.program,
          raceStarted: false,
          horses: [
            { ...defaultProps.row, bet: null },
            createMockHorseWithState({ id: 2, bet: null }),
          ],
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            ...defaultProps,
            program: programWithoutBets,
          },
        });

        expect(wrapper.vm.hideBets).toBe(false);
      });
    });

    describe('betStatus', () => {
      it('should return green text for winning bet', () => {
        const finishedProgram = {
          ...defaultProps.program,
          raceFinished: true,
        };
        const winningHorse = {
          ...defaultProps.row,
          bet: 100,
          place: 1,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: winningHorse,
            program: finishedProgram,
          },
        });

        expect(wrapper.vm.betStatus).toBe('text-green-500');
      });

      it('should return red text for losing bet', () => {
        const finishedProgram = {
          ...defaultProps.program,
          raceFinished: true,
        };
        const losingHorse = {
          ...defaultProps.row,
          bet: 100,
          place: 2,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: losingHorse,
            program: finishedProgram,
          },
        });

        expect(wrapper.vm.betStatus).toBe('text-red-500');
      });

      it('should return empty string when no bet', () => {
        const finishedProgram = {
          ...defaultProps.program,
          raceFinished: true,
        };
        const horseWithoutBet = {
          ...defaultProps.row,
          bet: null,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: horseWithoutBet,
            program: finishedProgram,
          },
        });

        expect(wrapper.vm.betStatus).toBe('');
      });

      it('should return empty string when race not finished', () => {
        const unfinishedProgram = {
          ...defaultProps.program,
          raceFinished: false,
        };
        const horseWithBet = {
          ...defaultProps.row,
          bet: 100,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: horseWithBet,
            program: unfinishedProgram,
          },
        });

        expect(wrapper.vm.betStatus).toBe('');
      });
    });

    describe('placeStatus', () => {
      it('should return "Running..." when race started and no place', () => {
        const startedProgram = {
          ...defaultProps.program,
          raceStarted: true,
        };
        const runningHorse = {
          ...defaultProps.row,
          place: null,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: runningHorse,
            program: startedProgram,
          },
        });

        expect(wrapper.vm.placeStatus).toBe('Running...');
      });

      it('should return place number when race started and has place', () => {
        const startedProgram = {
          ...defaultProps.program,
          raceStarted: true,
        };
        const placedHorse = {
          ...defaultProps.row,
          place: 1,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: placedHorse,
            program: startedProgram,
          },
        });

        expect(wrapper.vm.placeStatus).toBe(1);
      });

      it('should return "Waiting..." when race not started', () => {
        const notStartedProgram = {
          ...defaultProps.program,
          raceStarted: false,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            ...defaultProps,
            program: notStartedProgram,
          },
        });

        expect(wrapper.vm.placeStatus).toBe('Waiting...');
      });
    });

    describe('placeClasses', () => {
      it('should return yellow background for 1st place', () => {
        const firstPlaceHorse = {
          ...defaultProps.row,
          place: 1,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: firstPlaceHorse,
            program: defaultProps.program,
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-yellow-400');
      });

      it('should return gray background for 2nd place', () => {
        const secondPlaceHorse = {
          ...defaultProps.row,
          place: 2,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: secondPlaceHorse,
            program: defaultProps.program,
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-gray-300');
      });

      it('should return amber background for 3rd place', () => {
        const thirdPlaceHorse = {
          ...defaultProps.row,
          place: 3,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: thirdPlaceHorse,
            program: defaultProps.program,
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-amber-700');
      });

      it('should return empty string for other places', () => {
        const otherPlaceHorse = {
          ...defaultProps.row,
          place: 4,
        };

        wrapper = mount(GameProgramTableRow, {
          props: {
            row: otherPlaceHorse,
            program: defaultProps.program,
          },
        });

        expect(wrapper.vm.placeClasses).toBe('');
      });

      it('should return empty string when no place', () => {
        wrapper = mount(GameProgramTableRow, {
          props: defaultProps,
        });

        expect(wrapper.vm.placeClasses).toBe('');
      });
    });
  });

  describe('betting Functionality', () => {
    it('should show bet button when bets are not hidden', () => {
      mockStore.state.player.balance = 1000;
      const programWithoutBets = {
        ...defaultProps.program,
        raceStarted: false,
        horses: [
          { ...defaultProps.row, bet: null },
          createMockHorseWithState({ id: 2, bet: null }),
        ],
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          ...defaultProps,
          program: programWithoutBets,
        },
      });

      const betButton = wrapper.find('.mock-ui-button');
      expect(betButton.exists()).toBe(true);
      expect(betButton.text()).toBe('Bet');
    });

    it('should hide bet button when bets are hidden', () => {
      const programWithStartedRace = {
        ...defaultProps.program,
        raceStarted: true,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          ...defaultProps,
          program: programWithStartedRace,
        },
      });

      const betButton = wrapper.find('.mock-ui-button');
      expect(betButton.exists()).toBe(false);
    });

    it('should display bet amount when horse has bet', () => {
      const horseWithBet = {
        ...defaultProps.row,
        bet: 100,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithBet,
          program: defaultProps.program,
        },
      });

      const betAmount = wrapper.findAll('span').find(span => span.text() === '100');
      expect(betAmount.exists()).toBe(true);
    });

    it('should call placeBet function when bet button is clicked', async () => {
      mockStore.state.player.balance = 1000;
      const programWithoutBets = {
        ...defaultProps.program,
        raceStarted: false,
        horses: [
          { ...defaultProps.row, bet: null },
          createMockHorseWithState({ id: 2, bet: null }),
        ],
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          ...defaultProps,
          program: programWithoutBets,
        },
      });

      const betButton = wrapper.find('.mock-ui-button');
      await betButton.trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledWith('updateBalance', 900);
      expect(mockStore.dispatch).toHaveBeenCalledWith('horseBet', {
        bet: 100,
        lap: 1,
        horseId: 1,
      });
    });
  });

  describe('time Display', () => {
    it('should display formatted time when running time is available', () => {
      const horseWithTime = {
        ...defaultProps.row,
        runningTime: 65,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithTime,
          program: defaultProps.program,
        },
      });

      const timeCell = wrapper.findAll('.mock-ui-table-td')[4];
      expect(timeCell.text()).toBe('00:65:00');
    });

    it('should display dash when no running time', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const timeCell = wrapper.findAll('.mock-ui-table-td')[4];
      expect(timeCell.text()).toBe('-');
    });
  });

  describe('place Display', () => {
    it('should display place circle for 1st, 2nd, and 3rd places', () => {
      const placedHorse = {
        ...defaultProps.row,
        place: 1,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: placedHorse,
          program: defaultProps.program,
        },
      });

      const placeCircle = wrapper.find('.w-8.h-8.mx-auto.text-primary-foreground.shadow-md.rounded-full');
      expect(placeCircle.exists()).toBe(true);
      expect(placeCircle.text()).toBe('1');
      expect(placeCircle.classes()).toContain('bg-yellow-400');
    });

    it('should display place status text for other places', () => {
      const otherPlaceHorse = {
        ...defaultProps.row,
        place: 4,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: otherPlaceHorse,
          program: defaultProps.program,
        },
      });

      const placeStatus = wrapper.findAll('.mock-ui-table-td')[5];
      expect(placeStatus.text()).toBe('Waiting...');
    });

    it('should display "Running..." when race started and no place', () => {
      const startedProgram = {
        ...defaultProps.program,
        raceStarted: true,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          ...defaultProps,
          program: startedProgram,
        },
      });

      const placeStatus = wrapper.findAll('.mock-ui-table-td')[5];
      expect(placeStatus.text()).toBe('Running...');
    });
  });

  describe('edge Cases', () => {
    it('should handle horse with null bet', () => {
      const horseWithNullBet = {
        ...defaultProps.row,
        bet: null,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithNullBet,
          program: defaultProps.program,
        },
      });

      expect(wrapper.vm.betStatus).toBe('');
    });

    it('should handle horse with undefined bet', () => {
      const horseWithUndefinedBet = {
        ...defaultProps.row,
        bet: undefined,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithUndefinedBet,
          program: defaultProps.program,
        },
      });

      expect(wrapper.vm.betStatus).toBe('');
    });

    it('should handle horse with null place', () => {
      const horseWithNullPlace = {
        ...defaultProps.row,
        place: null,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithNullPlace,
          program: defaultProps.program,
        },
      });

      expect(wrapper.vm.placeClasses).toBe('');
    });

    it('should handle horse with undefined place', () => {
      const horseWithUndefinedPlace = {
        ...defaultProps.row,
        place: undefined,
      };

      wrapper = mount(GameProgramTableRow, {
        props: {
          row: horseWithUndefinedPlace,
          program: defaultProps.program,
        },
      });

      expect(wrapper.vm.placeClasses).toBe('');
    });
  });

  describe('styling and Layout', () => {
    it('should have correct table cell classes', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells).toHaveLength(6);
    });

    it('should have correct height classes', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const heightCells = wrapper.findAll('.h-20');
      expect(heightCells.length).toBeGreaterThan(0);
    });

    it('should have correct width classes for time and place cells', () => {
      wrapper = mount(GameProgramTableRow, {
        props: defaultProps,
      });

      const timeCell = wrapper.findAll('[class*="w-[150px]"]');
      const placeCell = wrapper.findAll('[class*="w-[125px]"]');

      expect(timeCell.length).toBeGreaterThan(0);
      expect(placeCell.length).toBeGreaterThan(0);
    });
  });
});
