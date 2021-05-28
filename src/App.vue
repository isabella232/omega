<template>
  <div id="app" v-loading="loading" element-loading-background="#0a132d">
    <router-view/>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css"
import { mapState } from "vuex"
const MINUTE = 1000 * 60

export default {
  name: "Omega",

  computed: {...mapState(['loading'])},

  async created() {
    await this.loadOmegaData()
    this.keepOmegaDataUpdated()
  },

  beforeDestroy(){
    clearInterval(this.omegaDataUpdaterRef);
  },

  methods: {

    async loadOmegaData() {
      await this.$store.dispatch('fetchAreaDataWithLoader');
    },

    keepOmegaDataUpdated() {
      this.omegaDataUpdaterRef = setInterval(() => this.$store.dispatch('fetchAreaData'), 5 * MINUTE)
    }

  },

  data() {
    return {
      omegaDataUpdaterRef: null
    }
  }
};
</script>

