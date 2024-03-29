<template>
  <div class="epic-container-column__project">
    <el-popover
      :ref="project.name + 'popover'"
      placement="bottom"
      width="500"
      :open-delay="300"
      :visible-arrow="false"
      popper-class="project-popover"
      trigger="hover"
    >
      <div v-on:click="hidePopover(project.name + 'popover')">
        <el-container>
          <el-main>
            <el-row class="project-popover__header">
              <div class="project-popover__header__owner">{{ project.owner }}</div>
              <div class="project-popover__header__name">
                <a :href="project.url" class="jira-link" target="_blank">
                  {{ project.name }}
                  <i class="el-icon-link"></i>
                </a>
                <template v-if="validationEnabled && project.validations.length > 0">
                  <el-tooltip :content="'Found ' + project.validations.length + ' issue, click to see details'" placement="bottom" effect="dark">
                    <span class="el-icon-s-flag project-popover__epic__validation" @click="showValidation(project)"></span>
                  </el-tooltip>
                </template>
                <template v-if="project.isPartOfReleaseNarrative">
                  <el-tooltip :content="'This item will be presented and/or demoed as part of the next release!'" placement="bottom" effect="dark">
                    <span class="el-icon-s-promotion project-popover__epic__release_narrative"></span>
                  </el-tooltip> 
                </template>
                <template v-if="project.isReleaseAtRisk">
                  <el-tooltip :content="'This item might not make it in time for next release!'" placement="bottom" effect="dark">
                    <span class="el-icon-warning project-popover__epic__warning"></span>
                  </el-tooltip> 
                </template>
              </div>

              <template v-if="project.weeks === 0">
                <div class="project-popover__header__progress">TBD</div>
              </template>
              <template v-else-if="project.weeks != project.weeksNotToDo">
                <div class="project-popover__header__progress">{{ project.progress + '%' }}</div>
                <div class="project-popover__header__weeks">
                  <strong>{{ project.weeksDone }}</strong>
                  of {{ project.weeks }} weeks
                </div>
              </template>
              <template v-else-if="project.weeks === project.weeksPostponed">
                <div class="project-popover__header__progress">Postponed</div>
              </template>
              <template v-else>
                <div class="project-popover__header__progress">Cancelled</div>
              </template>
            </el-row>
            <el-row class="project-popover__progress">
              <div
                v-if="project.weeks != project.weeksNotToDo"
                class="progress-line"
                v-bind:style="{'--percentage': project.progress + '%', '--percentage-with-in-progress': project.progressWithInProgress + '%', '--percentage-not-to-do': project.percentageNotToDo + '%'}"
              >
                <div></div>
              </div>
            </el-row>
            <el-row class="project-popover__epics">
              <div
                class="project-popover__epic"
                :class="epic.status | healthClassFromStatus"
                v-for="epic in project.epics"
                :key="epic.name + epic.stage"
              >
                <div class="project-popover__epic__name">
                  <template v-if="epic.isReleaseAtRisk">
                    <el-tooltip :content="'This item might not make it in time for next release!'" placement="bottom" effect="dark">
                      <span class="el-icon-warning project-popover__epic__warning"></span>
                    </el-tooltip> 
                  </template>
                  <template v-if="epic.isPartOfReleaseNarrative">
                    <el-tooltip :content="'This item will be presented and/or demoed as part of the next release!'" placement="bottom" effect="dark">
                      <span class="el-icon-s-promotion project-popover__epic__release_narrative"></span>
                    </el-tooltip> 
                  </template>
                  <a :href="epic.url" class="jira-link" target="_blank">
                    {{ epic.name }}
                    <i class="el-icon-link"></i>
                  </a>
                  <span v-if="epic.stage" class="project-popover__epic__stage">
                    {{ epic.stage }}
                  </span>
                  <template v-if="validationEnabled && epic.validations.length > 0">
                    <el-tooltip :content="'Found ' + epic.validations.length + ' issue, click to see details'" placement="bottom" effect="dark">
                      <span class="el-icon-s-flag project-popover__epic__validation" @click="showValidation(epic)"></span>
                    </el-tooltip>
                  </template>
                </div>
                <div class="project-popover__epic__effort">
                  {{ epic.effort }}
                  <span v-if="epic.effort <= 1">week</span>
                  <span v-else>weeks</span>
                </div>
                <div class="project-popover__epic__status">{{ epic.status | displayStatus }}</div>
              </div>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </el-popover>
    <el-container>
      <el-main
        v-popover="project.name + 'popover'"
        class="epic-container-column__project__internal"
      >
        <el-row>
          <div>
            <div v-if="showArea" class="epic-container-column__project__area">{{ project.area }}</div>
            <div class="epic-container-column__project__title">
              <template v-if="validationEnabled && project.aggregatedValidations.length > 0">
                <el-tooltip :content="'Found ' + project.aggregatedValidations.length + ' issue'" placement="bottom" effect="dark">
                  <span class="el-icon-s-flag project-popover__epic__validation"></span>
                </el-tooltip>
              </template>
              <template v-if="project.isReleaseAtRisk">
                <el-tooltip :content="'This item might not make it in time for next release!'" placement="bottom" effect="dark">
                  <span class="el-icon-warning project-popover__epic__warning"></span>
                </el-tooltip> 
              </template>
              <template v-if="project.isPartOfReleaseNarrative">
                <el-tooltip :content="'This item will be presented and/or demoed as part of the next release!'" placement="bottom" effect="dark">
                  <span class="el-icon-s-promotion project-popover__epic__release_narrative"></span>
                </el-tooltip> 
              </template>
              {{ project.name }}
            </div>
            <div v-if="project.weeks === 0" class="epic-container-column__project__epic-counts">TBD</div>
            <div v-else-if="project.weeks != project.weeksNotToDo" class="epic-container-column__project__epic-counts">
              <strong>{{ project.weeksDone }}</strong>
              of {{ project.weeks }} wks
            </div>
            <div v-else-if="project.weeks === project.weeksPostponed" class="epic-container-column__project__epic-counts">Postponed</div>
            <div v-else class="epic-container-column__project__epic-counts">Cancelled</div>
          </div>
        </el-row>
        <el-row>
          <div>
            <div
              class="progress-line"
              v-bind:style="{'--percentage': project.progress + '%', '--percentage-with-in-progress': project.progressWithInProgress + '%', '--percentage-not-to-do': project.percentageNotToDo + '%'}"
            >
              <div></div>
            </div>
            <div v-if="project.progress == 100" class="progress-percentage done">
              <i class="el-icon-trophy"></i>100%
            </div>
            <div v-else class="progress-percentage">{{ project.progress }}%</div>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'project-list-item',

  props: ['project', 'showArea'],

  computed: mapState(['validationEnabled']),

  methods: {
    hidePopover(id) {
      if (!this.$refs[id]) return

      this.$refs[id].doClose()

      // Not proud of the following but it's a dirty hack to prevent flickering on hide by click :(
      setTimeout(() => { this.$refs[id].doClose(); }, 100)
      setTimeout(() => { this.$refs[id].doClose(); }, 200)
      setTimeout(() => { this.$refs[id].doClose(); }, 300)
    },
    showValidation(epic) {
      this.$emit('showValidation', epic);
    }
  }
}
</script>
