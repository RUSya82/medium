<template>
  <div>
    <top-bar-component/>
      <router-view/>
  </div>
</template>
<script>
import TopBarComponent from '@/components/TopBarComponent';
import { actionTypes } from '@/store/modules/auth';

export default {
    components: {
        TopBarComponent,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser)
    }
}

</script>


