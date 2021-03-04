<template>
  <section class="mainwrap">
    <!--表单部分-->
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      ref="ruleForm"
      :model="form"
      :show-message="true"
      :rules="rules"
      label-position="left"
    >
      <el-row>
        <el-col :sm="8">
          <el-form-item label="学员编号">
            <el-input disabled v-model="ruleForm.uid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="注册时间">
            <el-input v-model="ruleForm.create_time" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="学员名称：">
            <el-input v-model="ruleForm.realname" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="手机号码：">
            <el-input
              v-model="ruleForm.mobile"
              disabled
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="报读课程">
            <el-input v-model="ruleForm.course_name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8"> </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="课程金额">
            <el-input
              v-model="ruleForm.pay_amount"
              disabled
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="实收金额" prop="amount">
            <el-input v-model="form.amount" type="number"></el-input>
          </el-form-item> </el-col
      ></el-row>
      <el-row>
        <template v-if="refund">
          <el-col :sm="8">
            <el-form-item label="退费金额" prop="refunds_amount">
              <el-input v-model="form.refunds_amount" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="退费原因" prop="refunds_reason">
              <el-select
                filterable
                v-model="form.refunds_reason"
                placeholder="请选择退费原因"
              >
                <el-option
                  v-for="item in reasons_refund.field_content"
                  :key="item.field_id"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="!refund">
          <el-col :sm="8">
            <el-form-item label="缴费方式" prop="payment_method">
              <el-select
                filterable
                v-model="form.payment_method"
                placeholder="请选择缴费方式"
              >
                <el-option
                  v-for="item in payment_method.field_content"
                  :key="item.field_id"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="课程有效期" prop="effective_time">
              <el-select
                filterable
                v-model="form.effective_time"
                placeholder="请选择有效期"
              >
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-form-item label="备注信息" prop="common">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.common"
        ></el-input>
      </el-form-item>
      <el-form-item class="entybtn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'payMent',
  data() {
    return {
      ruleForm: {},
      create_time: '',
      reasons_refund: [],
      refund: '',
      lastPage: '',
      form: {
        amount: '',
        common: '',
        payment_method: '',
        effective_time: '',
      },
      rules: {
        amount: [{ required: true, message: '实收金额', trigger: 'blur' }],
        payment_method: [
          { required: true, message: '请选择缴费方式', trigger: 'change' },
        ],
        effective_time: [
          { required: true, message: '请选择课程有效期', trigger: 'change' },
        ],
        refunds_amount: [
          { required: true, message: '请填写退费金额', trigger: 'blur' },
        ],
        refunds_reason: [
          { required: true, message: '请选择退费原因', trigger: 'change' },
        ],
      },

      payment_method: [],
      year: [
        {
          value: 1,
          label: '一年',
        },
        {
          value: 2,
          label: '两年',
        },
        {
          value: 3,
          label: '三年',
        },
        {
          value: 4,
          label: '四年',
        },
      ],
    }
  },
  created() {
    this.refund = this.$route.query.refund
    console.log(this.refund)
    let lastPage = this.$route.query.lastPage
    lastPage ? (this.lastPage = lastPage) : ''
  },
  mounted() {
    if (this.refund == 'refund') {
      this.$route.meta.title = '退费'
      // document.title = '退费'
      this.$api.refunds(this, 'GET')
      let field_text = '退费原因'
      this.$api.getfieldinfo(this, 'reasons_refund', field_text)
    } else {
      this.$route.meta.title = '缴费'
      this.$api.payMent(this, 'ruleForm')
      let field_text = '缴费方式'
      this.$api.getfieldinfo(this, 'payment_method', field_text)
    }
  },
  methods: {
    //取消
    cancel() {
      this.$router.go(-1)
    },
    changeLeaning() {},
    //保存
    saveLink(formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            if (this.refund == 'refund') {
              this.$api.refunds(this, this.form)
            } else {
              this.$api.paySend(this, this.form)
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
      console.log(this.form)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.demo-ruleForm {
  margin-top: 30px;
  .el-row {
    padding-bottom: 20px;
  }
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
.el-input {
  width: 238px;
}
.el-select {
  width: 238px;
}

/deep/.el-textarea__inner {
  width: 740px;
  height: 90px;
}
.entybtn {
  display: flex;
  justify-content: flex-start;
}
</style>
