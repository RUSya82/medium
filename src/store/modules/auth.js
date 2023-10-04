import authApi from '@/api/auth'

const auth = {
    state: {
        isSubmitting: false,
    },
    mutations: {
        registerStart(state) {
            state.isSubmitting = true;
        },
        registerSuccess(state) {
            state.isSubmitting = false;
        },
        registerFailed(state) {
            state.isSubmitting = false;
        },
    },
    actions: {
        registerStart({commit}, credentials){
            // setTimeout(() => {
            //     commit('registerStart')
            // }, 1000)

            console.log(credentials);
            return new Promise(resolve => {
                commit('registerStart');
                authApi.register(credentials)
                    .then(response => {
                        commit('registerSuccess', response.data.user)
                        resolve(response.data.user);
                    })
                    .catch(error => {
                        commit('registerFailed', error.response.data.errors)
                        console.log(error);
                    })
            })
        }
    }
};
export default auth;