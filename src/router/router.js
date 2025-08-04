import GameRouter from '@features/game/router/gameRouter';
import HomeRouter from '@features/home/router/homeRouter';

import { LOCAL_STORAGE_KEY, ROUTE_NAMES } from '@utils/constants';

import { setPageTitle } from '@utils/helpers';
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';

const routes = [
  ...HomeRouter,
  ...GameRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  if (store.state.player === null && to.path !== '/') {
    const savedPlayer = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!savedPlayer) {
      return next({ name: ROUTE_NAMES.HOME });
    }
    store.commit('initPlayer', savedPlayer);
  }

  setPageTitle(to);

  return next();
});

export default router;
