<template>
  <el-dialog
    title="添加工单"
    :visible="value"
    width="950px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="工单名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入工单名称" />
      </el-form-item>
      <div
        v-for="(item, index) in formData.student"
        :key="item.id"
        class="user-form"
      >
        <el-form-item label="关联学生">
          <el-select
            v-model="formData.student[index].uid"
            placeholder="请输入学生姓名/手机号码"
            clearable
            filterable
            remote
            @change="(e) => getOrderSelect(e, index)"
            :remote-method="(e) => getUserSelect(e, index)"
          >
            <el-option
              v-for="item in formData.student[index].studentOptions"
              :key="item.uid"
              :value="item.uid"
              :label="`${item.user_realname} ${item.telphone}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联订单">
          <el-select
            class="select"
            v-model="formData.student[index].orderIds"
            placeholder="请选择订单"
            clearable
            multiple
            filterable
            collapse-tags
          >
            <el-option
              v-for="item in formData.student[index].orderOptions"
              :key="item.order_id"
              :value="item.order_id"
              :label="item.order_name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span class="from-actions">
          <i
            class="el-icon-remove-outline del"
            v-if="formData.student.length > 1"
            @click="handleDelForm(index)"
          ></i>
          <i class="el-icon-circle-plus-outline add" @click="handleAddForm"></i>
        </span>
      </div>
      <el-form-item label="问题描述" prop="description">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.description"
          placeholder="请输入问题描述"
        />
      </el-form-item>
      <el-form-item label="问题截图">
        <el-upload
          class="upload"
          :headers="headers"
          :action="uploadImageUrl"
          :on-remove="handleRemoveImg"
          :before-remove="beforeRemoveImg"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          multiple
          name="image"
          accept="image/*"
          list-type="picture-card"
          :file-list="formData.images"
        >
          <i class="el-icon-plus" style="font-size: 14px"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getUserSelect, getOrderSelect, submitWorkorder } from "@/api/set";
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "AddWorkOrder",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addLoading: false,
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      formData: {
        title: "",
        description: "",
        images: [],
        student: [
          {
            uid: "",
            orderIds: [],
            orderOptions: [],
            studentOptions: [],
            id: 1,
          },
        ],
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        description: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },

  methods: {
    async getOrderSelect(uid, index) {
      this.formData.student[index].orderIds = [];
      this.formData.student[index].orderOptions = [];
      if (!uid) {
        return;
      }
      const data = { uid };
      const res = await getOrderSelect(data);
      if (res.code === 0) {
        this.formData.student[index].orderOptions = res.data;
      }
    },
    async getUserSelect(search_box, index) {
      const data = { search_box };
      const res = await getUserSelect(data);
      if (res.code === 0) {
        this.formData.student[index].studentOptions = res.data;
      }
    },
    handleDelForm(index) {
      this.formData.student.splice(index, 1);
    },
    handleAddForm() {
      this.formData.student.push({
        uid: "",
        orderIds: [],
        orderOptions: [],
        studentOptions: [],
        id: +new Date(),
      });
    },
    handleUploadError(response, file, fileList) {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(response, file, fileList) {
      this.formData.images = fileList;
    },
    handleRemoveImg(file, fileList) {
      this.formData.images = fileList;
    },
    beforeRemoveImg(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async submit() {
      const { student, images, ...rest } = this.formData;
      const uid_order = student.map(({ uid, orderIds }) => {
        return {
          uid,
          order: orderIds.map((order_id) => ({
            order_id,
          })),
        };
      });
      const data = {
        ...rest,
        uid_order: uid_order[0]?.uid ? uid_order : [],
        images: images.map((item) => item.response.data.data.url),
      };
      this.addLoading = true;
      const res = await submitWorkorder(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("success");
        this.hanldeClose();
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
      this.$refs[formName].resetFields();
      this.formData = {
        title: "",
        description: "",
        images: [],
        student: [
          {
            uid: "",
            orderIds: [],
            orderOptions: [],
            studentOptions: [],
            id: 1,
          },
        ],
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="less" scoped>
.user-form {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  .el-form-item {
    margin-bottom: 0;
  }
  .from-actions {
    i {
      font-size: 24px;
      margin-left: 10px;
      cursor: pointer;
      &.add {
        color: #199fff;
      }
      &.del {
        color: #ff4e00;
      }
    }
  }
}
.select {
  width: 400px;
}
.upload {
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
  }
  /deep/.el-upload--picture-card {
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
}
</style>


