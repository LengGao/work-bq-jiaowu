<template>
  <section>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="526px"
    >
      <el-form
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :show-message="true"
      >
        <el-form-item label="所属分类">
          <el-cascader
            ref="cascader"
            class="input-width"
            placeholder="请选择分类"
            v-model="ruleForm.pid"
            :options="selectData"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-input
            placeholder="请输入分类名称"
            v-model="ruleForm.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类排序：">
          <el-input
            v-model="ruleForm.sort"
            class="input-width"
            placeholder=" 排序数字越大分类越靠前"
            type="number"
            @mousewheel.native.prevent
          ></el-input>
          <!-- <p style="color:#aaa;ling-height:20px">
            排序数字越大分类越靠前,最小值为1
          </p> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
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
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  data() {
    return {
      dialogVisible: false,
      selectData: [],
      dialogTitle: "",
      ruleForm: {
        pid: "",
        category_name: "",
        sort: "",
        index_category_name: "",
      },
      rules: {
        index_category_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            //修改
            this.subjectList();
          } else {
            //添加分类
            this.insertCategory();
            this.dialogVisible = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
