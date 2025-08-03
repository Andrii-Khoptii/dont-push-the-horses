import { LAYOUT, ROUTE_NAMES } from '@utils/constants';

const routes = [
  {
    path: '/game',
    name: ROUTE_NAMES.GAME,
    component: () => import('../GamePage.vue'),
    meta: {
      layout: LAYOUT.DEFAULT,
      title: `Game`,
    },
  },
];

export default routes;
