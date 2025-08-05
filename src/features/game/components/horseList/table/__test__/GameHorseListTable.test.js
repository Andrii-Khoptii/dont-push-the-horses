import { createMockHorse } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import GameHorseListTable from '../GameHorseListTable.vue';
import GameHorseListTableRow from '../GameHorseListTableRow.vue';

vi.mock('../GameHorseListTableRow.vue', () => ({
  default: {
    name: 'GameHorseListTableRow',
    props: ['row'],
    template: '<div class="mock-table-row">{{ row.name }} - {{ row.id }}</div>',
  },
}));

vi.mock('@ui', () => ({
  UITable: {
    name: 'UITable',
    props: ['table-data'],
    template: '<div class="mock-ui-table"><slot></slot></div>',
  },
}));

describe('feature GameHorseListTable', () => {
  let mockStore;
  let wrapper;

  const createMockStore = (horseList = []) => {
    return {
      state: {
        gameStore: {
          horseList,
        },
      },
      getters: {},
      mutations: {},
      actions: {},
    };
  };

  const mockHorseList = [
    createMockHorse({ id: 1, name: 'Thunder', condition: 'good' }),
    createMockHorse({ id: 2, name: 'Lightning', condition: 'excellent' }),
    createMockHorse({ id: 3, name: 'Storm', condition: 'fair' }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = createMockStore();
    vi.mocked(useStore).mockReturnValue(mockStore);
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      expect(wrapper.findComponent({ name: 'UITable' }).exists()).toBe(true);
    });

    it('should render GameHorseListTableRow components for each horse', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableRows = wrapper.findAllComponents(GameHorseListTableRow);
      expect(tableRows).toHaveLength(3);
    });

    it('should pass correct props to GameHorseListTableRow components', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableRows = wrapper.findAllComponents(GameHorseListTableRow);

      expect(tableRows[0].props('row')).toEqual(mockHorseList[0]);
      expect(tableRows[1].props('row')).toEqual(mockHorseList[1]);
      expect(tableRows[2].props('row')).toEqual(mockHorseList[2]);
    });

    it('should not render table rows when horseList is empty', () => {
      mockStore.state.gameStore.horseList = [];
      wrapper = mount(GameHorseListTable);

      const tableRows = wrapper.findAllComponents(GameHorseListTableRow);
      expect(tableRows).toHaveLength(0);
    });
  });

  describe('table Data Management', () => {
    it('should initialize table data with correct structure', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;

      expect(tableData).toHaveProperty('sort');
      expect(tableData).toHaveProperty('values');
      expect(tableData).toHaveProperty('columns');
      expect(tableData).toHaveProperty('sortFunction');
      expect(Array.isArray(tableData.sort)).toBe(true);
      expect(Array.isArray(tableData.values)).toBe(true);
      expect(Array.isArray(tableData.columns)).toBe(true);
      expect(typeof tableData.sortFunction).toBe('function');
    });

    it('should have correct table columns structure', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const columns = wrapper.vm.tableData.columns;

      expect(columns).toHaveLength(4);
      expect(columns[0]).toEqual({ id: 'number', title: '#', isSort: true });
      expect(columns[1]).toEqual({ id: 'name', title: 'Name', isSort: true });
      expect(columns[2]).toEqual({ id: 'condition', title: 'Condition', align: 'center', isSort: true });
      expect(columns[3]).toEqual({ id: 'color', title: 'Color', align: 'right' });
    });

    it('should populate values when horseList is available', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      expect(tableData.values).toEqual(mockHorseList);
    });

    it('should initialize with default sort', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      expect(tableData.sort).toHaveLength(1);
      expect(tableData.sort[0]).toEqual({ field: 'number', direction: 'asc' });
    });
  });

  describe('sorting Functionality', () => {
    it('should sort by number in ascending order by default', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      const sortedValues = tableData.values;

      expect(sortedValues[0].id).toBe(1);
      expect(sortedValues[1].id).toBe(2);
      expect(sortedValues[2].id).toBe(3);
    });

    it('should sort by number in descending order', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      tableData.sortFunction('number', 'desc');

      const sortedValues = tableData.values;
      expect(sortedValues[0].id).toBe(3);
      expect(sortedValues[1].id).toBe(2);
      expect(sortedValues[2].id).toBe(1);
    });

    it('should sort by name in ascending order', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      tableData.sortFunction('name', 'asc');

      const sortedValues = tableData.values;
      expect(sortedValues[0].name).toBe('Lightning');
      expect(sortedValues[1].name).toBe('Storm');
      expect(sortedValues[2].name).toBe('Thunder');
    });

    it('should sort by name in descending order', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      tableData.sortFunction('name', 'desc');

      const sortedValues = tableData.values;
      expect(sortedValues[0].name).toBe('Thunder');
      expect(sortedValues[1].name).toBe('Storm');
      expect(sortedValues[2].name).toBe('Lightning');
    });

    it('should sort by condition in ascending order', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      tableData.sortFunction('condition', 'asc');

      const sortedValues = tableData.values;

      expect(sortedValues).toHaveLength(3);
      expect(sortedValues.map(v => v.condition)).toContain('excellent');
      expect(sortedValues.map(v => v.condition)).toContain('fair');
      expect(sortedValues.map(v => v.condition)).toContain('good');
    });
  });

  describe('constants and Utilities', () => {
    it('should have correct FIELD_MAPPINGS constant', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const expectedMappings = {
        number: 'id',
        name: 'name',
        condition: 'condition',
      };

      expect(wrapper.vm.FIELD_MAPPINGS).toEqual(expectedMappings);
    });

    it('should have correct SORT_TYPES constant', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const expectedSortTypes = {
        NUMERIC: 'numeric',
        ALPHABETIC: 'alphabetic',
      };

      expect(wrapper.vm.SORT_TYPES).toEqual(expectedSortTypes);
    });

    it('should have correct TABLE_COLUMNS constant', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const expectedColumns = [
        { id: 'number', title: '#', isSort: true },
        { id: 'name', title: 'Name', isSort: true },
        { id: 'condition', title: 'Condition', align: 'center', isSort: true },
        { id: 'color', title: 'Color', align: 'right' },
      ];

      expect(wrapper.vm.TABLE_COLUMNS).toEqual(expectedColumns);
    });
  });

  describe('utility Functions', () => {
    it('should get correct sort type for different fields', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      expect(wrapper.vm.getSortType('name')).toBe('alphabetic');
      expect(wrapper.vm.getSortType('number')).toBe('numeric');
      expect(wrapper.vm.getSortType('condition')).toBe('numeric');
    });

    it('should get comparable values correctly', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      const horse = mockHorseList[0];

      expect(wrapper.vm.getComparableValue(horse, 'name', 'alphabetic')).toBe('thunder');
      expect(wrapper.vm.getComparableValue(horse, 'number', 'numeric')).toBe(1);
      expect(wrapper.vm.getComparableValue(horse, 'condition', 'numeric')).toBe('good');
    });

    it('should compare values correctly for alphabetic sorting', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      expect(wrapper.vm.compareValues('a', 'b', 'asc', 'alphabetic')).toBeLessThan(0);
      expect(wrapper.vm.compareValues('b', 'a', 'asc', 'alphabetic')).toBeGreaterThan(0);
      expect(wrapper.vm.compareValues('a', 'b', 'desc', 'alphabetic')).toBeGreaterThan(0);
    });

    it('should compare values correctly for numeric sorting', () => {
      mockStore.state.gameStore.horseList = mockHorseList;
      wrapper = mount(GameHorseListTable);

      expect(wrapper.vm.compareValues(1, 2, 'asc', 'numeric')).toBeLessThan(0);
      expect(wrapper.vm.compareValues(2, 1, 'asc', 'numeric')).toBeGreaterThan(0);
      expect(wrapper.vm.compareValues(1, 2, 'desc', 'numeric')).toBeGreaterThan(0);
    });
  });

  describe('store Integration', () => {
    it('should initialize with empty values', () => {
      wrapper = mount(GameHorseListTable);

      expect(wrapper.vm.tableData.values).toEqual([]);
    });

    it('should have table data structure', () => {
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      expect(tableData).toHaveProperty('values');
      expect(tableData).toHaveProperty('sort');
      expect(tableData).toHaveProperty('columns');
    });

    it('should have sort function', () => {
      wrapper = mount(GameHorseListTable);

      const tableData = wrapper.vm.tableData;
      expect(typeof tableData.sortFunction).toBe('function');
    });
  });

  describe('edge Cases', () => {
    it('should handle null horseList', async () => {
      wrapper = mount(GameHorseListTable);

      mockStore.state.gameStore.horseList = null;
      await wrapper.vm.$nextTick();

      const tableData = wrapper.vm.tableData;
      expect(tableData.values).toEqual([]);
    });

    it('should handle undefined horseList', async () => {
      wrapper = mount(GameHorseListTable);

      mockStore.state.gameStore.horseList = undefined;
      await wrapper.vm.$nextTick();

      const tableData = wrapper.vm.tableData;
      expect(tableData.values).toEqual([]);
    });

    it('should handle empty horseList', async () => {
      wrapper = mount(GameHorseListTable);

      mockStore.state.gameStore.horseList = [];
      await wrapper.vm.$nextTick();

      const tableData = wrapper.vm.tableData;
      expect(tableData.values).toEqual([]);
    });
  });
});
