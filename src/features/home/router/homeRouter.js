import { LAYOUT, ROUTE_NAMES } from '@utils/constants';

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('../HomePage.vue'),
    meta: {
      layout: LAYOUT.FULLSCREEN,
      title: `Home`,
    },
  },
];

export default routes;
