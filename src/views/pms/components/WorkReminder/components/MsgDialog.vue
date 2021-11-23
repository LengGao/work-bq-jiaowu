<template>
  <el-dialog
    title="系统通知"
    :visible.sync="dialogVisible"
    width="700px"
    :close-on-click-modal="false"
    @closed="onClose"
    @open="onOpen"
    v-loading="loading"
  >
    <div class="msg-container">
      <h2>
        {{ noticData.title }}
      </h2>
      <div style="padding: 10px 0; font-size: 16px">
        <span>发布时间：{{ noticData.create_time }}</span>
        <span style="margin-left: 30px"
          >发布人：{{ noticData.staff_name }}</span
        >
      </div>
      <div class="noticontent">
        <div v-html="noticData.content"></div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="noticData.read === 1" @click="handleClose"
        >知道了</el-button
      >
      <el-button type="primary" v-else @click="setUnread">标为未读</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAnnouncementInfo, setUnread } from "@/api/workbench";
export default {
  name: "MsgDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      dialogVisible: this.value,
      noticData: {},
      read: 2, //2已读 1未读
    };
  },
  watch: {
    value() {
      this.dialogVisible = this.value;
    },
  },
  methods: {
    onOpen() {
      this.read = 2;
      this.getAnnouncementInfo();
    },
    async setUnread() {
      const data = {
        id: this.id,
      };
      const res = await setUnread(data);
      if (res.code === 0) {
        this.read = 1;
        this.$message.success(res.message);
      }
      this.dialogVisible = false;
    },
    async getAnnouncementInfo() {
      const data = {
        id: this.id,
      };
      this.loading = true;
      const res = await getAnnouncementInfo(data);
      this.loading = false;
      if (res.code === 0) {
        this.noticData = res.data;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    onClose() {
      this.$emit("ok", this.read);
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="less" scoped>
.msg-container {
  height: 400px;
  overflow-y: auto;
}
</style>