<template>
  <section class="main">
    <!--表单部分-->
    <el-form
      label-width="90px"
      class="demo-ruleForm"
      :show-message="true"
      label-position="left"
    >
      <el-row>
        <el-col :sm="16" :md="16" class="colleft">
          <!--左边部分-->
          <el-row>
            <el-col :sm="12">
              <el-form-item label="学生编号" prop="uid">
                <el-input v-model="ruleForm.uid" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="注册时间" prop="regtime">
                <el-input v-model="ruleForm.regtime" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="学员姓名" prop="studentName">
                <el-input v-model="ruleForm.studentName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="ruleForm.mobile" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="身份证号码" prop="idCard">
                <el-input v-model="ruleForm.idCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="学员性别" prop="studentSex">
                <el-radio-group v-model="ruleForm.studentSex">
                  <el-radio :label="3">男</el-radio>
                  <el-radio :label="6">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="渠道来源" prop="channelSource">
                <el-select
                  v-model="ruleForm.channelSource"
                  placeholder="请选择渠道来源"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="课程班型" prop="classType">
                <el-select
                  v-model="ruleForm.classType"
                  placeholder="请选择课程班型"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="课程类型" prop="courseType">
                <el-select
                  v-model="ruleForm.courseType"
                  placeholder="请选择课程类型"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="课程名称" prop="courseName">
                <el-select
                  v-model="ruleForm.courseName"
                  placeholder="请选择课程名称"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-form-item label="所属机构" prop="organization">
                <el-select
                  v-model="ruleForm.organization"
                  placeholder="请选择所属机构"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item label="所属老师" prop="teacher">
                <el-select
                  v-model="ruleForm.teacher"
                  placeholder="请选择所属老师"
                  @change="changeLeaning"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注信息" class="textarea_date" prop="remarks">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="ruleForm.remarks"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-col>

        <el-col :sm="8" :md="8">
          <el-form-item label="学员头像" class="visibility">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="entybtn">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'IntentionEntry',
  data() {
    return {
      ruleForm: {
        uid: '5483',
        regtime: '2020-05-31 18:07',
        mobile: '15007094305',
        studentName: '',
        studentSex: '',
        idCard: '',
        channelSource: '',
        classType: '',
        courseType: '',
        courseName: '',
        organization: '',
        teacher: '',
        remarks: '',
      },
      radio: '',
      imageUrl: '',
    }
  },
  methods: {
    changeLeaning() {},
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
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
.entybtn {
  display: flex;
  justify-content: flex-start;
  padding-left: 90px;
}
.el-textarea {
  max-width: 850px;
  min-width: 400px;
}
.colleft {
  .el-row {
    padding-bottom: 20px;
  }
}
</style>
