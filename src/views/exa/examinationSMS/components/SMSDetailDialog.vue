<template>
  <el-dialog
    title="消息详情"
    :visible.sync="visible"
    width="450px"
    :close-on-click-modal="false"
    @closed="onClose"
  >
    <div>
      <p class="msg" v-for="(item, index) in filterContent" :key="index">
        {{ item }}
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
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
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
    };
  },
  computed: {
    filterContent() {
      return this.content.split("/r/n");
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    onClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  padding: 10px 0;
}
</style>