<template>
  <!-- 学习记录 -->
  <div class="learning-record">
    <div class="learning-record-container">
      <ul class="container-menu">
        <li
          v-for="(item, index) in allComponent"
          :key="index"
          class="menu-item"
          :class="{
            'menu-item': true,
            'menu-item--active': activeIndex === index,
          }"
          @click="hanldeMenuChange(index)"
        >
          {{ item.menuName }}
        </li>
      </ul>
      <div class="container-components">
        <component
          :is="getComponent"
          :uid="uid"
          :graduate="$attrs.datas.is_graduate"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LearningRecords",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      allComponent: [
        { menuName: "课程进度", component: "CourseProgress" },
        { menuName: "题库进度", component: "QuestionProgress" },
        { menuName: "直播统计", component: "LiveBroadcastStatistics" },
        { menuName: "回顾统计", component: "ReviewStatistics" },
        { menuName: "课表信息", component: "Timetable" },
        { menuName: "考勤统计", component: "AttendanceStatistics" },
        { menuName: "成绩统计", component: "AchievementStatistics" },
        { menuName: "教材资料", component: "TeachingMaterials" },
      ],
      activeIndex: 0,
    };
  },
  computed: {
    getComponent() {
      if (this.activeIndex !== undefined) {
        return () =>
          import(
            `./learningRecordComponents/${
              this.allComponent[this.activeIndex].component
            }.vue`
          );
      }
    },
  },
  methods: {
    hanldeMenuChange(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.learning-record-header {
  margin-bottom: 10px;
}

.learning-record-container {
  border: 1px solid #dcdfe6;
  min-height: 670px;
  display: flex;

  .container-menu {
    width: 120px;
    flex-shrink: 0;
    border-right: 1px solid #dcdfe6;
    background-color: #ebeef5;

    .menu-item {
      font-size: 14px;
      padding: 8px 12px;
      text-align: center;
      color: #606266;
      border-bottom: 1px solid #dcdfe6;
      cursor: pointer;
      &--active {
        color: #199fff;
        background-color: #fff;
        position: relative;

        &::before {
          display: block;
          content: "";
          width: 1px;
          height: 100%;
          background-color: #fff;
          position: absolute;
          right: -1px;
          top: 0;
        }
      }
    }
  }

  .container-components {
    flex: 1;
    padding: 16px 24px;
  }
}
</style>