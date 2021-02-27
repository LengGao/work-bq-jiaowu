<template>
  <section>
    <!--上半部分-->
    <breadcrumb class="breadcrumb"></breadcrumb>
    <el-form label-width="70px"
             class="demo-ruleForm"
             :show-message="true"
             label-position="left">
      <el-row style="min-width:1100px">
        <el-col :lg="21"
                :sm="21"
                :xs="21"
                :md="21">
          <el-row class="detailLine">
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>

          </el-row>
          <el-row class="detailLine">
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>

          </el-row>
          <el-row class="detailLine">
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>

          </el-row>
          <el-row class="detailLine">
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>

          </el-row>
          <el-row class="detailLine">
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
            <el-col :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    class="flexstyle">
              <span>学员编号</span>
              <el-input disabled></el-input>
            </el-col>
          </el-row>
        </el-col>

        <el-col :lg="3"
                :sm="3"
                :xs="3"
                :md="3">
          <el-button type="primary"
                     @click="toStudyReport">生成学习报告</el-button>
          <el-button type="primary"
                     style="margin-top:10px">导出数据</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--下半部分-->
    <div class="studyDetail">
      <!--tag-->
      <div class="studentTag">
        <el-tabs v-model="currentView">
          <el-tab-pane label="跟进记录"
                       name="record"></el-tab-pane>
          <el-tab-pane label="学习报告"
                       name="report"></el-tab-pane>
          <el-tab-pane label="学习进度"
                       name="proGress"></el-tab-pane>
          <el-tab-pane label="订单记录"
                       name="order"></el-tab-pane>
          <el-tab-pane label="学习轨迹"
                       name="trajectory"></el-tab-pane>
          <div :is="currentView"
               style="width:100%,height:700px"
               keep-alive></div>
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
  data() {
    return {
      currentView: 'record' //当前组件
    }
  },
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    record: resolve => {
      require(['../../components/Studystep/record.vue'], resolve)
    },
    report: resolve => {
      require(['../../components/Studystep/report.vue'], resolve)
    },
    proGress: resolve => {
      require(['../../components/Studystep/proGress.vue'], resolve)
    },
    order: resolve => {
      require(['../../components/Studystep/order.vue'], resolve)
    },
    trajectory: resolve => {
      require(['../../components/Studystep/trajectory.vue'], resolve)
    }
  },
  methods: {
    handleClick() {
      console.log(11)
    },
    toStudyReport() {
      this.$router.push({
        name: 'studyReport'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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