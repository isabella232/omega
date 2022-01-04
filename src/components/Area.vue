<template>
  <el-container v-if="!loading">
    <el-header height="50px">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col class="header-logo-selector" :span="24">
          <logo></logo>
          <page-selector></page-selector>
          <validation-selector></validation-selector>
          <sprint-selector></sprint-selector>
          <stage-selector></stage-selector>
          <release-selector></release-selector>
          <assignee-selector></assignee-selector>
        </el-col>
      </el-row>
    </el-header>

    <el-main :class="{ 'overview-page': isOverviewPage }">
      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="areaData" class="content">
        <el-row class="global-objectives" type="flex" justify="start">
          <el-col :span="areaData.objectives.length <= 4 ? 12 : 15" class="hidden-md-and-down">
            <objective-chart :objectives="areaData.objectives"></objective-chart>
          </el-col>
          <el-col :md="24" :lg="areaData.objectives.length <= 4 ? 12 : 9">
            <global-objective-progress :cycle="areaData.cycle" :objectives="areaData.objectives"></global-objective-progress>
          </el-col>
        </el-row>

        <el-row class="epic-container">
          <div class="epic-container-column">
            <template v-for="objective in areaData.objectives">
              <objective-list-item :objective="objective" :key="objective.name"></objective-list-item>
              <project-list-item v-for="project in objective.projects" :key="objective.name + project.name" :project="project" :show-area="isOverviewPage" @showValidation="showValidation"></project-list-item>
            </template>
          </div>
        </el-row>
      </div>
    </el-main>
    <el-dialog :visible.sync="dialogOpen" custom-class="validation-dialog">
      <div v-if="selectedIssue">
        <h3>
          <a :href="selectedIssue.url" class="jira-link" target="_blank">
            {{ selectedIssue.ticketId + ': ' + selectedIssue.name }}
            <i class="el-icon-link"></i>
          </a>
        </h3>
        <el-divider></el-divider>
        <p>Found issues:</p>
        <ul>
          <li v-for="validation in selectedIssue.validations" :key="validation.label">
            <a :href="validation.reference" target="_blank">
              {{ validation.label }}
              <i class="el-icon-link"></i>
            </a>
          </li>
        </ul>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import ReleaseSelector from "./ReleaseSelector";
import StageSelector from "./StageSelector";
import SprintSelector from "./SprintSelector";
import AssigneeSelector from "./AssigneeSelector";
import ValidationSelector from "./ValidationSelector";

export default {
  name: "Area",
  components: {
    ValidationSelector, ReleaseSelector, StageSelector, SprintSelector, AssigneeSelector
  },
  data: () => ({
    dialogOpen: false,
    selectedIssue: null
  }),
  computed: {
    ...mapState(['error', 'loading']),
    ...mapGetters({
      areaData: 'currentAreaData',
      isOverviewPage: 'isOverviewPage'
    })
  },
  methods: {
    showValidation(issue) {
      this.dialogOpen = true;
      this.selectedIssue = issue;
    },
    closeDialog() {
      this.dialogOpen = false;
    }
  }
}
</script>
