<template>
  <section class="mainwrap">
    <!--表单部分-->
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      ref="ruleForm"
      :model="form"
      :show-message="true"
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
              v-model="ruleForm.amount"
              disabled
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="实收金额" prop="amount">
            <el-input
              disabled
              v-model="ruleForm.pay_amount"
              type="number"
            ></el-input>
          </el-form-item> </el-col
      ></el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="退费金额">
            <el-input
              v-model="ruleForm.pay_amount"
              disabled
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="退费原因">
            <el-input disabled v-model="ruleForm.refunds_reason"></el-input>
          </el-form-item> </el-col
      ></el-row>
      <el-form-item label="备注信息">
        <el-input
          type="textarea"
          disabled
          placeholder="请输入内容"
          v-model="ruleForm.refunds_common"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item class="entybtn">
        <el-button>取消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">保存</el-button>
      </el-form-item> -->
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'payMent',
  data() {
    return {
      ruleForm: {},
      reasons_refund: [],
      refund: '',
      form: {
        amount: '',
        common: '',
        payment_method: '',
        effective_time: '',
      },

      payment_method: [],
    }
  },
  created() {
    this.intent_id = this.$route.query.intent_id
    this.$api.refundDetail(this, 'ruleForm')
  },
  mounted() {
    // if (this.refund == 'refund') {
    //   this.$api.refunds(this, 'GET')
    //   let field_text = '退费原因'
    //   this.$api.getfieldinfo(this, 'reasons_refund', field_text)
    // } else {
    //   this.$api.payMent(this, 'paylist')
    //   let field_text = '缴费方式'
    //   this.$api.getfieldinfo(this, 'payment_method', field_text)
    // }
  },
  methods: {
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
