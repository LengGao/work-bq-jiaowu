<template>
  <section>
    <el-dialog
      title="添加报考"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @closed="resetForm('formData')"
      @open="handleOpen"
      append-to-body
      width="420px"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="userName" class="common-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="name">
          <el-cascader
            class="common-width"
            placeholder="请选择所属分类"
            :options="cateOptions"
            :props="{ checkStrictly: true }"
            clearable
            @change="cateChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="考试计划" prop="name">
          <el-select
            v-model="formData.pid"
            placeholder="请选择考试计划"
            class="common-width"
            @change="planChange"
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
        <el-form-item label="考试科目" prop="name">
          <el-select
            v-model="formData.subject_id_str"
            placeholder="请选择考试科目"
            class="common-width"
            multiple
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
        <el-form-item label="考试性质" prop="name">
          <el-radio-group v-model="formData.exam_type">
            <el-radio :label="1">新考</el-radio>
            <el-radio :label="2">补考</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否收费" prop="name">
          <el-radio-group v-model="formData.charge">
            <el-radio :label="1">收</el-radio>
            <el-radio :label="2">不收</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button @click="hanldeAdd('ruleForm')" type="primary"
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
    erid_arr: {
      type: [Array, Object],
      default: '',
    },
  },
  data() {
    return {
      rules: {},
      formData: {
        uid: this.erid_arr,
        pid: '',
        subject_id_str: [],
        exam_type: '',
        charge: '',
      },
      subjectOption: [],
      planOptions: [],
      cateOptions: [],
      ruleForm: {},
      visible: this.value,
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
        uid: this.erid_arr,
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

<style></style>
