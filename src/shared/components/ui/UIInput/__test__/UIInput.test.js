import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UIInput from '../UIInput.vue';

describe('component UIInput', () => {
  const createWrapper = (props = {}) => {
    return mount(UIInput, {
      props,
    });
  };

  describe('rendering', () => {
    it('renders input element', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('flex');
      expect(input.classes()).toContain('w-full');
      expect(input.classes()).toContain('h-10');
      expect(input.classes()).toContain('px-3');
      expect(input.classes()).toContain('py-2');
      expect(input.classes()).toContain('rounded-md');
      expect(input.classes()).toContain('border');
      expect(input.classes()).toContain('border-input');
      expect(input.classes()).toContain('bg-background');
      expect(input.classes()).toContain('text-base');
    });

    it('renders input with correct type', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.attributes('type')).toBe('text');
    });
  });

  describe('props validation', () => {
    it('has correct default props', () => {
      const wrapper = createWrapper();
      expect(wrapper.props('disabled')).toBe(false);
      expect(wrapper.props('placeholder')).toBe('');
    });

    it('accepts disabled prop', () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.props('disabled')).toBe(true);
    });

    it('accepts placeholder prop', () => {
      const wrapper = createWrapper({ placeholder: 'Enter text' });
      expect(wrapper.props('placeholder')).toBe('Enter text');
    });
  });

  describe('cSS classes', () => {
    it('applies base input classes', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('flex');
      expect(input.classes()).toContain('w-full');
      expect(input.classes()).toContain('h-10');
      expect(input.classes()).toContain('px-3');
      expect(input.classes()).toContain('py-2');
      expect(input.classes()).toContain('rounded-md');
      expect(input.classes()).toContain('border');
      expect(input.classes()).toContain('border-input');
      expect(input.classes()).toContain('bg-background');
      expect(input.classes()).toContain('text-base');
      expect(input.classes()).toContain('placeholder:text-muted-foreground');
      expect(input.classes()).toContain('text-accent-foreground');
      expect(input.classes()).toContain('focus:border-accent-foreground');
      expect(input.classes()).toContain('disabled:cursor-not-allowed');
      expect(input.classes()).toContain('disabled:opacity-50');
      expect(input.classes()).toContain('md:text-sm');
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.attributes('disabled')).toBeDefined();
    });

    it('does not apply disabled attribute when disabled prop is false', () => {
      const wrapper = createWrapper({ disabled: false });
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.attributes('disabled')).toBeUndefined();
    });
  });

  describe('placeholder', () => {
    it('applies placeholder attribute when provided', () => {
      const wrapper = createWrapper({ placeholder: 'Enter your name' });
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.attributes('placeholder')).toBe('Enter your name');
    });

    it('applies empty placeholder by default', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.attributes('placeholder')).toBe('');
    });
  });

  describe('v-model functionality', () => {
    it('updates model value when input changes', async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');

      await input.setValue('test value');

      expect(wrapper.vm.model).toBe('test value');
    });

    it('emits update:modelValue when input changes', async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');

      await input.setValue('new value');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
    });

    it('reflects model value in input', async () => {
      const wrapper = createWrapper();

      wrapper.vm.model = 'initial value';
      await wrapper.vm.$nextTick();

      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.element.value).toBe('initial value');
    });
  });

  describe('events', () => {
    it('emits input event when typing', async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');

      await input.trigger('input');

      expect(wrapper.emitted('input')).toBeTruthy();
    });

    it('emits focus event when focused', async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');

      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
    });

    it('emits blur event when blurred', async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');

      await input.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
    });
  });

  describe('responsive behavior', () => {
    it('applies responsive text size classes', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('text-base');
      expect(input.classes()).toContain('md:text-sm');
    });
  });

  describe('styling behavior', () => {
    it('applies focus styles', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('focus:border-accent-foreground');
    });

    it('applies disabled styles', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('disabled:cursor-not-allowed');
      expect(input.classes()).toContain('disabled:opacity-50');
    });

    it('applies placeholder styles', () => {
      const wrapper = createWrapper();
      const input = wrapper.find('[data-testid="ui-input"]');
      expect(input.classes()).toContain('placeholder:text-muted-foreground');
    });
  });
});
