import { LAYOUT } from '@utils/constants';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockRoute, resetMocks } from '@/test/utils';
import { useLayout } from '../useLayout';

describe('useLayout', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('when route has no meta layout', () => {
    it('should return default layout', () => {
      mockRoute({});

      const currentLayout = useLayout();

      expect(currentLayout.value.name).toBe('DefaultLayout');
    });
  });

  describe('when route has default layout', () => {
    it('should return default layout', () => {
      mockRoute({ layout: LAYOUT.DEFAULT });

      const currentLayout = useLayout();

      expect(currentLayout.value.name).toBe('DefaultLayout');
    });
  });

  describe('when route has fullscreen layout', () => {
    it('should return fullscreen layout', () => {
      mockRoute({ layout: LAYOUT.FULLSCREEN });

      const currentLayout = useLayout();

      expect(currentLayout.value.name).toBe('FullscreenLayout');
    });
  });

  describe('when route has unknown layout', () => {
    it('should fallback to default layout', () => {
      mockRoute({ layout: 'unknown-layout' });

      const currentLayout = useLayout();

      expect(currentLayout.value.name).toBe('DefaultLayout');
    });
  });

  describe('when route meta is undefined', () => {
    it('should return default layout', () => {
      mockRoute();

      const currentLayout = useLayout();

      expect(currentLayout.value.name).toBe('DefaultLayout');
    });
  });

  describe('computed reactivity', () => {
    it('should return different layouts for different route configurations', () => {
      mockRoute({ layout: LAYOUT.DEFAULT });
      const defaultLayout = useLayout();
      expect(defaultLayout.value.name).toBe('DefaultLayout');

      mockRoute({ layout: LAYOUT.FULLSCREEN });
      const fullscreenLayout = useLayout();
      expect(fullscreenLayout.value.name).toBe('FullscreenLayout');
    });
  });

  describe('layout component structure', () => {
    it('should return valid Vue components', () => {
      mockRoute({ layout: LAYOUT.DEFAULT });
      const currentLayout = useLayout();

      const wrapper = mount(currentLayout.value);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe('Default Layout');
    });

    it('should return valid fullscreen component', () => {
      mockRoute({ layout: LAYOUT.FULLSCREEN });
      const currentLayout = useLayout();

      const wrapper = mount(currentLayout.value);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe('Fullscreen Layout');
    });
  });
});
