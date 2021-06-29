<template>
  <div class="global-objectives__progress" :class="{ 'global-objectives__progress-gt4': this.objectives.length > 4}">
    <div class="global-objectives__progress__row">
      <div class="global-objectives__progress__big-container">
        <div class="global-objectives__progress__big">{{ cycle.progress }}%</div>
        <div class="global-objectives__progress__big-title">Overall Progress</div>
      </div>

      <div
        class="global-objectives__progress__bar"
        v-bind:style="{'--percentage': cycle.progress + '%', '--percentage-with-in-progress': cycle.progressWithInProgress + '%', '--percentage-not-to-do': cycle.percentageNotToDo + '%'}"
      >
        <el-tooltip placement="top-end">
          <div slot="content">In Progress</div>
          <div class="global-objectives__progress__bar_inprogress"></div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">Done</div>
          <div class="global-objectives__progress__bar_done"></div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">Cancelled / Postponed</div>
          <div class="global-objectives__progress__bar_nottodo"></div>
        </el-tooltip>
      </div>

      <div class="global-objectives__time__bar">
        <div class="global-objectives__time__start">{{ cycle.startMonth }}</div>
        <div class="global-objectives__time__end">{{ cycle.endMonth }}</div>
        <div
          class="global-objectives__time__current label-left"
          v-bind:style="{'--percentage': cycle.currentDayPercentage + '%'}"
          v-if="cycle.currentDayPercentage > 30"
        >
          Optimal Progress
          <i class="el-icon-arrow-up"></i>
        </div>
        <div
          class="global-objectives__time__current label-right"
          v-bind:style="{'--percentage': cycle.currentDayPercentage + '%'}"
          v-if="cycle.currentDayPercentage <= 30"
        >
          <i class="el-icon-arrow-up"></i> Optimal Progress
        </div>
      </div>
    </div>

    <el-row type="flex" justify="start">
      <el-col :xs="8" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div class="global-objectives__progress_value">{{ cycle.weeks }} wks</div>
          <div class="global-objectives__progress__title">Estimation</div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div class="global-objectives__progress_value">{{ cycle.weeksDone }} wks</div>
          <div class="global-objectives__progress__title">Done</div>
        </div>
      </el-col>
      <el-col class="hidden-xs-only" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div class="global-objectives__progress_value">{{ cycle.weeksInProgress }} wks</div>
          <div class="global-objectives__progress__title">In Progress</div>
        </div>
      </el-col>
      <el-col class="hidden-xs-only" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div class="global-objectives__progress_value">{{ cycle.weeksCancelled }} wks</div>
          <div class="global-objectives__progress__title">Cancelled</div>
        </div>
      </el-col>
      <el-col class="hidden-xs-only" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div class="global-objectives__progress_value">{{ cycle.weeksPostponed }} wks</div>
          <div class="global-objectives__progress__title">Postponed</div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="4">
        <div class="global-objectives__progress__value-container">
          <div
            class="global-objectives__progress_value"
          >{{ cycle.epicsDoneCount }} of {{ cycle.epicsCount }}</div>
          <div class="global-objectives__progress__title">Epics Done</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'global-objective-progress',

  props: ['cycle', 'objectives']
};
</script>
