<template>
  <!--添加编辑报考学生弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="450px"
    @open="handleOpen"
    class="student-dialog"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="报考学生" prop="names">
        <div class="user-input" v-if="formData.names">
          <el-input disabled v-model="formData.names"></el-input>
          <el-button @click="openSelect" v-if="!id">修改</el-button>
        </div>
        <el-button
          v-else
          icon="el-icon-plus"
          @click="openSelect"
          style="width: 100%"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="考试科目" prop="subject_id_str">
        <el-select
          style="width: 100%"
          v-model="formData.subject_id_str"
          placeholder="请选择"
          multiple
          @change="handleSubjectChange"
        >
          <el-option
            v-for="item in subOptions"
            :key="item.id"
            :label="item.subject_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试性质" prop="exam_type" class="exam-type">
        <el-radio-group v-model="formData.exam_type">
          <el-radio :label="1">新考</el-radio>
          <el-radio :label="2">补考</el-radio>
        </el-radio-group>
        <span class="desc" v-if="formData.exam_type === 2"
          >费用合计：<span>￥{{ resit.toFixed(2) }}</span></span
        >
      </el-form-item>
      <el-form-item
        label="是否收费"
        prop="charge"
        v-if="formData.exam_type === 2"
      >
        <el-radio-group v-model="formData.charge">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
    <StudentSelectDialog
      :checkeds="selection"
      v-model="selectDialog"
      @on-select="handleSelect"
    />
  </el-dialog>
</template>

<script>
import StudentSelectDialog from "./StudentSelectDialog";
import {
  updateEnroll,
  enroll,
  enrollInfo,
  getSubjectSelectForEnroll,
} from "@/api/exa";
export default {
  components: {
    StudentSelectDialog,
  },
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
  },
  data() {
    return {
      visible: this.value,
      formData: {
        exam_type: "",
        subject_id_str: [],
        names: "",
        charge: "",
      },
      rules: {
        charge: [{ required: true, message: "请选择", trigger: "change" }],
        subject_id_str: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        names: [{ required: true, message: "请选择", trigger: "change" }],
        exam_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      subOptions: [],
      addLoading: false,
      detaiLoading: false,
      selectDialog: false,
      selection: [],
      resit: 0, //补考费
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // 科目选择
    handleSubjectChange(selection) {
      if (selection) {
        this.getResit();
      } else {
        this.resit = 0;
      }
    },
    // 根据选中的科目计算补考费
    getResit() {
      this.resit = this.subOptions
        .filter((item) => this.formData.subject_id_str.includes(item.id))
        .reduce((pre, cur) => {
          return pre + cur.cost * 1;
        }, 0);
    },
    // 选中的学生数据
    handleSelect(selection) {
      this.selection = selection;
      const len = selection.length;
      const showNmaes = selection.slice(0, 2);
      const desc = len > 2 ? `  ...等${len}人` : "";
      this.formData.names =
        showNmaes.map((item) => item.user_realname).join("，") + desc;
    },
    // 打开学生选择
    openSelect() {
      this.selectDialog = true;
    },
    handleOpen() {
      this.getSubjectSelectForEnroll();
      if (this.id) {
        this.enrollInfo();
      }
    },
    async getSubjectSelectForEnroll() {
      const data = {
        pid: this.$route.query?.id,
      };
      const res = await getSubjectSelectForEnroll(data);
      if (res.code === 0) {
        this.subOptions = res.data;
      }
    },
    async enrollInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await enrollInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        this.formData.subject_id_str = res.data?.sub_subject_arr.map(
          (item) => item * 1
        );
        this.formData.names = res.data?.user_realname;
        //计算补考费
        this.$nextTick(() => {
          this.getResit();
        });
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      // 修改
      if (this.id) {
        data.id = this.id;
      } else {
        //新增
        data.uid = this.selection.map((item) => item.uid);
        data.pid = this.$route.query?.id;
      }
      const api = this.id ? updateEnroll : enroll;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.selection = [];
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.student-dialog {
  .user-input {
    display: flex;
    align-items: center;
    button {
      padding: 12px 6px;
      margin-left: 6px;
    }
  }
  .exam-type {
    /deep/.el-form-item__content {
      .desc {
        margin-left: 20px;
        vertical-align: middle;
        span {
          color: #2798ef;
        }
      }
    }
  }
}
</style>