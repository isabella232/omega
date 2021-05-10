<template>
  <el-dropdown class="page-selector" @command="changePage">
    <div class="area-name">{{ pages.current.name }}<i class="el-icon-arrow-down el-icon--right"></i></div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="page in pages.all" :key="page.id" :command="page.id">{{ page.name }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'pageSelector',
  computed: mapState(['pages']),
  methods: mapActions(['changePage'])
};
</script>
