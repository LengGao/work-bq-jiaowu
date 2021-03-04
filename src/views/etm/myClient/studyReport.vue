<template>
  <section class="mainwrap">
    <div class="studyReport">
      <div class="reportNo">
        {{ organization_id + '-' + course_id + '' + uid }}
      </div>
      <div class="reportTime">{{ info.datetime }}</div>
      <div class="userInfo">
        <p>{{ info.nickname }}</p>
        <p>{{ info.mobile }}</p>
        <p>{{ info.identity_card }}</p>
      </div>
      <div class="couseInfo">
        <p>{{ course_id }}</p>
        <p>{{ info.category_name }}</p>
        <p>{{ info.course_name }}</p>
      </div>
      <div class="learningDetails">
        <div>
          <span>{{ practice.total_problem }}</span>
          <span>{{ practice.do_total_problem }}</span>
          <span>{{ practice.progress }}</span>
          <span>{{ practice.detailed }}</span>
        </div>
        <div>
          <span>{{ real_topic.total_chapter }}</span>
          <span>{{ real_topic.do_chapter }}</span>
          <span>{{ real_topic.progress }}</span>
          <span>{{ real_topic.detailed }}</span>
        </div>
        <div>
          <span>{{ self_determination.total_chapter }}</span>
          <span>{{ self_determination.do_chapter }}</span>
          <span>{{ self_determination.progress }}</span>
          <span>{{ self_determination.detailed }}</span>
        </div>
        <div>
          <span>{{ video.total_num }}</span>
          <span>{{ video.watch_num }}</span>
          <span>{{ video.progress }}</span>
          <span>{{ video.detailed }}</span>
        </div>
        <div>
          <span>{{ live.total_num }}</span>
          <span>{{ live.watch_num }}</span>
          <span>{{ live.progress }}</span>
          <span>{{ live.detailed }}</span>
        </div>
      </div>
      <div class="seal">
        <img src="../../../assets/images/seal.png" alt="" />
      </div>
    </div>
    <!-- <breadcrumb class="breadcrumb"></breadcrumb>
    <div>
      <img :src="logo" alt="" />
    </div>
    -->
    <el-button
      type="primary"
      style="width:120px;margin:30px 0 0 490px"
      @click="getReport"
      >下载图片</el-button
    >
    <!--导出提示框-->
    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>学习报告导出成功，请点击下载按钮下载Excel表格</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportData">确 定</el-button>
      </span>
    </el-dialog> -->
  </section>
</template>

<script>
import logo from '@/assets/images/studyReport.jpg'
export default {
  name: 'studyReport',
  data() {
    return {
      logo,
      state: 0,
      course_id: 0,
      institution_id: 0,
      reportData: {},
      list: {},
      info: {},
      report_id: '',
      live: {},
      practice: {},
      real_topic: {},
      self_determination: {},
      video: {},
      dialogVisible: false,
      course_id: '',
      organization_id: '',
      uid: '',
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    this.uid = this.$route.query.uid
    this.organization_id = this.$route.query.organization_id
    this.institution_id = this.$route.query.organization_id
    console.log(this.$route.query)
    this.$api.getReport(this, 'reportData')
  },
  mounted() {},
  methods: {
    getReport() {
      this.$api.getSynthesisImage(this, 'myclient')
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
.reportTime {
  position: absolute;
  top: 207px;
  left: 401px;
  width: 350px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: rgba(93, 93, 93, $alpha: 1);
  z-index: 100;
}
.reportNo {
  position: absolute;
  top: 115px;
  left: 223px;
  font-size: 26px;
  color: rgba(5, 55, 114, $alpha: 1);
  z-index: 100;
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
.studyReport {
  width: 1074px;
  height: 734px;
  background: url('../../../assets/images/certificate.png') no-repeat;
}
.userInfo {
  max-width: 314px;
  position: absolute;
  top: 299px;
  left: 314px;
  font-size: 16px;
  z-index: 100;
  p {
    padding-bottom: 14px;
  }
}
.couseInfo {
  max-width: 314px;
  position: absolute;
  top: 299px;
  left: 699px;
  font-size: 16px;
  z-index: 100;
  p {
    padding-bottom: 14px;
  }
}
.learningDetails {
  position: absolute;
  top: 491px;
  left: 328px;
  font-size: 16px;

  z-index: 100;
  div {
    display: flex;
    padding-bottom: 14px;
    span {
      display: block;
      width: 100px;
    }
    span:last-child {
      width: 300px;
    }
  }
}
.seal {
  position: absolute;
  top: 550px;
  left: 848px;
  width: 150px;
}
</style>
