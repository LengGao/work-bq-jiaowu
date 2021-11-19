<template>
  <div class="block">
    <div class="block-head">
      <slot name="header-title"></slot>
      <slot name="header-center"></slot>
      <el-select
        v-if="dateType == 1"
        :value="value"
        clearable
        filterable
        placeholder="请选择"
        class="date-select"
        @change="handleDateSelectChange"
      >
        <i slot="prefix" class="el-icon-date"></i>
        <el-option
          v-for="item in dateTypeMap[dateType]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-else
        :value="value"
        @change="handleDateSelectChange"
        type="month"
        placeholder="选择月"
      >
      </el-date-picker>
    </div>
    <slot> </slot>
  </div>
</template>
<script >
export default {
  name: "Block",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    dateType: {
      type: [String, Number],
      default: 1,
    },
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      dateSlect: "",
      dateTypeMap: {
        1: [
          {
            label: "今天",
            value: 1,
          },
          {
            label: "昨天",
            value: 2,
          },
          {
            label: "本月",
            value: 3,
          },
          {
            label: "上月",
            value: 4,
          },
          {
            label: "本季度",
            value: 5,
          },
          {
            label: "上季度",
            value: 6,
          },
          {
            label: "今年",
            value: 7,
          },
          {
            label: "去年",
            value: 8,
          },
        ],
      },
    };
  },
  methods: {
    handleDateSelectChange(e) {
      this.$emit("input", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.block {
  border: 1px solid #eceef3;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    .date-select {
      width: 120px;
    }
    /deep/.el-input__prefix {
      left: 10px;
      i {
        line-height: 40px;
      }
    }
  }
}
</style>