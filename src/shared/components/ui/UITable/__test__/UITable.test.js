import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UITable from '../UITable.vue';

vi.mock('../UITableRow.vue', () => ({
  default: {
    name: 'UITableRow',
    template: '<tr><slot /></tr>',
  },
}));

vi.mock('../UITableTh.vue', () => ({
  default: {
    name: 'UITableTh',
    props: ['column', 'sort', 'sortFunction'],
    template: '<th>{{ column.title }}</th>',
  },
}));

describe('component UITable', () => {
  let mockTableData;
  let mockSortFunction;

  beforeEach(() => {
    mockSortFunction = vi.fn();
    mockTableData = {
      columns: [
        { id: 'name', title: 'Name', isSort: true },
        { id: 'age', title: 'Age', isSort: false },
        { id: 'email', title: 'Email', isSort: true },
      ],
      sort: [
        { field: 'name', direction: 'asc' },
      ],
      sortFunction: mockSortFunction,
    };
  });

  describe('props validation', () => {
    it('should require tableData prop', () => {
      expect(() => {
        mount(UITable);
      }).toThrow();
    });

    it('should accept valid tableData object', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('rendering', () => {
    it('should render table with correct structure', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      expect(wrapper.find('[data-testid="ui-table"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="ui-table"]').classes()).toContain('w-full');
      expect(wrapper.find('[data-testid="ui-table"]').classes()).toContain('text-sm');
    });

    it('should render thead with border class', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const thead = wrapper.find('thead');
      expect(thead.exists()).toBe(true);
      expect(thead.classes()).toContain('border-b');
    });

    it('should render tbody with slot content', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
        slots: {
          default: '<tr><td>Test content</td></tr>',
        },
      });

      const tbody = wrapper.find('tbody');
      expect(tbody.exists()).toBe(true);
      expect(tbody.text()).toBe('Test content');
    });
  });

  describe('column rendering', () => {
    it('should render UITableTh for each column', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(3);
    });

    it('should pass correct props to UITableTh components', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });

      expect(tableHeaders[0].props('column')).toEqual({
        id: 'name',
        title: 'Name',
        isSort: true,
      });
      expect(tableHeaders[0].props('sort')).toEqual([
        { field: 'name', direction: 'asc' },
      ]);
      expect(tableHeaders[0].props('sortFunction')).toBe(mockSortFunction);

      expect(tableHeaders[1].props('column')).toEqual({
        id: 'age',
        title: 'Age',
        isSort: false,
      });
    });

    it('should render correct number of columns', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(3);
    });
  });

  describe('empty table data', () => {
    it('should handle empty columns array', () => {
      const emptyTableData = {
        columns: [],
        sort: [],
        sortFunction: mockSortFunction,
      };

      const wrapper = mount(UITable, {
        props: { tableData: emptyTableData },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(0);
    });

    it('should handle tableData without sort property', () => {
      const tableDataWithoutSort = {
        columns: [
          { id: 'name', title: 'Name', isSort: true },
        ],
        sortFunction: mockSortFunction,
      };

      const wrapper = mount(UITable, {
        props: { tableData: tableDataWithoutSort },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(1);
      expect(tableHeaders[0].props('sort')).toBeUndefined();
    });

    it('should handle tableData without sortFunction', () => {
      const tableDataWithoutSortFunction = {
        columns: [
          { id: 'name', title: 'Name', isSort: true },
        ],
        sort: [],
      };

      const wrapper = mount(UITable, {
        props: { tableData: tableDataWithoutSortFunction },
      });

      const tableHeaders = wrapper.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(1);
      expect(tableHeaders[0].props('sortFunction')).toBeUndefined();
    });
  });

  describe('integration with child components', () => {
    it('should render UITableRow in thead', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const tableRow = wrapper.findComponent({ name: 'UITableRow' });
      expect(tableRow.exists()).toBe(true);
    });

    it('should render UITableTh components inside UITableRow', () => {
      const wrapper = mount(UITable, {
        props: { tableData: mockTableData },
      });

      const tableRow = wrapper.findComponent({ name: 'UITableRow' });
      const tableHeaders = tableRow.findAllComponents({ name: 'UITableTh' });
      expect(tableHeaders).toHaveLength(3);
    });
  });
});
