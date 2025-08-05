import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameHorseListTableRow from '../GameHorseListTableRow.vue';

vi.mock('@ui', () => ({
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

describe('feature GameHorseListTableRow', () => {
  let wrapper;

  const createMockHorseWithColor = (overrides = {}) => {
    return {
      id: 1,
      name: 'Thunder',
      condition: 'good',
      color: { value: '#FF0000', name: 'Red' },
      ...overrides,
    };
  };

  const defaultProps = {
    row: createMockHorseWithColor(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props Validation', () => {
    it('should require row prop', () => {
      expect(() => {
        mount(GameHorseListTableRow, {
          props: {},
        });
      }).toThrow();
    });

    it('should accept valid props', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      expect(wrapper.props('row')).toEqual(defaultProps.row);
    });
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      expect(wrapper.find('.mock-ui-table-row').exists()).toBe(true);
    });

    it('should display horse ID', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('1');
    });

    it('should display horse name', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[1].text()).toBe('Thunder');
    });

    it('should display horse condition', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[2].text()).toBe('good');
    });

    it('should display horse color name', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[3].text()).toBe('Red');
    });

    it('should display horse color with correct styling', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const colorSpan = wrapper.find('span[style*="color: rgb(255, 0, 0)"]');
      expect(colorSpan.exists()).toBe(true);
      expect(colorSpan.text()).toBe('Red');
    });
  });

  describe('table Cell Structure', () => {
    it('should have correct number of table cells', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells).toHaveLength(4);
    });
  });

  describe('data Display', () => {
    it('should display horse with different data', () => {
      const differentHorse = createMockHorseWithColor({
        id: 5,
        name: 'Lightning',
        condition: 'excellent',
        color: { value: '#00FF00', name: 'Green' },
      });

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: differentHorse,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('5');
      expect(tableCells[1].text()).toBe('Lightning');
      expect(tableCells[2].text()).toBe('excellent');
      expect(tableCells[3].text()).toBe('Green');
    });

    it('should display color with different hex values', () => {
      const horseWithDifferentColor = createMockHorseWithColor({
        color: { value: '#0000FF', name: 'Blue' },
      });

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithDifferentColor,
        },
      });

      const colorSpan = wrapper.find('span[style*="color: rgb(0, 0, 255)"]');
      expect(colorSpan.exists()).toBe(true);
      expect(colorSpan.text()).toBe('Blue');
    });

    it('should handle horse with numeric condition', () => {
      const horseWithNumericCondition = createMockHorseWithColor({
        condition: 85,
      });

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithNumericCondition,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[2].text()).toBe('85');
    });
  });

  describe('edge Cases', () => {
    it('should handle horse with null values', () => {
      const horseWithNullValues = {
        id: null,
        name: null,
        condition: null,
        color: { value: null, name: null },
      };

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithNullValues,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('');
      expect(tableCells[1].text()).toBe('');
      expect(tableCells[2].text()).toBe('');
      expect(tableCells[3].text()).toBe('');
    });

    it('should handle horse with undefined values', () => {
      const horseWithUndefinedValues = {
        id: undefined,
        name: undefined,
        condition: undefined,
        color: { value: undefined, name: undefined },
      };

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithUndefinedValues,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('');
      expect(tableCells[1].text()).toBe('');
      expect(tableCells[2].text()).toBe('');
      expect(tableCells[3].text()).toBe('');
    });

    it('should handle horse with empty string values', () => {
      const horseWithEmptyValues = {
        id: '',
        name: '',
        condition: '',
        color: { value: '', name: '' },
      };

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithEmptyValues,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('');
      expect(tableCells[1].text()).toBe('');
      expect(tableCells[2].text()).toBe('');
      expect(tableCells[3].text()).toBe('');
    });

    it('should handle horse with undefined color object', () => {
      const horseWithUndefinedColor = {
        id: 1,
        name: 'Thunder',
        condition: 'good',
        color: { value: undefined, name: undefined },
      };

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithUndefinedColor,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[0].text()).toBe('1');
      expect(tableCells[1].text()).toBe('Thunder');
      expect(tableCells[2].text()).toBe('good');
      expect(tableCells[3].text()).toBe('');
    });

    it('should handle horse with incomplete color object', () => {
      const horseWithIncompleteColor = {
        id: 1,
        name: 'Thunder',
        condition: 'good',
        color: { value: '#FF0000' },
      };

      wrapper = mount(GameHorseListTableRow, {
        props: {
          row: horseWithIncompleteColor,
        },
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells[3].text()).toBe('');
    });
  });

  describe('styling and Layout', () => {
    it('should have correct table row structure', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableRow = wrapper.find('.mock-ui-table-row');
      expect(tableRow.exists()).toBe(true);
    });

    it('should have correct table cell structure', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAll('.mock-ui-table-td');
      expect(tableCells).toHaveLength(4);
    });

    it('should have proper color styling', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const colorSpan = wrapper.find('span[style*="color:"]');
      expect(colorSpan.exists()).toBe(true);
      expect(colorSpan.attributes('style')).toContain('color: rgb(255, 0, 0)');
    });

    it('should maintain proper component hierarchy', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableRow = wrapper.findComponent({ name: 'UITableRow' });
      const tableCells = wrapper.findAllComponents({ name: 'UITableTd' });

      expect(tableRow.exists()).toBe(true);
      expect(tableCells).toHaveLength(4);
    });
  });

  describe('component Integration', () => {
    it('should integrate with UITableRow component correctly', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableRow = wrapper.findComponent({ name: 'UITableRow' });
      expect(tableRow.exists()).toBe(true);
      expect(tableRow.isVisible()).toBe(true);
    });

    it('should integrate with UITableTd components correctly', () => {
      wrapper = mount(GameHorseListTableRow, {
        props: defaultProps,
      });

      const tableCells = wrapper.findAllComponents({ name: 'UITableTd' });
      expect(tableCells).toHaveLength(4);

      tableCells.forEach((cell) => {
        expect(cell.exists()).toBe(true);
        expect(cell.isVisible()).toBe(true);
      });
    });
  });
});
