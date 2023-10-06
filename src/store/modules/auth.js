import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

export const  mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailed: '[auth] registerFailed',
}
export const actionTypes = {
    register: '[auth] register'
}
const auth = {
    state: {
        isSubmitting: false,
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
        }
    }
};
export default auth;