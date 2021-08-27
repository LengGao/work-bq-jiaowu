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
      <el-form-item label="发放类型" prop="radio">
        <el-radio-group
          :disabled="ids.length > 1"
          v-model="ruleForm.radio"
          @change="handleRadioChange"
        >
          <el-radio :label="0">正常发放</el-radio>
          <el-radio :label="1"
            >追加教材
            <sup
              title="追加教材可以发放任意仓库的任意教材，可以与原有教材重复，但如果原有教材尚未发放则不予追加"
              class="el-icon-question tips"
            ></sup
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="仓库名称" prop="storage_id">
        <el-select
          clearable
          filterable
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
      <el-form-item label="发放教材" prop="books_arr">
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
          <el-table-column
            prop="number"
            label="补放数量"
            min-width="110"
            show-overflow-tooltip
            v-if="ruleForm.radio"
          >
            <template slot-scope="{ row }">
              <el-input
                type="number"
                v-model="row.value"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="发放形式" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">现场发放</el-radio>
          <el-radio :label="2">快递发放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input placeholder="请输入" v-model="ruleForm.remark"></el-input>
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
import {
  dispenseBooks,
  getAdditionalTextbook,
  issueAdditionalTextbook,
} from "@/api/eda";
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
    projectInfo: {
      type: Object,
      default: () => ({}),
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
        books_arr: [],
        radio: 0,
      },
      rules: {
        books_arr: [
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
    handleRadioChange() {
      this.listData = [];
      this.ruleForm.books_arr = [];
      this.ruleForm.storage_id = "";
    },
    handleOpen() {
      this.ruleForm.radio = 0;
      this.getStorageOptions();
    },
    handleSeletChange(selection) {
      this.ruleForm.books_arr = selection || [];
    },
    handleStorageChange() {
      if (this.ruleForm.radio) {
        this.getAdditionalTextbook();
      } else {
        this.getstoragebook();
      }
    },
    // 发放教材
    async dispenseBooks() {
      const data = {
        id_arr: this.ids,
        ...this.ruleForm,
        books_id_arr: this.ruleForm.books_arr.map((item) => item.book_id),
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
    // 补放教材
    async issueAdditionalTextbook() {
      const data = {
        uid: this.ids.toString(),
        ...this.ruleForm,
        book_arr: this.ruleForm.books_arr.map((item) => ({
          book_id: item.book_id,
          num: item.value,
        })),
      };
      this.addLoading = true;
      const res = await issueAdditionalTextbook(data).catch(() => {
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
      this.ruleForm.books_arr = [];
      const data = {
        bind_project: this.projectInfo.project_id, //获取已绑定项目的教材
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
    //追加教材列表
    async getAdditionalTextbook() {
      this.ruleForm.books_arr = [];
      const data = {
        project_id: this.projectInfo.project_id, //获取已绑定项目的教材
        storage_id: this.ruleForm.storage_id,
        uid: this.projectInfo.uid,
      };
      this.listLoading = true;
      const res = await getAdditionalTextbook(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.map((item) => ({
          ...item,
          value: "",
        }));
      }
    },
    // handlePageChange(val) {
    //   this.pageNum = val;
    //   this.getstoragebook();
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.radio) {
            if (this.ruleForm.books_arr.some((item) => item.value < 1)) {
              this.$message.error("请输入有效补发数量");
              return;
            }
            this.issueAdditionalTextbook();
          } else {
            this.dispenseBooks();
          }
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
.tips {
  color: #ddd;
}
</style>