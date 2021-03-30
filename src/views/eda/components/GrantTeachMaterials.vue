<template>
  <!--发放教材弹框-->
  <el-dialog
    title="发放教材"
    :visible.sync="visible"
    width="700px"
    top="30px"
    class="grant-teach-materials"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('ruleForm')"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="仓库名称" prop="storage_id">
        <el-select
          v-model="ruleForm.storage_id"
          placeholder="请选择"
          @change="handleStorageChange"
        >
          <el-option
            v-for="item in storageOptions"
            :key="item.id"
            :label="item.storage_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发放教材" prop="books_id_arr">
        <el-table
          :data="listData"
          style="width: 100%"
          @selection-change="handleSeletChange"
          v-loading="listLoading"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="book_name"
            label="教材名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="number"
            label="库存数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="发放形式" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">现场发放</el-radio>
          <el-radio :label="2">快递发放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        :loading="addLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import { getStorageOptions, getstoragebook } from "@/api/sou";
import { dispenseBooks } from "@/api/eda";
export default {
  components: {
    SearchList,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
      default: () => [],
    },
    projectId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      storageOptions: [],
      ruleForm: {
        storage_id: "",
        remark: "",
        type: "",
        books_id_arr: [],
      },
      rules: {
        books_id_arr: [
          {
            required: true,
            message: "请选择需要发放的教材",
            trigger: "change",
          },
        ],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        storage_id: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      listData: [],
      listLoading: false,
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getStorageOptions();
    },
    handleSeletChange(selection) {
      this.ruleForm.books_id_arr = selection.map((item) => item.book_id);
    },
    handleStorageChange() {
      this.getstoragebook();
    },
    // 发放教材
    async dispenseBooks() {
      const data = {
        id_arr: this.ids,
        ...this.ruleForm,
      };
      this.addLoading = true;
      const res = await dispenseBooks(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    //获取仓库下拉
    async getStorageOptions() {
      const res = await getStorageOptions();
      if (res.code === 0) {
        this.storageOptions = res.data?.data || [];
      }
    },
    //仓库教材
    async getstoragebook() {
      this.ruleForm.books_id_arr = [];
      const data = {
        bind_project: this.projectId, //获取已绑定项目的教材
        storage_id: this.ruleForm.storage_id,
      };
      this.listLoading = true;
      const res = await getstoragebook(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.data;
      }
    },
    // handlePageChange(val) {
    //   this.pageNum = val;
    //   this.getstoragebook();
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dispenseBooks();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.listData = [];
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-remark {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .remark {
    width: 300px;
  }
  .number {
    margin-right: 20px;
  }
}
</style>