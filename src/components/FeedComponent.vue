<template>
    <div>
        <div v-if='isLoading'>Loading...</div>
        <div v-if='error'>Something bad happed</div>

        <div v-if='feed'>
            <div
                class='article-preview'
                v-for='(article, index) in feed.articles'
                :key='index'
            >
                <div class='article-meta'>
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                    >
                        <img :src='article.author.image' />
                    </router-link>
                    <div class='info'>
                        <router-link
                            :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class='date'>{{ article.createdAt }}</span>
                    </div>
                    <div class='pull-xs-right'>ADD TO FAVORITES</div>
                </div>
                <router-link
                    :to="{name: 'article', params: {slug: article.slug}}"
                    class='preview-link'
                >
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            <PaginationComponent
                :total='feed.articlesCount'
                :limit=limit
                :url=baseUrl
                :current-page=currentPage
            />
        </div>
    </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import PaginationComponent from '@/components/PaginationComponent';
import {LIMIT} from '@/helpers/vars';
// import {parseUrl, stringify} from 'query-string'
import queryString from 'query-string';

export default {
    name: 'FeedComponent',
    components: {PaginationComponent},
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            limit: LIMIT,
        };
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.data,
        }),
        currentPage() {
            return +this.$route.query.page || 1;
        },
        baseUrl() {
            return this.$route.path;
        },
        offset(){
            return this.currentPage * LIMIT - LIMIT;
        }
    },
    watch: {
        currentPage(){
            this.fetchFeed();
        }
    },
    mounted() {
        this.fetchFeed();
    },
    methods: {
        fetchFeed(){
            const parsedUrl = queryString.parseUrl(this.apiUrl);

            const strigifyedParams = queryString.stringify({
                limit: LIMIT,
                offset: this.offset,
                ...parsedUrl.query
            });
            const parseUrlWithParams = `${parsedUrl.url}?${strigifyedParams}`;
            console.log(parseUrlWithParams);
            this.$store.dispatch(actionTypes.getFeed, {apiUrl: parseUrlWithParams});
        }
    }
};
</script>

<style scoped>

</style>