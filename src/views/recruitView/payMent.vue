<template>
  <section class="main">
    <breadcrumb class="breadcrumb"></breadcrumb>
    <!--表单部分-->
    <el-form label-width="100px"
             class="demo-ruleForm"
             :show-message="true"
             label-position="left">
      <el-row>
        <el-col :sm="8">
          <el-form-item label="学员编号"
                        prop="user_nicename">
            <el-input placeholder="73473"
                      disabled
                      v-model="ruleForm.user_nicename"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="注册时间"
                        prop="telphone">
            <el-input v-model="ruleForm.telphone"
                      disabled
                      type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="学员名称："
                        prop="user_nicename">
            <el-input v-model="ruleForm.user_nicename"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="手机号码："
                        prop="telphone">
            <el-input v-model="ruleForm.telphone"
                      disabled
                      type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="报读课程"
                        prop="user_nicename">
            <el-input v-model="ruleForm.user_nicename"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="课程金额"
                        prop="telphone">
            <el-input v-model="ruleForm.telphone"
                      disabled
                      type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="8">
          <el-form-item label="实收金额"
                        prop="user_nicename">
            <el-input v-model="ruleForm.user_nicename"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8">
          <el-form-item label="课程有效期"
                        prop="telphone">
            <el-select v-model="ruleForm.leaning"
                       placeholder="请选择有效期"
                       @change="changeLeaning">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注信息"
                    class="textarea_date"
                    prop="user_nicename">
        <el-input type="textarea"
                  placeholder="请输入内容"
                  v-model="ruleForm.user_nicename"></el-input>
      </el-form-item>
      <el-form-item class="entybtn">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: []
    }
  },
  methods: {
    changeLeaning() {}
  }
}
</script>

<style lang='scss' scoped>
.main {
  padding: 20px;
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
.textarea_date {
  display: flex;
  justify-content: flex-start;
  /deep/.el-textarea__inner {
    max-width: 850px;
    min-width: 400px;
  }
}
.entybtn {
  display: flex;
  justify-content: flex-start;
}
</style>