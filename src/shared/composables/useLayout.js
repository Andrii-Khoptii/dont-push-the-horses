import { LAYOUT } from '@utils/constants';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import FullscreenLayout from '@/layouts/FullscreenLayout.vue';

const layoutComponents = {
  [LAYOUT.DEFAULT]: DefaultLayout,
  [LAYOUT.FULLSCREEN]: FullscreenLayout,
};

export function useLayout() {
  const route = useRoute();

  const currentLayout = computed(() => {
    const layoutName = route.meta?.layout || 'default';
    return layoutComponents[layoutName] || layoutComponents[LAYOUT.DEFAULT];
  });

  return currentLayout;
}
