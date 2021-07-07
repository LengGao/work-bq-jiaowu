<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="700px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      inline
      v-loading="detaiLoading"
    >
      <el-form-item label="学历形式" prop="type_id">
        <el-select
          v-model="formData.type_id"
          placeholder="请选择"
          style="300px"
          filterable
        >
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院校名称" prop="school_id">
        <el-select v-model="formData.school_id" filterable placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="层次名称" prop="level_id">
        <el-select v-model="formData.level_id" filterable placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称" prop="major_id">
        <el-select v-model="formData.major_id" filterable placeholder="请选择">
          <el-option
            v-for="item in options4"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学制（年）" prop="school_system">
        <el-input
          class="w-217"
          type="number"
          v-model="formData.school_system"
          placeholder="请输入"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="关联项目" prop="project_id">
        <el-cascader
          placeholder="请选择"
          class="w-217"
          v-model="formData.project_id"
          :options="projectOptions"
          :show-all-levels="false"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="总学费" prop="price">
        <el-input
          class="w-217"
          type="number"
          maxlength="20"
          v-model="formData.price"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="最低学费" prop="lowest_price">
        <el-input
          class="w-217"
          type="number"
          v-model="formData.lowest_price"
          placeholder="请输入"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="位置排序" prop="sort">
        <el-input
          class="w-217"
          v-model="formData.sort"
          type="number"
          placeholder="请输入"
          maxlength="20"
        />
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
  </el-dialog>
</template>

<script>
import {
  editUniversityMajorDetail,
  addUniversityMajorDetail,
  getUniversityMajorDetailInfo,
} from "@/api/sou";
import { getCateProjectOption } from "@/api/etm";
export default {
  name: "EditMajorDialog",
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
    options1: {
      type: Array,
      default: () => [],
    },
    options2: {
      type: Array,
      default: () => [],
    },
    options3: {
      type: Array,
      default: () => [],
    },
    options4: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        type_id: "",
        school_id: "",
        level_id: "",
        major_id: "",
        project_id: "",
        school_system: "",
        sort: "",
        price: "",
        lowest_price: "",
      },
      rules: {
        type_id: [{ required: true, message: "请选择", trigger: "change" }],
        school_id: [{ required: true, message: "请选择", trigger: "change" }],
        level_id: [{ required: true, message: "请选择", trigger: "change" }],
        major_id: [{ required: true, message: "请选择", trigger: "change" }],
        lowest_price: [{ required: true, message: "请输入", trigger: "blur" }],
        price: [{ required: true, message: "请输入", trigger: "blur" }],
        school_system: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      projectOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      this.getCateProjectOption();
      if (this.id) {
        this.getUniversityMajorDetailInfo();
      }
    },
    // 获取项目选项
    async getCateProjectOption() {
      const res = await getCateProjectOption();
      if (res.code === 0) {
        this.projectOptions = res.data || [];
      }
    },
    async getUniversityMajorDetailInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getUniversityMajorDetailInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          if (k === "school_system") {
            this.formData[k] = +res.data[k] || "";
          } else {
            this.formData[k] = res.data[k];
          }
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        project_id: Array.isArray(this.formData.project_id)
          ? [...this.formData.project_id].pop()
          : this.formData.project_id,
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id
        ? editUniversityMajorDetail
        : addUniversityMajorDetail;
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
.w-217 {
  width: 217px;
}
</style>
