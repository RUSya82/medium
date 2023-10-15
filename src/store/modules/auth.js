import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

export const  mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailed: '[auth] registerFailed',
    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailed: '[auth] loginFailed',
    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailed: '[auth] getCurrentUserFailed'
}
export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}
const auth = {
    getters:{
        [getterTypes.currentUser](state) {
            return state.currentUser;
        },
        [getterTypes.isLoggedIn](state) {
            return !!state.isLoggedIn;
        },
        [getterTypes.isAnonymous](state) {
            return state.isLoggedIn === false;
        }
    },
    state: {
        isSubmitting: false,
        isLoading: false,
        currentUser: null,
        validationErrors: null,
        isLoggedIn: null
    },
    mutations: {
        [mutationTypes.registerStart](state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        [mutationTypes.registerSuccess](state, payload) {
            state.isSubmitting = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.registerFailed](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        },
        [mutationTypes.loginStart](state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        [mutationTypes.loginSuccess](state, payload) {
            state.isSubmitting = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.loginFailed](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        },
        [mutationTypes.getCurrentUserStart](state){
            state.isLoading = true;
        },
        [mutationTypes.getCurrentUserSuccess](state, payload){
            state.isLoading = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.getCurrentUserFailed](state){
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    },
    actions: {
        [actionTypes.register]({commit}, credentials){
            console.log(credentials);
            return new Promise(resolve => {
                commit(mutationTypes.registerStart);
                authApi.register(credentials)
                    .then(response => {
                        commit(mutationTypes.registerSuccess, response.data.user);
                        setItem('accessToken', response.data.user.token);
                        resolve(response.data.user);
                    })
                    .catch(error => {
                        commit(mutationTypes.registerFailed, error.response.data.errors)
                        console.log(error);
                    })
            })
        },
        [actionTypes.login]({commit}, credentials){
            console.log(credentials);
            return new Promise(resolve => {
                commit(mutationTypes.loginStart);
                authApi.login(credentials)
                    .then(response => {
                        commit(mutationTypes.loginSuccess, response.data.user);
                        setItem('accessToken', response.data.user.token);
                        resolve(response.data.user);
                    })
                    .catch(error => {
                        commit(mutationTypes.loginFailed, error.response.data.errors)
                        console.log(error);
                    })
            })
        },
        [actionTypes.getCurrentUser]( {commit}){
            return new Promise(resolve => {
                commit(mutationTypes.getCurrentUserStart);
                authApi.getCurrentUser()
                    .then(response => {
                        commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                        resolve(response.data.user);
                    })
                    .catch(() => {
                        commit(mutationTypes.getCurrentUserFailed)
                    })
            })
        }
    }
};
export default auth;