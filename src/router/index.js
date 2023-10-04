import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/RegisterView';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
