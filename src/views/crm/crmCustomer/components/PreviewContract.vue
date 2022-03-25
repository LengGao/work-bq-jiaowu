<template>
  <div>
    <el-dialog
      title="选择合同模板"
      :visible="value"
      width="400px"
      @open="handleOpen"
      :close-on-click-modal="false"
      @close="handleClose"
      append-to-body
    >
      <el-select
        style="width: 100%"
        v-model="contractTemplateId"
        clearable
        filterable
        placeholder="请选择合同模板"
      >
        <el-option
          v-for="item in contractTemplateOptions"
          :key="item.id"
          :label="item.template_name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <span slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          :loading="contractLoading"
          @click="generateContract"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="预览合同"
      :visible.sync="contractDialog"
      :close-on-click-modal="false"
      append-to-body
      width="900px"
    >
      <div style="height: 650px; width: 800px; overflow: hidden; margin-top: 0">
        <iframe
          :src="contractUrl"
          ref="iframe"
          type="application/x-google-chrome-pdf"
          width="1200px"
          height="800px"
          border="0"
          style="margin-top: -150px; margin-left: -150px"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { templatelist } from "@/api/system";
import { getContractUrl } from "@/api/crm";
export default {
  name: "PreviewContract",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      contractDialog: false,
      contractUrl: "",
      contractLoading: false,
      contractTemplateId: "",
      contractTemplateOptions: [],
    };
  },
  methods: {
    handleOpen() {
      this.templatelist();
    },
    // 获取合同url
    async generateContract() {
      if (!this.contractTemplateId) {
        this.$message.error("请选择合同模板");
        return;
      }
      const data = {
        template_id: this.contractTemplateId,
        data: this.data,
      };
      console.log(data);
      this.contractLoading = true;
      const res = await getContractUrl(data).catch(() => {});
      this.contractLoading = false;
      if (res.code == 0) {
        this.contractDialog = true;
        this.contractUrl = res.data.sign_url;
      }
    },
    // 合同模板列表接口
    async templatelist() {
      const res = await templatelist();
      if (res.code == 0) {
        this.contractTemplateOptions = res.data.data;
      }
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style>
</style>