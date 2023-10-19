import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import GlobalFeedView from '@/views/GlobalFeedView';
import RegisterView from '@/views/RegisterView';
import LoginView from '@/views/LoginView';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: GlobalFeedView,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/feed',
        name: 'yourFeed',
        component: GlobalFeedView
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: GlobalFeedView
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: GlobalFeedView
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: GlobalFeedView
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: GlobalFeedView
    },
    {
        path: '/settings',
        name: 'settings',
        component: GlobalFeedView
    },
    {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: GlobalFeedView
    },
    {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: GlobalFeedView
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
