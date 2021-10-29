<template>
  <el-tooltip :content="tooltipContent" placement="bottom" effect="dark">
    <div class="external-selector validation-selector" @click="toggleValidation">
      <i v-if="validationEnabled" class="el-icon-s-flag"></i>
      <i v-if="!validationEnabled" class="el-icon-s-flag" style="opacity: 0.3"></i>
    </div>
  </el-tooltip>
</template>
<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "validationSelector",
  computed: {
    ...mapState(['validationEnabled']),
    ...mapGetters(['validationSummary']),
    tooltipContent() {
      const issueText = `(${this.validationSummary.length} issue)`;
      return this.validationEnabled ? `Hide validation ${issueText}` : 'Show validation';
    }
  },
  methods: mapMutations(['toggleValidation'])
}
</script>

