<template>
  <div class="block">
    <div class="block-head">
      <slot name="header-title"></slot>
      <slot name="header-center"></slot>
      <el-select
        v-if="['1', '2'].includes(dateType)"
        v-model="dateSlect"
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
        v-if="dateType == 4"
        v-model="mounth"
        class="date-select"
        @change="handleDateSelectChange"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月"
      >
      </el-date-picker>
      <div v-if="dateType == 3">
        <el-date-picker
          class="date-select"
          v-model="year"
          @change="handleYearChange"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
        >
        </el-date-picker>
        <el-select
          v-model="yearType"
          clearable
          filterable
          placeholder="请选择"
          class="date-select"
          @change="handleYearChange"
        >
          <i slot="prefix" class="el-icon-date"></i>
          <el-option label="按月" value="1"> </el-option>
          <el-option label="按季度" value="2"> </el-option>
        </el-select>
      </div>
    </div>
    <div class="block-container">
      <slot> </slot>
    </div>
  </div>
</template>
<script >
export default {
  name: "Block",
  props: {
    dateType: {
      type: String,
      default: "1",
    },
    value: {
      type: [Number, String, Date],
      default: 0,
    },
  },
  data() {
    return {
      dateSlect: this.value,
      yearType: "1",
      year: this.value,
      mounth: this.value,
      dateTypeMap: {
        1: [
          {
            label: "今天",
            value: 6,
          },
          {
            label: "昨天",
            value: 7,
          },
          {
            label: "本月",
            value: 0,
          },
          {
            label: "上月",
            value: 1,
          },
          {
            label: "本季度",
            value: 2,
          },
          {
            label: "上季度",
            value: 3,
          },
          {
            label: "今年",
            value: 4,
          },
          {
            label: "去年",
            value: 5,
          },
        ],
        2: [
          {
            label: "本月",
            value: 0,
          },
          {
            label: "上月",
            value: 1,
          },
          {
            label: "本季度",
            value: 2,
          },
          {
            label: "上季度",
            value: 3,
          },
          {
            label: "今年",
            value: 4,
          },
          {
            label: "去年",
            value: 5,
          },
        ],
      },
    };
  },
  methods: {
    handleDateSelectChange(e) {
      this.$emit("input", e);
      this.$emit("date-change", e);
    },
    handleYearChange() {
      this.$emit("input", this.year);
      this.$emit("year-change", this.yearType, this.year);
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
      margin-left: 10px;
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