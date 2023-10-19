<template>
    <div class="home-page">
        BANNER
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <feed-component :api-url="apiUrl"></feed-component>
                </div>
                <div class="col-md-3">
                    POPULAR TAGS
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FeedComponent from '@/components/FeedComponent';
export default {
    name: 'GlobalFeedView',
    components: {FeedComponent},
    data() {
        return {
            apiUrl: '/articles'
        }
    }
};
</script>

<style scoped>

</style>