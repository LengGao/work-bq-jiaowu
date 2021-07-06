<template>
  <!-- 学习记录 -->
  <div class="learning-record">
    <div class="learning-record-header">
      <el-select v-model="typeChecked" @change="handleTypeChange">
        <el-option value="1" label="全部项目"></el-option>
        <el-option value="2" label="系统集成项目"></el-option>
        <el-option value="3" label="中级经济师项目"></el-option>
        <el-option value="4" label="低压电工项目"></el-option>
      </el-select>
    </div>
    <div class="learning-record-container">
      <ul class="container-menu">
        <li v-for="(item, index) in typeMap[typeChecked]" :key="index" class="menu-item" :class="{
            'menu-item': true,
            'menu-item__active': activeIndex === index,
          }" @click="hanldeMenuChange(index)">
          {{ item.menuName }}
        </li>
      </ul>
      <div class="container-components">
        <component :is="getComponent" :uid="uid" :graduate="$attrs.datas.is_graduate"/>
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
        typeChecked: "1",
        typeMap: {
          1: [
            { menuName: "学习进度", component: "TitleProgress" },
            { menuName: "课表信息", component: "Timetable" },
            { menuName: "考勤统计", component: "AttendanceStatistics" },
            { menuName: "成绩统计", component: "AchievementStatistics" },
            { menuName: "教材资料", component: "TeachingMaterials" },
          ],
          2: [
            { menuName: "学习进度", component: "TitleProgress" },
            { menuName: "课表信息", component: "Timetable" },
            { menuName: "考勤统计", component: "AttendanceStatistics" },
            { menuName: "成绩统计", component: "AchievementStatistics" },
            { menuName: "教材资料", component: "TeachingMaterials" },
          ],
          3: [
            { menuName: "学习进度", component: "TitleProgress" },
            { menuName: "课表信息", component: "Timetable" },
            { menuName: "考勤统计", component: "AttendanceStatistics" },
            { menuName: "成绩统计", component: "AchievementStatistics" },
            { menuName: "教材资料", component: "TeachingMaterials" },
          ],
          4: [
            { menuName: "学习进度", component: "TitleProgress" },
            { menuName: "课表信息", component: "Timetable" },
            { menuName: "考勤统计", component: "AttendanceStatistics" },
            { menuName: "成绩统计", component: "AchievementStatistics" },
            { menuName: "教材资料", component: "TeachingMaterials" },
          ],
        },
        activeIndex: 0,
      };
    },
    computed: {
      getComponent() {
        if (this.activeIndex !== undefined && this.typeChecked) {
          return () =>
            import(
              `./learningRecordComponents/${this.typeMap[this.typeChecked][this.activeIndex].component
              }.vue`
            );
        }
      },
    },
    methods: {
      handleTypeChange() {
        this.activeIndex = 0;
      },
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

        &.menu-item__active {
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
      padding: 16px;
    }
  }
</style>