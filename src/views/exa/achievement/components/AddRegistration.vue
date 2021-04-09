<template>
  <section>
    <el-dialog
      title="添加报考"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="hanldeCancel"
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
          <el-input v-model="formData.name" class="common-width"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="name">
          <el-cascader
            class="common-width"
            placeholder="请选择所属分类"
            :options="cateOptions"
            :props="{ checkStrictly: true }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="考试计划" prop="name">
          <el-select
            v-model="formData"
            placeholder="请选择考试计划"
            class="common-width"
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
            v-model="formData"
            placeholder="请选择考试科目"
            class="common-width"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button @click="hanldeCancel">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { getCateList } from '@/api/sou'
import { subjectList } from '@/api/examination'
import { planList, deletePlan } from '@/api/exa'
import { cloneOptions } from '@/utils/index'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {},
      formData: {},
      subjectOption: [],
      planOptions: [],
      cateOptions: [],
      ruleForm: {},
      visible: this.value,
    }
  },
  created() {},
  watch: {
    value(val) {
      this.visible = val
    },
  },
  methods: {
    handleOpen() {
      this.subjectList() //考试科目列表
      this.getCateList()
      this.planList()
    },
    async subjectList() {
      const data = {
        page: 1,
        limit: 9999,
      }
      const res = await subjectList(data)
      this.subjectOption = res.data.list
    },
    // 计划列表
    async planList() {
      const data = {
        page: 1,
        limit: 9999,
      }
      const res = await planList(data)
      this.planOptions = res.data.list
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
