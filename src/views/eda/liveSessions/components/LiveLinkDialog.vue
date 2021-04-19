<template>
  <!--直播弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="600px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="网页开播链接">
        <div class="link-input">
          <el-input v-model="formData.title" type="text" />
          <el-button type="success" plain>打开</el-button>
        </div>
      </el-form-item>
      <el-form-item label="启动客户端链接">
        <div class="link-input">
          <el-input v-model="formData.title" type="text" />
          <el-button type="success" plain>打开</el-button>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <div>
          <span>频道号：20210253</span>
          <span class="m-l">登录密码：TGlah7</span>
        </div>
      </el-form-item>
      <el-form-item label="助教后台链接">
        <div class="link-input">
          <el-input class="w-100" v-model="formData.title" type="text" />
          <el-button type="success" plain>打开</el-button>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <div>
          <span>频道号：20210253</span>
          <span class="m-l">登录密码：TGlah7</span>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <div>
          <span>频道号：20210253</span>
          <span class="m-l">登录密码：TGlah7</span>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <div>
          <span>频道号：20210253</span>
          <span class="m-l">登录密码：TGlah7</span>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  updateRule,
  createRule,
  getRuleDetail,
  getRuleSelect,
  getSelectForPlan,
} from "@/api/exa";
export default {
  name: "LiveLinkDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      ageStart: "",
      ageEnd: "",
      workYear: "",
      eduValue: "",
      formData: {
        cate_id: "",
        rule_name: "",
        city: "",
        subject_id_str: [],
      },
      rules: {
        rule_name: [
          { required: true, message: "请输入直播名称", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择", trigger: "change" }],
        subject_id_str: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
            type: "array",
          },
        ],
        cate_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      classOptions: [],
      teacherOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.getRuleDetail();
      }
    },
    // 直播详情
    async getRuleDetail() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getRuleDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    resetForm() {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-dialog {
  .w-100 {
    width: 100%;
  }
  .m-l {
    margin-left: 50px;
  }
  .link-input {
    display: flex;
    button {
      margin-left: 10px;
    }
  }
}
</style>