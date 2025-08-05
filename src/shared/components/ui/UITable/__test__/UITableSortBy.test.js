import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import UITableSortBy from '../UITableSortBy.vue';

vi.mock('lucide-vue-next', () => ({
  LucideArrowUp: {
    name: 'LucideArrowUp',
    template: '<svg class="arrow-up"></svg>',
  },
  LucideArrowDown: {
    name: 'LucideArrowDown',
    template: '<svg class="arrow-down"></svg>',
  },
}));

describe('component UITableSortBy', () => {
  describe('props validation', () => {
    it('should accept active prop as string', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      expect(wrapper.props('active')).toBe('asc');
    });

    it('should accept active prop as undefined', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      expect(wrapper.props('active')).toBeUndefined();
    });

    it('should accept active prop as empty string', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: '' },
      });

      expect(wrapper.props('active')).toBe('');
    });
  });

  describe('rendering', () => {
    it('should render container div with correct classes', () => {
      const wrapper = mount(UITableSortBy);

      const container = wrapper.find('[data-testid="ui-table-sort-by"]');
      expect(container.exists()).toBe(true);
      expect(container.classes()).toContain('flex');
      expect(container.classes()).toContain('items-center');
      expect(container.classes()).toContain('ml-0.5');
      expect(container.classes()).toContain('cursor-pointer');
    });

    it('should render LucideArrowUp when active is asc', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      const arrowUp = wrapper.findComponent({ name: 'LucideArrowUp' });
      expect(arrowUp.exists()).toBe(true);
    });

    it('should render LucideArrowDown when active is desc', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.exists()).toBe(true);
    });

    it('should render LucideArrowDown when active is undefined', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.exists()).toBe(true);
    });

    it('should render LucideArrowDown when active is empty string', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: '' },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.exists()).toBe(true);
    });
  });

  describe('icon styling', () => {
    it('should apply correct classes to LucideArrowUp when active', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      const arrowUp = wrapper.findComponent({ name: 'LucideArrowUp' });
      expect(arrowUp.classes()).toContain('hover:text-primary');
      expect(arrowUp.classes()).toContain('transition-colors');
      expect(arrowUp.classes()).toContain('text-primary');
    });

    it('should apply correct classes to LucideArrowDown when active', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.classes()).toContain('hover:text-primary');
      expect(arrowDown.classes()).toContain('transition-colors');
      expect(arrowDown.classes()).toContain('text-primary');
    });

    it('should apply muted classes to LucideArrowDown when not active', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.classes()).toContain('hover:text-primary');
      expect(arrowDown.classes()).toContain('transition-colors');
      expect(arrowDown.classes()).toContain('text-muted-foreground/70');
    });
  });

  describe('event emission', () => {
    it('should emit sortAsc when sort function is called with sort-asc and no active state', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toHaveLength(1);
    });

    it('should emit sortDesc when sort function is called with sort-desc and no active state', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toHaveLength(1);
    });

    it('should emit sortDesc when sort function is called with sort-asc and active is asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toHaveLength(1);
    });

    it('should emit sortAsc when sort function is called with sort-desc and active is desc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toHaveLength(1);
    });

    it('should emit sortAsc when active is truthy and direction is not sort-asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toHaveLength(1);
    });

    it('should emit sortDesc when active is truthy and direction is sort-asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toHaveLength(1);
    });

    it('should emit sortDesc when active is truthy (not asc/desc) and direction is sort-asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'some-other-value' },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toHaveLength(1);
    });

    it('should emit sortAsc when active is truthy (not asc/desc) and direction is not sort-asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'some-other-value' },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toHaveLength(1);
    });

    it('should emit sortDesc when active is truthy and direction is exactly sort-asc', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toHaveLength(1);
    });

    it('should emit sortAsc when active is truthy and direction is empty string', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });

    it('should emit sortAsc when active is truthy and direction is null', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort(null);

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });
  });

  describe('sort function logic', () => {
    it('should emit sortAsc when no active state and sort-asc direction', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });

    it('should emit sortDesc when no active state and sort-desc direction', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toBeFalsy();
    });

    it('should emit sortDesc when active is asc and sort-asc direction', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('sort-asc');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
      expect(wrapper.emitted('sortAsc')).toBeFalsy();
    });

    it('should emit sortAsc when active is desc and sort-desc direction', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      await wrapper.vm.sort('sort-desc');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });
  });

  describe('icon click events', () => {
    it('should call sort function when LucideArrowUp is clicked', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      const arrowUp = wrapper.findComponent({ name: 'LucideArrowUp' });
      await arrowUp.vm.$emit('click');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
    });

    it('should call sort function when LucideArrowDown is clicked', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      await arrowDown.vm.$emit('click');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
    });

    it('should call sort function when LucideArrowDown is clicked with no active state', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      await arrowDown.vm.$emit('click');

      expect(wrapper.emitted('sortDesc')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle active prop with unexpected values', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'unknown' },
      });

      const arrowUp = wrapper.findComponent({ name: 'LucideArrowUp' });
      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowUp.exists()).toBe(false);
      expect(arrowDown.exists()).toBe(false);
    });

    it('should handle null active prop', () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: null },
      });

      const arrowDown = wrapper.findComponent({ name: 'LucideArrowDown' });
      expect(arrowDown.exists()).toBe(true);
    });

    it('should handle sort function with unexpected direction', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('unknown-direction');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });

    it('should handle sort function with unexpected direction when active is truthy', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('unknown-direction');

      expect(wrapper.emitted('sortAsc')).toBeTruthy();
      expect(wrapper.emitted('sortDesc')).toBeFalsy();
    });
  });

  describe('component behavior', () => {
    it('should toggle between asc and desc when clicked', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
      });

      await wrapper.vm.sort('sort-desc');
      expect(wrapper.emitted('sortDesc')).toBeTruthy();

      const wrapper2 = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      await wrapper2.vm.sort('sort-desc');
      expect(wrapper2.emitted('sortAsc')).toBeTruthy();
    });

    it('should maintain state consistency', async () => {
      const wrapper = mount(UITableSortBy, {
        props: { active: 'asc' },
      });

      await wrapper.vm.sort('sort-asc');
      expect(wrapper.emitted('sortDesc')).toBeTruthy();

      const wrapper2 = mount(UITableSortBy, {
        props: { active: 'desc' },
      });

      await wrapper2.vm.sort('sort-desc');
      expect(wrapper2.emitted('sortAsc')).toBeTruthy();
    });
  });

  describe('integration scenarios', () => {
    it('should work with parent component event handling', async () => {
      const mockSortHandler = vi.fn();
      const wrapper = mount(UITableSortBy, {
        props: { active: undefined },
        listeners: {
          sortAsc: mockSortHandler,
          sortDesc: mockSortHandler,
        },
      });

      await wrapper.vm.sort('sort-asc');
      expect(wrapper.emitted('sortAsc')).toBeTruthy();
    });
  });
});
