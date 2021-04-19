<template>
  <div class="live-detail">
    <div class="detail-header">
      <div class="label">
        <span class="label-name">所属分类</span>
        <span class="label-content">职称考证</span>
      </div>
      <div class="label">
        <span class="label-name">直播名称</span>
        <span class="label-content">系统集成第一章 基础入门</span>
      </div>
      <div class="label">
        <span class="label-name">直播场次</span>
        <span class="label-content">2020-06-04 16:30场次</span>
      </div>
      <div class="label">
        <span class="label-name">推流详情</span>
        <span class="label-content">
          <el-button type="text" @click="openPushFlowDialog"
            >查看详情</el-button
          >
        </span>
      </div>
      <div class="label">
        <span class="label-name">任课老师 </span>
        <span class="label-content">林老师</span>
      </div>
      <div class="label label-large">
        <span class="label-name">关联班级 </span>
        <span class="label-content">
          2020春-系统集成VIP1班、2020春-系统集成VIP学霸1班</span
        >
      </div>
      <div class="label">
        <span class="label-name">上课时间 </span>
        <span class="label-content"> 2021-04-16 17:30</span>
      </div>
      <div class="label">
        <span class="label-name">下课时间 </span>
        <span class="label-content"> 2021-04-16 17:30</span>
      </div>
      <div class="label">
        <span class="label-name">上课时长 </span>
        <span class="label-content"> 60分钟</span>
      </div>
      <div class="label">
        <span class="label-name">录制视频 </span>
        <span class="label-content">
          <el-button type="text" @click="openVideoRecordDialog"
            >查看详情</el-button
          >
        </span>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="直播概况" name="LiveEchart"></el-tab-pane>
      <el-tab-pane label="直播统计" name="LiveStatistics"></el-tab-pane>
      <el-tab-pane label="回播统计" name="PlaybackStatistics"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
    <PushFlowDialog v-model="pushFlowVisible" :id="currentId" />
    <VideoRecordDialog v-model="videoRecordVisible" :id="currentId" />
  </div>
</template>

<script>
import PushFlowDialog from "./components/PushFlowDialog";
import VideoRecordDialog from "./components/VideoRecordDialog";
import { getClassroomDetail } from "@/api/eda";
export default {
  name: "ClassDetail",
  components: {
    PushFlowDialog,
    VideoRecordDialog,
  },
  data() {
    return {
      activeName: "LiveEchart",
      detailData: {},
      pushFlowVisible: false,
      videoRecordVisible: false,
      currentId: "",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {
    this.getClassroomDetail();
  },
  methods: {
    openVideoRecordDialog(row) {
      this.currentId = row.id;
      this.videoRecordVisible = true;
    },
    openPushFlowDialog(row) {
      this.currentId = row.id;
      this.pushFlowVisible = true;
    },
    async getClassroomDetail() {
      const data = {
        classroom_id: this.$route.query?.id || "",
      };
      const res = await getClassroomDetail(data);
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.live-detail {
  padding: 20px;
  .detail-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    .label {
      width: calc(100% / 4);
      margin-bottom: 16px;
      &-name {
        color: #909399;
        margin-right: 20px;
      }
      &-content {
        color: #606266;
      }
    }
    .label-large {
      width: 75%;
    }
  }
}
</style>