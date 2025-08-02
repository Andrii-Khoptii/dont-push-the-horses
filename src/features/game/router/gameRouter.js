import { LAYOUT } from '@utils/constants';

const routes = [
  {
    path: '/game',
    name: 'Game',
    component: () => import('../GamePage.vue'),
    meta: {
      layout: LAYOUT.DEFAULT,
      title: `Game`,
    },
  },
];

export default routes;
