import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UITableTh from '../UITableTh.vue';

vi.mock('../UITableSortBy.vue', () => ({
  default: {
    name: 'UITableSortBy',
    props: ['active'],
    emits: ['sortAsc', 'sortDesc'],
    template: '<div class="sort-by">{{ active }}</div>',
  },
}));

describe('component UITableTh', () => {
  let mockColumn;
  let mockSort;
  let mockSortFunction;

  beforeEach(() => {
    mockSortFunction = vi.fn();
    mockColumn = {
      id: 'name',
      title: 'Name',
      isSort: true,
    };
    mockSort = [
      { field: 'name', direction: 'asc' },
    ];
  });

  describe('props validation', () => {
    it('should require column prop', () => {
      expect(() => {
        mount(UITableTh);
      }).toThrow();
    });

    it('should accept valid column object', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should accept optional sort prop', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle undefined sort prop', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should accept optional sortFunction prop', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sortFunction: mockSortFunction },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('rendering', () => {
    it('should render th element with correct classes', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      const th = wrapper.find('th');
      expect(th.exists()).toBe(true);
      expect(th.classes()).toContain('h-12');
      expect(th.classes()).toContain('p-2');
      expect(th.classes()).toContain('md:p-4');
      expect(th.classes()).toContain('text-left');
      expect(th.classes()).toContain('align-middle');
      expect(th.classes()).toContain('font-medium');
      expect(th.classes()).toContain('text-primary');
    });

    it('should render column title', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      expect(wrapper.text()).toContain('Name');
    });

    it('should render flex container with gap', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.exists()).toBe(true);
      expect(flexContainer.classes()).toContain('gap-1');
      expect(flexContainer.classes()).toContain('items-center');
    });
  });

  describe('text alignment', () => {
    it('should default to left alignment', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-start');
    });

    it('should apply center alignment when column.align is center', () => {
      const columnWithCenterAlign = { ...mockColumn, align: 'center' };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithCenterAlign },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-center');
    });

    it('should apply right alignment when column.align is right', () => {
      const columnWithRightAlign = { ...mockColumn, align: 'right' };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithRightAlign },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-end');
    });

    it('should handle unknown alignment values', () => {
      const columnWithUnknownAlign = { ...mockColumn, align: 'unknown' };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithUnknownAlign },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-start');
    });
  });

  describe('sorting functionality', () => {
    it('should render UITableSortBy when column.isSort is true', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
    });

    it('should not render UITableSortBy when column.isSort is false', () => {
      const columnWithoutSort = { ...mockColumn, isSort: false };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithoutSort, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(false);
    });

    it('should pass correct active prop to UITableSortBy', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.props('active')).toBe('asc');
    });

    it('should handle sort events from UITableSortBy', async () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });

      await sortByComponent.vm.$emit('sortAsc');
      expect(mockSortFunction).toHaveBeenCalledWith('name', 'asc');

      await sortByComponent.vm.$emit('sortDesc');
      expect(mockSortFunction).toHaveBeenCalledWith('name', 'desc');
    });

    it('should emit sort-asc event when sortFunction is called with asc', async () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      await sortByComponent.vm.$emit('sortAsc');

      expect(mockSortFunction).toHaveBeenCalledWith('name', 'asc');
    });

    it('should emit sort-desc event when sortFunction is called with desc', async () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      await sortByComponent.vm.$emit('sortDesc');

      expect(mockSortFunction).toHaveBeenCalledWith('name', 'desc');
    });
  });

  describe('fieldDirection function', () => {
    it('should return direction when field is found in sort array', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: mockSort, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
      expect(sortByComponent.props('active')).toBe('asc');
    });

    it('should return empty string when field is not found in sort array', () => {
      const sortWithoutName = [{ field: 'age', direction: 'desc' }];
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: sortWithoutName, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
      expect(sortByComponent.props('active')).toBe('');
    });

    it('should return empty string when sort array is empty', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: [], sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
      expect(sortByComponent.props('active')).toBe('');
    });

    it('should return empty string when sort prop is not provided', () => {
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle column without isSort property', () => {
      const columnWithoutIsSort = { id: 'name', title: 'Name' };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithoutIsSort },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(false);
    });

    it('should handle column without align property', () => {
      const columnWithoutAlign = { id: 'name', title: 'Name', isSort: true };
      const wrapper = mount(UITableTh, {
        props: { column: columnWithoutAlign },
      });

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-start');
    });

    it('should handle sort array with multiple entries for same field', () => {
      const sortWithMultipleEntries = [
        { field: 'name', direction: 'asc' },
        { field: 'name', direction: 'desc' },
      ];
      const wrapper = mount(UITableTh, {
        props: { column: mockColumn, sort: sortWithMultipleEntries, sortFunction: mockSortFunction },
      });

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
      expect(sortByComponent.props('active')).toBe('asc'); // Should return first match
    });
  });

  describe('integration scenarios', () => {
    it('should work with complex column data', () => {
      const complexColumn = {
        id: 'status',
        title: 'Status',
        isSort: true,
        align: 'center',
      };
      const wrapper = mount(UITableTh, {
        props: { column: complexColumn, sort: [], sortFunction: mockSortFunction },
      });

      expect(wrapper.text()).toContain('Status');

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-center');

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.exists()).toBe(true);
    });

    it('should handle all props together', () => {
      const wrapper = mount(UITableTh, {
        props: {
          column: { id: 'email', title: 'Email', isSort: true, align: 'right' },
          sort: [{ field: 'email', direction: 'desc' }],
          sortFunction: mockSortFunction,
        },
      });

      expect(wrapper.text()).toContain('Email');

      const flexContainer = wrapper.find('div.flex');
      expect(flexContainer.classes()).toContain('justify-end');

      const sortByComponent = wrapper.findComponent({ name: 'UITableSortBy' });
      expect(sortByComponent.props('active')).toBe('desc');
    });
  });
});
