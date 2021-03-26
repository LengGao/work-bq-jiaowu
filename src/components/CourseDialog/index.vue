<template>
  <!--排课详情弹框-->
  <el-dialog
    title="排课详情"
    :visible.sync="visible"
    width="400px"
    class="course-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
  >
    <div class="detail">
      <p>上课日期：{{ datas.date }}</p>
      <p>上课时间：{{ datas.period && datas.period.substr(11) }}</p>
      <p>授课老师：{{ datas.teacher_name || "--" }}</p>
      <p>授课方式：{{ typeMap[datas.teaching_type] || "--" }}</p>
      <p>上课教室：{{ datas.schoolroom_name || "--" }}</p>
      <p>
        跟班人员：{{
          (datas.staff_list && datas.staff_list.join("，")) || "--"
        }}
      </p>
      <p>备注信息：{{ datas.remark || "--" }}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      typeMap: {
        1: "面授",
        2: "直播",
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {},
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.course-dialog {
  .detail {
    p {
      line-height: 30px;
    }
  }
}
</style>