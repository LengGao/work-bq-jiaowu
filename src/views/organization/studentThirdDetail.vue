<template>
  <section class="main">
    <!--上半部分-->
    <breadcrumb class="breadcrumb"></breadcrumb>
    <el-form label-width="70px" class="demo-ruleForm" :show-message="true" label-position="left">
      <el-row style="min-width:1100px">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row class="detailLine">
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="学员编号" prop="uid">
                  <el-input v-model="ruleForm.uid" disabled></el-input>
                </el-form-item>
                <!-- <span>学员编号</span>
                <el-input disabled v-model="ruleForm.uid"></el-input> -->
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="注册时间" prop="create_time">
                  <el-input v-model="ruleForm.create_time" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="老师头像" prop="user_img">
                  <img src="@/assets/images/headimg.png" alt="" />
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="微信昵称" prop="user_nicename">
                  <el-input v-model="ruleForm.user_nicename" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="学生姓名" prop="realname">
                  <el-input v-model="ruleForm.realname" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="ruleForm.mobile" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="身份证号码" prop="identity_card">
                  <el-input v-model="ruleForm.identity_card" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="性别" prop="name">
                  <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="成交状态" prop="type">
                  <el-input v-model="ruleForm.type" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属机构" prop="organization_id">
                  <el-input v-model="ruleForm.organization_id" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属老师" prop="name">
                  <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="实收金额" prop="pay_amount">
                  <el-input v-model="ruleForm.pay_amount" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="课程名称" prop="course_id">
                  <el-select filterable v-model="ruleForm.course_id" placeholder="请选择" @change="selectCourse">
                    <el-option v-for="item in Courname.list" :key="item.course_id" :label="item.course_name" :value="item.course_id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属班级" prop="class_type">
                  <el-input v-model="ruleForm.class_type" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="有效期" prop="update_time">
                  <el-input v-model="ruleForm.update_time" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8" v-for="item in course_data" :key="item.field_id">
                <el-form-item :label="item.field_text" prop="">
                  <el-input v-model="course_Arr[item.field_id]" v-if="item.field_type == 'text'"></el-input>
                  <el-select filterable :multiple="item.field_type == 'multi_select' ? true : false" v-if="
                      item.field_type == 'select' ||
                        item.field_type == 'multi_select'
                    " v-model="course_Arr[item.field_id]" placeholder="请选择">
                    <el-option v-for="(conte, index) in item.field_content" :key="index" :label="conte" :value="conte">
                    </el-option>
                  </el-select>
                  <el-date-picker v-if="item.field_type == 'date'" v-model="course_Arr[item.field_id]" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>

        <el-col :lg="3" :sm="3" :xs="3" :md="3">
          <el-button type="primary" @click="toStudyReport">生成学习报告</el-button>
          <el-button type="primary" style="margin-top:10px">导出数据</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--下半部分-->
    <div class="studyDetail">
      <!--tag-->
      <div class="studentTag">
        <el-tabs v-model="currentView">
          <el-tab-pane label="学习报告" name="report"></el-tab-pane>
          <el-tab-pane label="学习进度" name="proGress"></el-tab-pane>
          <component :is="currentView" :uid="uid" :course_id="course_id" style="width:100%,height:700px" keep-alive></component>
          <!-- <el-tab-pane :label="item.name"
                       v-for="(item, index) in studytags"
                       :key="index"
                       :name="item.index">{{item.name}}</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'studentDetail',
  data() {
    return {
      uid: 4431,
      course_id: '1',
      currentView: 'report', //当前组件
      ruleForm: {},
      course_data: [], //自定义标签
      course_Arr: [],
      Courname: [],
    }
  },
  mounted() {
    this.$api.getStudentDetail(this, 'myclient')
    // this.$api.relateCourse(this, 'Courname', 'detail')
  },
  components: {
    report: (resolve) => {
      require(['@/components/Studystep/report.vue'], resolve)
    },
    //学习进度
    proGress: (resolve) => {
      require(['@/components/Studystep/proGress.vue'], resolve)
    },
  },
  methods: {
    selectCourse() {
      this.course_id = this.ruleForm.course_id
    },
    handleClick() {
      console.log(11)
    },
    toStudyReport() {
      console.log(this.course_Arr)
      // this.$router.push({
      //   name: 'studyReport',
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.flexstyle {
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
}
.el-input {
  width: 238px;
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
.el-select {
  width: 238px;
}
.detailLine {
  padding-bottom: 20px;
}
.studyDetail {
  border-top: 30px solid #f0f2f5;
  padding: 20px;
}
</style>
