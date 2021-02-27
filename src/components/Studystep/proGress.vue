<template>
  <div class="progresss">
    <div class="studentTag">
      <ul>
        <li v-for="item in tags"
            :class='{tabg:item.id==isTagactive}'
            @click="statusSwitch(item)"
            :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    <el-row>
      <el-col :lg="6"
              v-for="(item,index) in 4"
              :key="index">
        <div class="timeCard">
          <div>
            <h3>坚持学习天数</h3>
            <div class="time_num"><span>55</span>天</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--table部分-->
    <div class="userTable">
      <el-table ref="multipleTable"
                :data="schoolData"
                tooltip-effect="light"
                stripe
                style="width: 100%"
                class="min_table">

        <el-table-column prop="uid"
                         label="打卡时间"
                         show-overflow-tooltip
                         min-width="90"></el-table-column>
        <el-table-column prop="nickname"
                         label="题目总数"
                         min-width="110"
                         show-overflow-tooltip></el-table-column>

        <el-table-column prop="mobile"
                         label="正确题数"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="正确率"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName"
                         label="打卡用时"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName"
                         label="打卡排行"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTagactive: 1,
      schoolData: [
        { nickname: '聊', classNum: '1500333' },
        { nickname: '聊', classNum: '1500333' }
      ],
      tags: [
        {
          id: 1,
          name: '每日打卡',
          isFail: 0,
          status: -2
        },
        {
          id: 2,
          name: '章节练习',
          isFail: 0,
          status: 0
        },
        {
          id: 3,
          name: '历年真题',
          isFail: 0,
          status: 1
        },
        {
          id: 4,
          name: '模拟考试',
          isFail: 0,
          status: 2
        },
        {
          id: 5,
          name: '刷题挑战',
          isFail: 1,
          status: 1
        },
        {
          id: 6,
          name: '录音视频',
          isFail: 0,
          status: -1
        },
        {
          id: 7,
          name: '刷题挑战',
          isFail: 1,
          status: 1
        },
        {
          id: 8,
          name: '刷题挑战',
          isFail: 1,
          status: 1
        },
        {
          id: 9,
          name: '刷题挑战',
          isFail: 1,
          status: 1
        },
        {
          id: 10,
          name: '刷题挑战',
          isFail: 1,
          status: 1
        }
      ]
    }
  },
  methods: {
    statusSwitch(all) {
      //单击tag是切换背景颜色
      this.isTagactive = all.id
    }
  }
}
</script>

<style lang="scss" scoped>
.tabg {
  background: #2798ee;
  color: #fff;
}
.studentTag {
  padding: 20px 0;
  ul {
    max-width: 790px;
    display: flex;
    justify-content: space-between;

    li {
      width: 68px;
      height: 28px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      // li:hover {
      //   display: block;
      //   background: #2798ee;
      // }
    }
    li:last-child {
      margin-right: 0px !important;
    }
  }
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;
  .time_num {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      font-size: 35px;
      font-weight: 600;
    }
  }
}
.userTable {
  padding-top: 20px;
}
</style>