<template>
  <div class="hello">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="cycleData" class="content">
      <h2>Overview</h2>
      almaa
    </div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  data() {
    return {
      loading: false,
      cycleData: null,
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {    
    $route: "fetchData" // call again the method if the route changes
  },
  methods: {
    async fetchData() {
      this.error = this.areaData = null;
      this.loading = true;
      
      try {
        let response = await fetch(`https://ems-omega-data.herokuapp.com/overview`);
        this.cycleData = await response.json();
      } catch (e) {
        this.error = 'Error :(';
      }
      
      this.loading = false;
    }
  }
};
</script>



<style scoped>
</style>
