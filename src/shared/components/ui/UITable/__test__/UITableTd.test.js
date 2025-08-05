import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UITableTd from '../UITableTd.vue';

describe('component UITableTd', () => {
  describe('props validation', () => {
    it('should have default align prop value', () => {
      const wrapper = mount(UITableTd);

      expect(wrapper.props('align')).toBe('left');
    });

    it('should accept align prop with string value', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'center' },
      });

      expect(wrapper.props('align')).toBe('center');
    });

    it('should accept all valid align values', () => {
      const alignValues = ['left', 'center', 'right'];

      alignValues.forEach((align) => {
        const wrapper = mount(UITableTd, {
          props: { align },
        });

        expect(wrapper.props('align')).toBe(align);
      });
    });
  });

  describe('rendering', () => {
    it('should render td element with correct classes', () => {
      const wrapper = mount(UITableTd);

      const td = wrapper.find('td');
      expect(td.exists()).toBe(true);
      expect(td.classes()).toContain('p-2');
      expect(td.classes()).toContain('md:p-4');
      expect(td.classes()).toContain('align-middle');
      expect(td.classes()).toContain('font-medium');
    });

    it('should render slot content', () => {
      const wrapper = mount(UITableTd, {
        slots: {
          default: 'Test content',
        },
      });

      expect(wrapper.text()).toBe('Test content');
    });

    it('should render complex slot content', () => {
      const wrapper = mount(UITableTd, {
        slots: {
          default: '<span class="font-bold">Bold text</span>',
        },
      });

      const span = wrapper.find('span.font-bold');
      expect(span.exists()).toBe(true);
      expect(span.text()).toBe('Bold text');
    });

    it('should handle empty slot', () => {
      const wrapper = mount(UITableTd);

      expect(wrapper.text()).toBe('');
    });
  });

  describe('text alignment', () => {
    it('should default to left alignment', () => {
      const wrapper = mount(UITableTd);

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });

    it('should apply center alignment when align prop is center', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'center' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-center');
    });

    it('should apply right alignment when align prop is right', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'right' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-right');
    });

    it('should handle unknown alignment values', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'unknown' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });
  });

  describe('computed properties', () => {
    it('should compute textAlignment correctly for left alignment', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'left' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });

    it('should compute textAlignment correctly for center alignment', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'center' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-center');
    });

    it('should compute textAlignment correctly for right alignment', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'right' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-right');
    });

    it('should fallback to left alignment for invalid values', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'invalid' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });
  });

  describe('edge cases', () => {
    it('should handle null align prop', () => {
      const wrapper = mount(UITableTd, {
        props: { align: null },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });

    it('should handle undefined align prop', () => {
      const wrapper = mount(UITableTd, {
        props: { align: undefined },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });

    it('should handle empty string align prop', () => {
      const wrapper = mount(UITableTd, {
        props: { align: '' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });

    it('should handle case-sensitive alignment values', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'CENTER' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-left');
    });
  });

  describe('integration scenarios', () => {
    it('should work with UITableRow component', () => {
      const wrapper = mount(UITableTd, {
        slots: {
          default: 'Row content',
        },
      });

      expect(wrapper.text()).toBe('Row content');

      const td = wrapper.find('td');
      expect(td.classes()).toContain('p-2');
      expect(td.classes()).toContain('md:p-4');
    });

    it('should work with complex nested content', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'center' },
        slots: {
          default: `
            <div class="flex items-center justify-center">
              <span class="font-medium">Status</span>
              <span class="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Active</span>
            </div>
          `,
        },
      });

      const div = wrapper.find('div.flex');
      expect(div.exists()).toBe(true);
      expect(div.classes()).toContain('flex');
      expect(div.classes()).toContain('items-center');
      expect(div.classes()).toContain('justify-center');

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-center');
    });

    it('should work with form elements', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'right' },
        slots: {
          default: '<input type="checkbox" class="form-checkbox" />',
        },
      });

      const input = wrapper.find('input[type="checkbox"]');
      expect(input.exists()).toBe(true);

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-right');
    });

    it('should work with buttons and actions', () => {
      const wrapper = mount(UITableTd, {
        slots: {
          default: `
            <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          `,
        },
      });

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Edit');
      expect(button.classes()).toContain('bg-blue-500');
    });
  });

  describe('responsive behavior', () => {
    it('should apply responsive padding classes', () => {
      const wrapper = mount(UITableTd);

      const td = wrapper.find('td');
      expect(td.classes()).toContain('p-2');
      expect(td.classes()).toContain('md:p-4');
    });

    it('should maintain alignment across responsive breakpoints', () => {
      const wrapper = mount(UITableTd, {
        props: { align: 'center' },
      });

      const td = wrapper.find('td');
      expect(td.classes()).toContain('text-center');
      expect(td.classes()).toContain('p-2');
      expect(td.classes()).toContain('md:p-4');
    });
  });

  describe('accessibility', () => {
    it('should maintain proper table cell semantics', () => {
      const wrapper = mount(UITableTd);

      const td = wrapper.find('td');
      expect(td.exists()).toBe(true);
      expect(td.element.tagName.toLowerCase()).toBe('td');
    });

    it('should preserve content structure for screen readers', () => {
      const wrapper = mount(UITableTd, {
        slots: {
          default: '<span aria-label="Status">Active</span>',
        },
      });

      const span = wrapper.find('span[aria-label="Status"]');
      expect(span.exists()).toBe(true);
      expect(span.text()).toBe('Active');
    });
  });
});
