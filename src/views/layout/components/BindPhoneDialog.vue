<template>
  <el-dialog
    title="请绑定您在东培学堂的手机号"
    width="470px"
    :visible="value"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="isBindPhone"
    @close="handleClose"
    class="bind-phone-dialog"
  >
    <div>
      <el-input v-model="mobile" placeholder="请输入手机号码"></el-input>
    </div>
    <div class="dialog-footer" slot="footer">
      <el-button
        type="primary"
        size="small"
        :loading="btnLoading"
        @click="handleOk"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { bindDongpei } from "@/api/workbench";
import { mapGetters } from "vuex";

export default {
  name: "BindPhoneDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      mobile: "",
      btnLoading: false,
    };
  },
  computed: {
    ...mapGetters(["isBindPhone"]),
  },
  methods: {
    async handleOk() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      const data = {
        mobile: this.mobile,
      };
      this.btnLoading = true;
      const res = await bindDongpei(data).catch(() => {});
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.handleClose();
      }
    },
    handleClose() {
      this.$store.commit("SET_BIND_SHOW", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.bind-phone-dialog {
}
</style>