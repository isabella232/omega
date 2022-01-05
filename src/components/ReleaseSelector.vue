<template>
  <el-dropdown 
    class="external-selector"  
    @command="setSelectedReleaseFilter">
    <div class="project-filter">
      {{ selectedReleaseFilter.name }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item 
        v-for="releaseFilter in releaseFilters" 
        :key="releaseFilter.value" 
        :command="releaseFilter">
        {{ releaseFilter.name }}
        <i v-bind:class="releaseFilter.style"></i>
      </el-dropdown-item>      
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'releaseSelector',
  computed: mapState(['selectedReleaseFilter', 'releaseFilters']),
  methods: mapMutations(['setSelectedReleaseFilter'])
};
</script>
