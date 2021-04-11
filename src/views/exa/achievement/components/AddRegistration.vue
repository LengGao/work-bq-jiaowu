<template>
  <section>
    <el-dialog
      title="添加报考"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @closed="resetForm('formData')"
      @open="handleOpen"
      append-to-body
      width="450px"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="userName" class="common-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="cate_id">
          <el-cascader
            class="common-width"
            placeholder="请选择所属分类"
            v-model="formData.cate_id"
            :options="cateOptions"
            :props="{ checkStrictly: true }"
            clearable
            filterable
            @change="cateChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="考试计划" prop="pid">
          <el-select
            v-model="formData.pid"
            placeholder="请选择考试计划"
            class="common-width"
            @change="planChange"
            filterable
          >
            <el-option
              v-for="item in planOptions"
              :key="item.id"
              :label="item.plan_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试科目" prop="subject_id_str">
          <el-select
            v-model="formData.subject_id_str"
            placeholder="请选择考试科目"
            class="common-width"
            multiple
            filterable
            @change="handleSubjectChange"
          >
            <el-option
              v-for="item in subjectOption"
              :key="item.id"
              :label="item.subject_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试性质" prop="exam_type" class="exam_type">
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
            <el-radio :label="1">收</el-radio>
            <el-radio :label="2">不收</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button @click="hanldeAdd('formData')" type="primary"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { getCateList } from '@/api/sou'
import { getPlanSelect, enroll, getSubjectSelectForEnroll } from '@/api/exa'
import { cloneOptions } from '@/utils/index'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: '',
    },

    uids: {
      type: [Array, Object],
      default: '',
    },
  },
  data() {
    return {
      formData: {
        uid: this.uids,
        pid: '',
        subject_id_str: [],
        exam_type: '',
        charge: '',
      },
      subjectOption: [],
      planOptions: [],
      cateOptions: [],
      ruleForm: {},
      resit: 0, //补考费
      visible: this.value,
      rules: {
        cate_id: [{ required: true, message: '请选择', trigger: 'change' }],
        pid: [{ required: true, message: '请选择', trigger: 'change' }],
        subject_id_str: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        exam_type: [{ required: true, message: '请选择', trigger: 'change' }],
        charge: [{ required: true, message: '请选择', trigger: 'change' }],
      },
    }
  },
  created() {},
  watch: {
    // erid_arr(val) {
    //   this.formData = val
    // },
    value(val) {
      this.visible = val
    },
  },
  methods: {
    // 科目选择
    handleSubjectChange(selection) {
      if (selection) {
        this.getResit()
      } else {
        this.resit = 0
      }
    },
    // 根据选中的科目计算补考费
    getResit() {
      console.log(this.subjectOption)
      this.resit = this.subjectOption
        .filter((item) => this.formData.subject_id_str.includes(item.id))
        .reduce((pre, cur) => {
          return pre + cur.cost * 1
        }, 0)
    },
    handleOpen() {
      this.getCateList()
    },
    planChange(pid) {
      this.getSubjectSelectForEnroll(pid)
    },
    cateChange(ids) {
      const id = ids ? [...ids].pop() : ''
      this.getPlanSelect(id) //考试计划
    },
    hanldeAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.enroll()
        }
      })
      // this.enroll()
    },

    async getSubjectSelectForEnroll(pid) {
      const data = {
        pid: pid,
      }
      const res = await getSubjectSelectForEnroll(data)
      this.subjectOption = res.data
    },
    //提交
    async enroll() {
      const data = {
        ...this.formData,
        uid: this.uids,
      }
      const res = await enroll(data)
      if (res.code === 0) {
        this.$message.success(res.message)
        this.resetForm('formData')
        this.$emit('on-success')
      }
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.$refs[formName].resetFields()
      this.selection = []
      this.hanldeCancel()
    },
    // 计划列表
    async getPlanSelect(cate_id) {
      const data = {
        cate_id: cate_id,
        page: 1,
        limit: 9999,
      }
      const res = await getPlanSelect(data)
      this.planOptions = res.data
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cateOptions = cloneOptions(
          res.data,
          'category_name',
          'category_id',
          'son'
        )
        console.log(this.cateOptions)
      }
    },

    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.exam_type {
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
</style>
