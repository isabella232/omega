<template>
  <div id="app" v-loading="loading" element-loading-background="#0a132d">
    <router-view/>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css"
import { mapState } from "vuex"

export default {
  name: "Omega",

  computed: {...mapState(['loading'])},

  async created() {
    await this.$store.dispatch('fetchAreaData');
  },  
};
</script>

