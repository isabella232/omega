<template>
  <el-tooltip :content="tooltipContent" placement="bottom" effect="dark">
    <div class="external-selector validation-selector" @click="toggleValidation">
      <i v-if="validationEnabled" class="el-icon-s-flag"></i>
      <i v-if="!validationEnabled" class="el-icon-s-flag" style="opacity: 0.3"></i>
    </div>
  </el-tooltip>
</template>
<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "validationSelector",
  computed: {
    ...mapState(['validationEnabled']),
    tooltipContent() {
      return this.validationEnabled ? 'Hide validation' : 'Show validation';
    }
  },
  methods: mapMutations(['toggleValidation'])
}
</script>

