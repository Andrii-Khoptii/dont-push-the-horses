import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UICard from '../UICard.vue';

describe('component UICard', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(UICard, {
      props,
      slots,
    });
  };

  describe('rendering', () => {
    it('renders card container', () => {
      const wrapper = createWrapper();
      const card = wrapper.find('.rounded-lg');
      expect(card.exists()).toBe(true);
    });

    it('renders default slot content', () => {
      const wrapper = createWrapper({}, {
        default: 'Card content',
      });
      expect(wrapper.text()).toContain('Card content');
    });

    it('renders header slot when provided', () => {
      const wrapper = createWrapper({}, {
        header: 'Card Header',
        default: 'Card content',
      });
      expect(wrapper.text()).toContain('Card Header');
      expect(wrapper.text()).toContain('Card content');
    });
  });

  describe('props validation', () => {
    it('has correct default props', () => {
      const wrapper = createWrapper();
      expect(wrapper.props('padding')).toBe(true);
    });

    it('accepts padding prop', () => {
      const wrapper = createWrapper({ padding: false });
      expect(wrapper.props('padding')).toBe(false);
    });
  });

  describe('css classes', () => {
    it('applies base card classes', () => {
      const wrapper = createWrapper();
      const card = wrapper.find('.rounded-lg');
      expect(card.classes()).toContain('rounded-lg');
      expect(card.classes()).toContain('border');
      expect(card.classes()).toContain('text-card-foreground');
      expect(card.classes()).toContain('shadow-sm');
      expect(card.classes()).toContain('max-w-2xl');
      expect(card.classes()).toContain('mx-auto');
      expect(card.classes()).toContain('bg-background/95');
      expect(card.classes()).toContain('backdrop-blur');
      expect(card.classes()).toContain('text-center');
    });

    it('applies padding classes when padding prop is true', () => {
      const wrapper = createWrapper({ padding: true });
      const content = wrapper.find('.overflow-auto');
      expect(content.classes()).toContain('p-6');
      expect(content.classes()).toContain('md:p-12');
    });

    it('does not apply padding classes when padding prop is false', () => {
      const wrapper = createWrapper({ padding: false });
      const content = wrapper.find('.overflow-auto');
      expect(content.classes()).not.toContain('p-6');
      expect(content.classes()).not.toContain('md:p-12');
    });
  });

  describe('header section', () => {
    it('renders header section when header slot is provided', () => {
      const wrapper = createWrapper({}, {
        header: 'Card Header',
      });
      const header = wrapper.find('.bg-gradient-winner');
      expect(header.exists()).toBe(true);
      expect(header.classes()).toContain('p-6');
    });

    it('does not render header section when header slot is not provided', () => {
      const wrapper = createWrapper({}, {
        default: 'Card content',
      });
      const header = wrapper.find('.bg-gradient-winner');
      expect(header.exists()).toBe(false);
    });

    it('renders header content with correct styling', () => {
      const wrapper = createWrapper({}, {
        header: 'Card Header',
      });
      const headerTitle = wrapper.find('h3');
      expect(headerTitle.exists()).toBe(true);
      expect(headerTitle.classes()).toContain('text-2xl');
      expect(headerTitle.classes()).toContain('font-semibold');
      expect(headerTitle.classes()).toContain('leading-none');
      expect(headerTitle.classes()).toContain('tracking-tight');
      expect(headerTitle.classes()).toContain('text-accent-foreground');
    });
  });

  describe('content section', () => {
    it('renders content section with overflow-auto class', () => {
      const wrapper = createWrapper();
      const content = wrapper.find('.overflow-auto');
      expect(content.exists()).toBe(true);
    });

    it('renders content in the correct container', () => {
      const wrapper = createWrapper({}, {
        default: 'Card content',
      });
      const content = wrapper.find('.overflow-auto');
      expect(content.text()).toContain('Card content');
    });
  });

  describe('computed properties', () => {
    it('calculates content height when header is present', async () => {
      const wrapper = createWrapper({}, {
        header: 'Header',
        default: 'Content',
      });

      const mockOffsetHeight = 100;
      const headerRef = wrapper.vm.$refs.cardHeaderRef;
      if (headerRef) {
        Object.defineProperty(headerRef, 'offsetHeight', {
          value: mockOffsetHeight,
          writable: true,
        });
      }

      await wrapper.vm.$nextTick();

      const content = wrapper.find('.overflow-auto');
      const expectedHeight = `calc(100% - ${mockOffsetHeight}px)`;
      expect(content.attributes('style')).toContain(expectedHeight);
    });

    it('uses 100% height when no header is present', () => {
      const wrapper = createWrapper({}, {
        default: 'Content',
      });

      const content = wrapper.find('.overflow-auto');
      expect(content.attributes('style')).toContain('height: 100%;');
    });
  });

  describe('accessibility', () => {
    it('has proper semantic structure', () => {
      const wrapper = createWrapper({}, {
        header: 'Header',
        default: 'Content',
      });

      const card = wrapper.find('.rounded-lg');
      const header = wrapper.find('h3');
      const content = wrapper.find('.overflow-auto');

      expect(card.exists()).toBe(true);
      expect(header.exists()).toBe(true);
      expect(content.exists()).toBe(true);
    });
  });

  describe('responsive behavior', () => {
    it('applies responsive padding classes', () => {
      const wrapper = createWrapper({ padding: true });
      const content = wrapper.find('.overflow-auto');
      expect(content.classes()).toContain('p-6');
      expect(content.classes()).toContain('md:p-12');
    });
  });
});
