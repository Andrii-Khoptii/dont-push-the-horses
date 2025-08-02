import GameRouter from '@features/game/router/gameRouter';
import HomeRouter from '@features/home/router/homeRouter';

import { setPageTitle } from '@utils/helpers';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  ...HomeRouter,
  ...GameRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  setPageTitle(to);
});

export default router;
