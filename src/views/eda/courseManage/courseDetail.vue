<template>
  <section>
    <div class="stuDetailTop">
      <!--上半部分-->
      <el-form
        label-width="70px"
        class="demo-ruleForm"
        :show-message="true"
        label-position="left"
      >
        <el-row style="min-width:1100px">
          <el-col :lg="12" :sm="12" :xs="12" :md="21">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row class="detailLine">
                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程编号" prop="uid">
                    <div class="ruleWord">{{ ruleForm.uid }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程班型" prop="create_time">
                    <div class="ruleWord">{{ ruleForm.create_time }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程类型" prop="user_nicename">
                    <div class="ruleWord">{{ ruleForm.user_nicename }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程状态" prop="realname">
                    <div class="ruleWord">{{ ruleForm.realname }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程名称" prop="mobile">
                    <div class="ruleWord">{{ ruleForm.mobile }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程价格" prop="identity_card">
                    <div class="ruleWord">{{ ruleForm.identity_card }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="任课老师" prop="name">
                    <div class="ruleWord">{{ ruleForm.staff_name }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="购买数量" prop="organization_name">
                    <div class="ruleWord">{{ ruleForm.organization_name }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程课时" prop="pay_amount">
                    <div class="ruleWord">{{ ruleForm.pay_amount }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="12" :md="12" :sm="12" :xs="12">
                  <el-form-item label="课程评分" prop="join_class">
                    <div class="ruleWord">{{ ruleForm.join_class }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>

          <el-col :lg="6" :sm="6" :xs="6" :md="6">
            <el-form-item label="老师头像" prop="user_img">
              <img
                :src="ruleForm.user_img"
                alt=""
                style="width:64px;height:64px;border-radius:50%"
              />
            </el-form-item>

            <el-form-item label="有效期限" prop="update_time">
              <div class=" imageBox ">
                <i class=" iconjia el-icon-plus"></i>
                <img
                  style="width:100%;height:100%; border-radius: 3px"
                  alt=""
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--下半部分-->
    <div class="studyDetail">
      <!--tag-->
      <div class="studentTag">
        <el-tabs v-model="currentView">
          <el-tab-pane label="学习进度" name="proGress"></el-tab-pane>
          <el-tab-pane label="课程资料" name="report"></el-tab-pane>
          <el-tab-pane label="学习笔记" name="proGress"></el-tab-pane>
          <el-tab-pane label="学生评价" name="order"></el-tab-pane>

          <component
            :is="currentView"
            :uid="uid"
            :course_id="course_id"
            style="width:100%,height:700px"
            keep-alive
          ></component>
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
  name: 'courseDetail',
  data() {
    return {
      course_id: 18,
      ruleForm: {},

      uid: 39766,
      currentView: 'proGress', //当前组件
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    this.$api.getCoursesDetail(this, this.course_id)
  },
  mounted() {
    this.currentView = 'proGress'
  },
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    //跟进记录
    // record: (resolve) => {
    //   require(['@/components/Coursestep/record.vue'], resolve)
    // },
    // //信息报告
    // report: (resolve) => {
    //   require(['@/components/Coursestep/report.vue'], resolve)
    // },
    //学习进度
    proGress: (resolve) => {
      require(['@/components/Coursestep/proGress.vue'], resolve)
    },
    // //订单记录
    // order: (resolve) => {
    //   require(['@/components/Coursestep/order.vue'], resolve)
    // },
    // //学习轨迹
    // trajectory: (resolve) => {
    //   require(['@/components/Coursestep/trajectory.vue'], resolve)
    // },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item__label {
  color: #999;
}
.imageBox {
  width: 240px;
  height: 135px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 240px;
  height: 135px;
  line-height: 135px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
.ruleWord {
  color: #666;
  font-size: 16px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.stuDetailTop {
  padding: 40px 40px 0 40px;
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
  color: #000;
}
.studyDetail {
  border-top: 30px solid #f0f2f5;
  padding: 40px;
}
/deep/.timeCard {
  color: #666666;
}
</style>
