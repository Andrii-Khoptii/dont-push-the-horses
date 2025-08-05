import { vi } from 'vitest';

export const mockLayouts = {
  DefaultLayout: {
    name: 'DefaultLayout',
    template: '<div>Default Layout</div>',
  },
  FullscreenLayout: {
    name: 'FullscreenLayout',
    template: '<div>Fullscreen Layout</div>',
  },
};

export function setupLayoutMocks() {
  vi.mock('@/layouts/DefaultLayout.vue', () => ({
    default: mockLayouts.DefaultLayout,
  }));

  vi.mock('@/layouts/FullscreenLayout.vue', () => ({
    default: mockLayouts.FullscreenLayout,
  }));
}
