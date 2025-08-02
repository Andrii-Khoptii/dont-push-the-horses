import { LAYOUT } from '@utils/constants';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../HomePage.vue'),
    meta: {
      layout: LAYOUT.FULLSCREEN,
      title: `Home`,
    },
  },
];

export default routes;
