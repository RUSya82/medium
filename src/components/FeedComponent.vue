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
                :total = "feed.articlesCount"
                :limit = limit
                :url = url
                :current-page = currentPage
            />
        </div>
    </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import PaginationComponent from '@/components/PaginationComponent';
import {LIMIT} from '@/helpers/vars';

export default {
    name: 'FeedComponent',
    components: {PaginationComponent},
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data(){
      return{
          // total: this.feed.articlesCount,
          limit: LIMIT,
          url: '/tags/dragons',
          currentPage: 5
      }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.data,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
        console.log(this.error);
    },
};
</script>

<style scoped>

</style>