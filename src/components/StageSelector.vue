<template>
  <el-dropdown v-if="selectedStage" class="external-selector" @command="setSelectedStage">
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
  computed: mapState(['selectedStage', 'stages']),
  methods: mapMutations(['setSelectedStage'])
};
</script>
