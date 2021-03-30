<template>
  <!--添加仓库弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="700px"
    class="add-class"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属分类" prop="category_id">
            <el-cascader
              style="width: 100%"
              v-model="formData.category_id"
              placeholder="请选择所属分类"
              :options="typeOptions"
              @change="handleTypeChange"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属项目">
            <el-select
              :disabled="!formData.category_id"
              v-model="formData.project_id"
              placeholder="请选择所属项目"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.project_id"
                :label="item.project_name"
                :value="item.project_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="班级名称" prop="classroom_name">
            <el-input
              placeholder="请输入班级名称"
              v-model="formData.classroom_name"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="班主任" prop="master_teacher_id">
            <el-select
              v-model="formData.master_teacher_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in staffOptions"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="班级封面">
        <div class="class-cover-upload">
          <el-upload
            class="upload-item"
            name="image"
            :headers="headers"
            :action="uploadImageUrl"
            :show-file-list="false"
            :on-error="handleUploadError"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <div v-if="formData.class_icon" class="imgs">
              <img :src="formData.class_icon" />
              <i class="del el-icon-close" @click.stop="hanldeDelete"></i>
            </div>
            <i
              v-if="!uploadLoading && !formData.class_icon"
              class="el-icon-plus upload-item-icon"
            ></i>
            <i class="el-icon-loading upload-loading" v-if="uploadLoading"></i>
          </el-upload>
          <div class="upload-desc">
            <p>1. 支持jpg、jpeg、png、gif、bmp格式；</p>
            <p>2. 推荐尺寸750*422px或者16:9</p>
          </div>
        </div>
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
import { uploadImageUrl } from '@/api/educational'
import {
  getHeadMasters,
  getproject,
  addClassroom,
  editClassroom,
  getClassroomDetail,
} from '@/api/eda'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    id: {
      type: [String, Number],
      default: '',
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
      formData: {
        category_id: '',
        project_id: '',
        classroom_name: '',
        master_teacher_id: '',
        class_icon: '',
      },
      rules: {
        classroom_name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
        ],
        category_id: [{ required: true, message: '请选择', trigger: 'change' }],
        master_teacher_id: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
      addLoading: false,
      uploadLoading: false,
      projectOptions: [],
      staffOptions: [],
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },

  methods: {
    //班主任下拉
    async getHeadMasters() {
      const data = {}
      const res = await getHeadMasters(data)
      if (res.code === 0) {
        this.staffOptions = res.data.list
      }
    },
    handleOpen() {
      this.getHeadMasters()
      if (this.id) {
        this.getClassroomDetail()
      }
    },
    async getClassroomDetail() {
      const data = {
        classroom_id: this.id,
      }
      const res = await getClassroomDetail(data)
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k]
        }
        this.getproject(this.formData.category_id)
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        category_id: Array.isArray(this.formData.category_id)
          ? this.formData.category_id.pop()
          : this.formData.category_id,
      }
      if (this.id) {
        data.classroom_id = this.id
      }
      const api = this.id ? editClassroom : addClassroom
      this.addLoading = true
      const res = await api(data).catch(() => {
        this.addLoading = false
      })
      this.addLoading = false
      if (res.code === 0) {
        this.$message.success(`班级${this.id ? '编辑' : '新增'}成功`)
        this.hanldeCancel()
        this.$emit('on-success')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
    // 当分类选择时
    handleTypeChange(ids) {
      this.formData.project_id = ''
      const id = ids ? [...ids].pop() : ''
      this.getproject(id)
    },
    // 获取项目下拉
    async getproject(category_id = '') {
      const data = {
        category_id,
      }
      const res = await getproject(data)
      if (res.code === 0) {
        this.projectOptions = res.data
      }
    },
    handleUploadSuccess(res) {
      console.log(res)
      this.formData.class_icon = res.data?.data?.url || ''
      this.uploadLoading = false
    },
    handleUploadError() {
      this.formData.class_icon = ''
      this.uploadLoading = false
    },
    hanldeDelete() {
      this.formData.class_icon = ''
    },
    beforeUpload(file) {
      const isImg = file.type.indexOf('image') !== -1
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isImg) {
        this.$message.error('请上传图片')
        return false
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        return false
      }
      this.uploadLoading = true
    },
  },
}
</script>

<style lang="scss" scoped>
.class-cover-upload {
  .upload-desc {
    //   #c0c4cc
    p {
      line-height: 1.5;
      color: #909399;
    }
  }
  .upload-item {
    position: relative;
    width: calc(100% / 4);
  }
  .upload-item /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-item /deep/.el-upload:hover {
    border-color: #409eff;
  }
  .upload-item-icon,
  .upload-loading {
    font-size: 28px;
    color: hsl(215, 8%, 58%);
    width: 220px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .imgs {
    padding: 5px;
    width: 220px;
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .del {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
    }
    &:hover {
      .del {
        color: #333;
        display: block;
      }
    }
  }
}
</style>
