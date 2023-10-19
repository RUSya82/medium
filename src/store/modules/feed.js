import feedApi from '@/api/feed';

export const mutationTypes = {
    getFeedStart: '[feed] Get feed start',
    getFeedSuccess: '[feed] Get feed success',
    getFeedFailure: '[feed] Get feed failure',
};
export const actionTypes = {
    getFeed: '[feed] get feed',
};
const feed = {
    state: {
        data: null,
        isLoading: false,
        error: null,
    },
    mutations: {
        [mutationTypes.getFeedStart](state) {
            state.isLoading = true;
            state.data = null;
        },
        [mutationTypes.getFeedSuccess](state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        [mutationTypes.getFeedFailure](state) {
            state.isLoading = false;
        },
    },
    actions: {
        [actionTypes.getFeed]({commit}, {apiUrl}) {
            return new Promise(resolve => {
                commit(mutationTypes.getFeedStart);
                feedApi.getFeed(apiUrl)
                    .then(res => {
                        commit(mutationTypes.getFeedSuccess, res.data);
                        resolve(res.data);
                    })
                    .catch(() => {
                        commit(mutationTypes.getFeedFailure);
                    })
            });
        },
    },
};
export default  feed;