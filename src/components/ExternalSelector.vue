<template>
  <el-dropdown class="external-selector" @command="setOnlyExternal">
    <div class="project-filter">{{ onlyExternal ? 'External projects' : 'All projects' }}<i class="el-icon-arrow-down el-icon--right"></i></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="false">All projects</el-dropdown-item>
      <el-dropdown-item :command="true">External projects</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'externalSelector',
  computed: mapState(['onlyExternal']),
  methods: mapMutations(['setOnlyExternal'])
};
</script>
