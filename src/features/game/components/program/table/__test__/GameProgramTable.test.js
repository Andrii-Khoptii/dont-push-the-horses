import { createMockHorse } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameProgramTable from '../GameProgramTable.vue';
import GameProgramTableRow from '../GameProgramTableRow.vue';

vi.mock('../GameProgramTableRow.vue', () => ({
  default: {
    name: 'GameProgramTableRow',
    props: ['row', 'program'],
    template: '<div class="mock-table-row">{{ row.name }} - {{ program.lap }}</div>',
  },
}));

vi.mock('@ui', () => ({
  UITable: {
    name: 'UITable',
    props: ['table-data'],
    template: '<div class="mock-ui-table"><slot></slot></div>',
  },
}));

describe('feature GameProgramTable', () => {
  let wrapper;

  const createMockProgramWithHorses = (overrides = {}) => {
    return {
      lap: 1,
      distance: 1000,
      horses: [
        createMockHorse({ id: 1, name: 'Thunder', coef: 2.5 }),
        createMockHorse({ id: 2, name: 'Lightning', coef: 3.0 }),
        createMockHorse({ id: 3, name: 'Storm', coef: 1.8 }),
      ],
      raceStarted: false,
      raceFinished: false,
      ...overrides,
    };
  };

  const defaultProps = {
    program: createMockProgramWithHorses(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props Validation', () => {
    it('should require program prop', () => {
      expect(() => {
        mount(GameProgramTable, {
          props: {},
        });
      }).toThrow();
    });

    it('should accept valid props', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      expect(wrapper.props('program')).toEqual(defaultProps.program);
    });
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      expect(wrapper.findComponent({ name: 'UITable' }).exists()).toBe(true);
    });

    it('should render GameProgramTableRow components for each horse', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);
      expect(tableRows).toHaveLength(3);
    });

    it('should pass correct props to GameProgramTableRow components', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);

      expect(tableRows[0].props('row')).toEqual(defaultProps.program.horses[0]);
      expect(tableRows[0].props('program')).toEqual(defaultProps.program);

      expect(tableRows[1].props('row')).toEqual(defaultProps.program.horses[1]);
      expect(tableRows[1].props('program')).toEqual(defaultProps.program);
    });

    it('should not render table rows when horses array is empty', () => {
      const emptyProgram = {
        ...defaultProps.program,
        horses: [],
      };

      wrapper = mount(GameProgramTable, {
        props: {
          program: emptyProgram,
        },
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);
      expect(tableRows).toHaveLength(0);
    });
  });

  describe('computed Properties', () => {
    describe('tableData', () => {
      it('should compute table data correctly', () => {
        wrapper = mount(GameProgramTable, {
          props: defaultProps,
        });

        const expectedColumns = [
          { id: 'number', title: '#' },
          { id: 'name', title: 'Name' },
          { id: 'coef', title: 'Coef', align: 'center' },
          { id: 'bets', title: 'Bets', align: 'center' },
          { id: 'time', title: 'Time', align: 'center' },
          { id: 'place', title: 'Place', align: 'center' },
        ];

        expect(wrapper.vm.tableData.values).toEqual(defaultProps.program.horses);
        expect(wrapper.vm.tableData.columns).toEqual(expectedColumns);
      });

      it('should have correct column structure', () => {
        wrapper = mount(GameProgramTable, {
          props: defaultProps,
        });

        const columns = wrapper.vm.tableData.columns;

        expect(columns).toHaveLength(6);
        expect(columns[0]).toEqual({ id: 'number', title: '#' });
        expect(columns[1]).toEqual({ id: 'name', title: 'Name' });
        expect(columns[2]).toEqual({ id: 'coef', title: 'Coef', align: 'center' });
        expect(columns[3]).toEqual({ id: 'bets', title: 'Bets', align: 'center' });
        expect(columns[4]).toEqual({ id: 'time', title: 'Time', align: 'center' });
        expect(columns[5]).toEqual({ id: 'place', title: 'Place', align: 'center' });
      });
    });
  });

  describe('table Structure', () => {
    it('should render UITable component with table data', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      const uiTable = wrapper.findComponent({ name: 'UITable' });
      expect(uiTable.exists()).toBe(true);
    });

    it('should have correct table data structure', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      const tableData = wrapper.vm.tableData;

      expect(tableData).toHaveProperty('values');
      expect(tableData).toHaveProperty('columns');
      expect(Array.isArray(tableData.values)).toBe(true);
      expect(Array.isArray(tableData.columns)).toBe(true);
    });
  });

  describe('edge Cases', () => {
    it('should handle program with null horses', () => {
      const nullHorsesProgram = {
        ...defaultProps.program,
        horses: null,
      };

      wrapper = mount(GameProgramTable, {
        props: {
          program: nullHorsesProgram,
        },
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);
      expect(tableRows).toHaveLength(0);
    });

    it('should handle program with undefined horses', () => {
      const undefinedHorsesProgram = {
        ...defaultProps.program,
        horses: undefined,
      };

      wrapper = mount(GameProgramTable, {
        props: {
          program: undefinedHorsesProgram,
        },
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);
      expect(tableRows).toHaveLength(0);
    });

    it('should handle program without horses property', () => {
      const noHorsesProgram = {
        lap: 1,
        distance: 1000,
        raceStarted: false,
        raceFinished: false,
      };

      wrapper = mount(GameProgramTable, {
        props: {
          program: noHorsesProgram,
        },
      });

      const tableRows = wrapper.findAllComponents(GameProgramTableRow);
      expect(tableRows).toHaveLength(0);
    });
  });

  describe('constants', () => {
    it('should have correct TABLE_COLUMNS constant', () => {
      wrapper = mount(GameProgramTable, {
        props: defaultProps,
      });

      const expectedColumns = [
        { id: 'number', title: '#' },
        { id: 'name', title: 'Name' },
        { id: 'coef', title: 'Coef', align: 'center' },
        { id: 'bets', title: 'Bets', align: 'center' },
        { id: 'time', title: 'Time', align: 'center' },
        { id: 'place', title: 'Place', align: 'center' },
      ];

      expect(wrapper.vm.TABLE_COLUMNS).toEqual(expectedColumns);
    });
  });
});
