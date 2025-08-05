import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UITableRow from '../UITableRow.vue';

describe('component UITableRow', () => {
  describe('rendering', () => {
    it('should render tr element', () => {
      const wrapper = mount(UITableRow);

      const tr = wrapper.find('tr');
      expect(tr.exists()).toBe(true);
    });

    it('should have correct CSS classes', () => {
      const wrapper = mount(UITableRow);

      const tr = wrapper.find('tr');
      expect(tr.classes()).toContain('border-b');
      expect(tr.classes()).toContain('transition-colors');
      expect(tr.classes()).toContain('hover:bg-muted/50');
    });
  });

  describe('slot functionality', () => {
    it('should render default slot content', () => {
      const wrapper = mount(UITableRow, {
        slots: {
          default: '<td>Test content</td>',
        },
      });

      expect(wrapper.text()).toBe('Test content');
    });

    it('should render multiple slot elements', () => {
      const wrapper = mount(UITableRow, {
        slots: {
          default: '<td>First</td><td>Second</td><td>Third</td>',
        },
      });

      const tds = wrapper.findAll('td');
      expect(tds).toHaveLength(3);
      expect(tds[0].text()).toBe('First');
      expect(tds[1].text()).toBe('Second');
      expect(tds[2].text()).toBe('Third');
    });

    it('should render complex slot content', () => {
      const wrapper = mount(UITableRow, {
        slots: {
          default: `
            <td>
              <span class="font-bold">Bold text</span>
              <span class="text-gray-500">Gray text</span>
            </td>
          `,
        },
      });

      const span = wrapper.find('span.font-bold');
      expect(span.exists()).toBe(true);
      expect(span.text()).toBe('Bold text');
    });

    it('should handle empty slot', () => {
      const wrapper = mount(UITableRow);

      expect(wrapper.text()).toBe('');
    });
  });

  describe('styling behavior', () => {
    it('should apply hover styles correctly', () => {
      const wrapper = mount(UITableRow);

      const tr = wrapper.find('tr');
      const classes = tr.classes();

      expect(classes).toContain('hover:bg-muted/50');
    });

    it('should apply transition classes', () => {
      const wrapper = mount(UITableRow);

      const tr = wrapper.find('tr');
      expect(tr.classes()).toContain('transition-colors');
    });

    it('should apply border classes', () => {
      const wrapper = mount(UITableRow);

      const tr = wrapper.find('tr');
      expect(tr.classes()).toContain('border-b');
    });
  });

  describe('integration scenarios', () => {
    it('should work with UITableTd components', () => {
      const wrapper = mount(UITableRow, {
        slots: {
          default: `
            <td class="p-2">Name</td>
            <td class="p-2">Age</td>
            <td class="p-2">Email</td>
          `,
        },
      });

      const tds = wrapper.findAll('td');
      expect(tds).toHaveLength(3);
      expect(tds[0].text()).toBe('Name');
      expect(tds[1].text()).toBe('Age');
      expect(tds[2].text()).toBe('Email');
    });

    it('should work with nested components', () => {
      const wrapper = mount(UITableRow, {
        slots: {
          default: `
            <td>
              <div class="flex items-center">
                <span class="font-medium">John Doe</span>
                <span class="text-sm text-gray-500">(Active)</span>
              </div>
            </td>
          `,
        },
      });

      const div = wrapper.find('div.flex');
      expect(div.exists()).toBe(true);
      expect(div.classes()).toContain('flex');
      expect(div.classes()).toContain('items-center');
    });
  });
});
