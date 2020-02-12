import Vue from 'vue';
import VueRouter from 'vue-router';
import AccessPage from '../views/AccessPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AccessPage',
    component: AccessPage,
  },
  {
    path: '/user/:username?',
    name: 'User',
    component: () => import('../views/User'),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
