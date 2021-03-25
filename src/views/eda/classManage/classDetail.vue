<template>
  <div class="class-detail">
    <div class="detail-header">
      <div class="header-col">
        <p class="col-item">
          <span>班级名称</span>{{ detailData.classroom_name }}
        </p>
        <p class="col-item"><span>所属分类</span>{{ detailData.admin_id }}</p>
        <p class="col-item"><span>学生人数</span>{{ detailData.admin_id }}</p>
      </div>
      <div class="header-col">
        <p class="col-item"><span>班主任</span>{{ detailData.staff_name }}</p>
        <p class="col-item"><span>所属项目</span>{{ detailData.project_id }}</p>
        <p class="col-item"><span>排课总数</span>{{ detailData.admin_id }}</p>
      </div>
      <div class="header-col">
        <p class="col-item col-item-cover">
          <span>班级封面</span>
          <img
            v-if="detailData.class_icon"
            :src="detailData.class_icon"
            alt="班级封面"
          />
          <span v-else>--</span>
        </p>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="班级学生" name="ClassStudent"></el-tab-pane>
      <el-tab-pane label="班级课表" name="ClassTimetable"></el-tab-pane>
      <el-tab-pane
        label="考勤统计"
        name="ClassAttendanceStatistics"
      ></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>

<script>
import { getClassroomDetail } from "@/api/eda";
export default {
  name: "ClassDetail",
  data() {
    return {
      activeName: "ClassStudent",
      detailData: {},
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
.class-detail {
  padding: 16px;
  .detail-header {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    .col-item {
      margin-right: 40px;
      color: #606266;
      line-height: 50px;
      display: flex;
      &-cover {
        img {
          width: 200px;
        }
      }
      span {
        flex-shrink: 0;
        display: inline-block;
        width: 80px;
        text-align: right;
        color: #909399;
        margin-right: 10px;
      }
    }
  }
}
</style>