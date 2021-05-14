<template>
  <el-dropdown class="external-selector" @command="setSelectedStage">
    <div class="project-filter">{{ selectedStage.name }}<i class="el-icon-arrow-down el-icon--right"></i></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="stage in stages" :key="stage.name" :command="stage">{{ stage.name }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'stageSelector',
  data: () => ({
    stages: [{
      name: 'All Stages', value: 'all'
    }, {
      name: 'Internal', value: 'internal'
    }, {
      name: 'Stage 0 - Discovery', value: 's0'
    }, {
      name: 'Stage 1 - Sell it', value: 's1'
    }, {
      name: 'Stage 2 - Scale it', value: 's2'
    }, {
      name: 'Stage 3 - Global Release', value: 's3'
    }, {
      name: 'Enhancements', value: 's3+'
    }]
  }),
  computed: mapState(['selectedStage']),
  methods: mapMutations(['setSelectedStage'])
};
</script>
