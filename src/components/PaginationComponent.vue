<template>
    <ul class='pagination'>
        <li v-for='page in pages' :key='page' class='page-item' :class='{active: currentPage === page}'>
            <router-link :to="{path: url, query:{page: page}}" class='page-link'>
                {{ page }}
            </router-link>
        </li>
    </ul>
</template>

<script>
import {getRange} from '@/helpers/utils';
export default {
    name: 'PaginationComponent',
    props: {
        total:{
            type: Number,
            required: true
        },
        limit:{
            type: Number,
            required: true
        },
        url:{
            type: String,
            required: true
        },
        currentPage:{
            type: Number,
            required: true
        },
    },
    mounted() {
    },
    computed: {
        pages(){
            const pagesCount = Math.ceil(this.total/this.limit);
            return getRange(1, pagesCount);
        }
    }
};
</script>

<style scoped>

</style>