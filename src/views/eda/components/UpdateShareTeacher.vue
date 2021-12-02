<template>
  <!--修改共享老师弹窗-->
  <el-dialog
    title="更换共享老师"
    :visible.sync="visible"
    width="450px"
    @open="getStaffList"
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
      <el-form-item label="老师名称" prop="staff_id_arr">
        <el-select
          class="input"
          v-model="formData.staff_id_arr"
          placeholder="请选择"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="item in staffOptions"
            :key="item.staff_id"
            :value="item.staff_id"
            :label="item.staff_name"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.group_name
            }}</span>
          </el-option>
        </el-select>
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
import { getStaffList } from "@/api/set";
import { updateUnionStaffId } from "@/api/crm";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: [String, Number],
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
        staff_id_arr: [],
      },
      rules: {
        staff_id_arr: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      staffOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      this.detaiLoading = true;
      const res = await getStaffList(data).catch(() => {});
      this.detaiLoading = false;
      if (res.code === 0) {
        this.staffOptions = res.data.list;
      }
    },
    async updateUnionStaffId() {
      const data = {
        staff_id_arr: this.formData.staff_id_arr,
        uid: this.uid,
        id: this.id,
      };
      this.addLoading = true;
      const res = await updateUnionStaffId(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },

    async submit() {
      this.updateUnionStaffId();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.formData.staff_id_arr = [];
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>