import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UIButton from '../UIButton.vue';

describe('component UIButton', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(UIButton, {
      props,
      slots,
    });
  };

  describe('rendering', () => {
    it('renders button element', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('inline-flex');
      expect(button.classes()).toContain('cursor-pointer');
      expect(button.classes()).toContain('items-center');
      expect(button.classes()).toContain('justify-center');
      expect(button.classes()).toContain('gap-1');
      expect(button.classes()).toContain('whitespace-nowrap');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('text-sm');
      expect(button.classes()).toContain('font-medium');
      expect(button.classes()).toContain('transition-colors');
    });

    it('renders slot content', () => {
      const wrapper = createWrapper({}, {
        default: 'Click me',
      });
      expect(wrapper.text()).toBe('Click me');
    });
  });

  describe('props validation', () => {
    it('has correct default props', () => {
      const wrapper = createWrapper();
      expect(wrapper.props('variant')).toBe('primary');
      expect(wrapper.props('size')).toBe('md');
      expect(wrapper.props('disabled')).toBe(false);
    });

    it('accepts variant prop', () => {
      const wrapper = createWrapper({ variant: 'secondary' });
      expect(wrapper.props('variant')).toBe('secondary');
    });

    it('accepts size prop', () => {
      const wrapper = createWrapper({ size: 'lg' });
      expect(wrapper.props('size')).toBe('lg');
    });

    it('accepts disabled prop', () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.props('disabled')).toBe(true);
    });
  });

  describe('cSS classes', () => {
    it('applies base classes', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('inline-flex');
      expect(button.classes()).toContain('cursor-pointer');
      expect(button.classes()).toContain('items-center');
      expect(button.classes()).toContain('justify-center');
      expect(button.classes()).toContain('gap-1');
      expect(button.classes()).toContain('whitespace-nowrap');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('text-sm');
      expect(button.classes()).toContain('font-medium');
      expect(button.classes()).toContain('transition-colors');
      expect(button.classes()).toContain('disabled:cursor-not-allowed');
      expect(button.classes()).toContain('disabled:opacity-50');
    });

    it('applies primary variant classes by default', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('bg-primary');
      expect(button.classes()).toContain('text-primary-foreground');
      expect(button.classes()).toContain('hover:enabled:bg-primary/90');
    });

    it('applies secondary variant classes', () => {
      const wrapper = createWrapper({ variant: 'secondary' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('bg-secondary');
      expect(button.classes()).toContain('text-secondary-foreground');
      expect(button.classes()).toContain('hover:enabled:bg-secondary/80');
    });

    it('applies foreground variant classes', () => {
      const wrapper = createWrapper({ variant: 'foreground' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('bg-primary-foreground');
      expect(button.classes()).toContain('border');
      expect(button.classes()).toContain('text-primary');
      expect(button.classes()).toContain('hover:enabled:bg-primary-foreground/90');
    });

    it('applies destructive variant classes', () => {
      const wrapper = createWrapper({ variant: 'destructive' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('bg-destructive');
      expect(button.classes()).toContain('text-destructive-foreground');
      expect(button.classes()).toContain('hover:enabled:bg-destructive/90');
    });

    it('applies outline variant classes', () => {
      const wrapper = createWrapper({ variant: 'outline' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('border');
      expect(button.classes()).toContain('border-input');
      expect(button.classes()).toContain('bg-transparent');
      expect(button.classes()).toContain('hover:enabled:bg-accent');
      expect(button.classes()).toContain('hover:enabled:text-accent-foreground');
    });

    it('applies ghost variant classes', () => {
      const wrapper = createWrapper({ variant: 'ghost' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('hover:enabled:bg-accent');
      expect(button.classes()).toContain('hover:enabled:text-accent-foreground');
    });

    it('applies link variant classes', () => {
      const wrapper = createWrapper({ variant: 'link' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('text-primary');
      expect(button.classes()).toContain('underline-offset-4');
      expect(button.classes()).toContain('hover:enabled:underline');
    });

    it('applies md size classes by default', () => {
      const wrapper = createWrapper();
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('h-10');
      expect(button.classes()).toContain('px-4');
      expect(button.classes()).toContain('py-2');
    });

    it('applies sm size classes', () => {
      const wrapper = createWrapper({ size: 'sm' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('h-9');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('px-3');
    });

    it('applies lg size classes', () => {
      const wrapper = createWrapper({ size: 'lg' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('h-11');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('px-8');
    });

    it('applies icon size classes', () => {
      const wrapper = createWrapper({ size: 'icon' });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.classes()).toContain('h-10');
      expect(button.classes()).toContain('w-10');
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      const wrapper = createWrapper({ disabled: true });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.attributes('disabled')).toBeDefined();
    });

    it('does not apply disabled attribute when disabled prop is false', () => {
      const wrapper = createWrapper({ disabled: false });
      const button = wrapper.find('[data-testid="ui-button"]');
      expect(button.attributes('disabled')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = createWrapper();
      const button = wrapper.find('[data-testid="ui-button"]');

      await button.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('does not emit click event when disabled', async () => {
      const wrapper = createWrapper({ disabled: true });
      const button = wrapper.find('[data-testid="ui-button"]');

      await button.trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });
});
