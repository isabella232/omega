<template>
  <el-dropdown v-if="selectedAssignee" class="external-selector" @command="setSelectedAssignee">
    <div class="project-filter">{{ selectedAssignee.displayName }}<i class="el-icon-arrow-down el-icon--right"></i></div>
    <el-dropdown-menu class="assignee-dropdown" slot="dropdown">
      <el-dropdown-item v-for="assignee in assignees" :key="assignee.accountId" :command="assignee">{{ assignee.displayName }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'assigneeSelector',
  computed: mapState(['selectedAssignee', 'assignees']),
  methods: mapMutations(['setSelectedAssignee'])
};
</script>
