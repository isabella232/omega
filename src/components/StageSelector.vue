<template>
  <el-select
    v-if="selectedStages"
    popper-class="stage-selector-popper"
    class="external-selector stage-selector"
    :value="selectedStages"
    collapse-tags
    value-key="value"
    size="mini"
    multiple
    placeholder="All Stages"
    @change="setSelectedStages">
    <el-option
      v-for="stage in stages"
      :key="stage.name"
      :label="stage.name"
      :value="stage">
    </el-option>
  </el-select>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'stageSelector',
  computed: mapState(['selectedStages', 'stages']),
  methods: mapMutations(['setSelectedStages'])
};
</script>
