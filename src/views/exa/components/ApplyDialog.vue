<template>
  <!--考试计划弹框-->
  <el-dialog :title="title" :visible.sync="visible" width="450px" class="apply-dialog" @open="handleOpen" :close-on-click-modal="false" @closed="resetForm('formData')">
    <el-form label-width="100px" :model="formData" :rules="rules" ref="formData" v-loading="detaiLoading">
      <el-form-item label="所属分类" prop="cate_id">
        <el-cascader style="width: 100%" v-model="formData.cate_id" placeholder="请选择所属分类" filterable clearable :props="{ checkStrictly: true }" :options="typeOptions" @change="handleTypeChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="计划名称" prop="plan_name">
        <el-input maxlength="30" placeholder="请输入计划名称" v-model="formData.plan_name"></el-input>
      </el-form-item>
      <el-form-item label="报考规则" prop="rule_id">
        <el-select style="width: 100%" v-model="formData.rule_id" placeholder="请选择" filterable>
          <el-option v-for="item in ruleOptions" :key="item.id" :label="item.rule_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试日期" prop="date1">
        <el-date-picker v-model="formData.date1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报考日期" prop="date2">
        <el-date-picker v-model="formData.date2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划人数">
        <el-input placeholder="请输入计划人数" v-model="formData.max_num" type="number"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input maxlength="10" placeholder="请输入备注信息" v-model="formData.comment"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" :loading="addLoading" @click="submitForm('formData')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePlan, createPlan, planInfo, getSelectForPlan } from '@/api/exa'
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
      visible: this.value,
      formData: {
        cate_id: '',
        plan_name: '',
        rule_id: '',
        date1: '',
        date2: '',
        max_num: '',
        comment: '',
      },
      rules: {
        rule_id: [{ required: true, message: '请选择', trigger: 'change' }],
        date2: [{ required: true, message: '请选择', trigger: 'change' }],
        date1: [{ required: true, message: '请选择', trigger: 'change' }],
        cate_id: [{ required: true, message: '请选择科分类', trigger: 'change' }],
        plan_name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
      },
      addLoading: false,
      detaiLoading: false,
      ruleOptions: [],
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },

  methods: {
    handleOpen() {
      if (this.id) {
        this.planInfo()
      }
    },
    // 编辑时获取详情
    async planInfo() {
      const data = {
        id: this.id,
      }
      this.detaiLoading = true
      const res = await planInfo(data).catch(() => {
        this.detaiLoading = false
      })
      this.detaiLoading = false
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k]
        }
        this.formData.date1 = [res.data.exam_start_time, res.data.exam_end_time]
        this.formData.date2 = [res.data.enroll_start_time, res.data.enroll_end_time]

        this.getSelectForPlan(res.data.cate_id)
      }
    },
    // 选择分类时
    handleTypeChange(val) {
      this.formData.rule_id = ''
      val && val.length && this.getSelectForPlan([...val].pop())
    },
    // 获取考试规则选项
    async getSelectForPlan(id) {
      const data = {
        cate_id: id,
      }
      const res = await getSelectForPlan(data)
      if (res.code === 0) {
        this.ruleOptions = res.data.rule
      }
    },
    async submit() {
      const date1 = this.formData.date1
      const date2 = this.formData.date2
      const data = {
        ...this.formData,
        cate_id: Array.isArray(this.formData.cate_id)
          ? [...this.formData.cate_id].pop()
          : this.formData.cate_id,
        exam_start_time: date1[0],
        exam_end_time: date1[1],
        enroll_start_time: date2[0],
        enroll_end_time: date2[1],
      }
      if (this.id) {
        data.id = this.id
      }
      const api = this.id ? updatePlan : createPlan
      this.addLoading = true
      const res = await api(data).catch(() => {
        this.addLoading = false
      })
      this.addLoading = false
      if (res.code === 0) {
        this.$message.success(`考试计划${this.id ? '编辑' : '新增'}成功`)
        this.resetForm('formData')
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
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.formData.cate_id = 1
      setTimeout(() => {
        this.formData.cate_id = ''
      }, 10)
      this.$refs[formName].resetFields()
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.apply-dialog {
  /deep/.el-dialog__body {
    padding-right: 40px;
  }
}
</style>