<template>
  <el-dropdown v-if="selectedSprint" class="external-selector" @command="fetchSprint">
    <div class="project-filter">{{ selectedSprint.name }}<i class="el-icon-arrow-down el-icon--right"></i></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="sprint in sprints" :key="sprint.name" :command="sprint">{{ sprint.name }} - {{ sprint.state }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'sprintSelector',
  computed: mapState(['selectedSprint', 'sprints']),
  methods: mapActions(['fetchSprint'])
};
</script>
