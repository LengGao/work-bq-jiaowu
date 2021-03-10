<template>
  <section class="mainwrap">
    <el-row style="mix-width:900px;max-width:1200px">
      <el-col :lg="8" :xs="8" :sm="8" :xl="8">
        <div class="classContent">
          <p>班级名称<span>系统集成面授1班</span></p>
          <p style="margin-top:20px">班级名称<span>系统集成面授1班</span></p>
        </div>
      </el-col>
      <el-col :lg="8" :xs="8" :sm="8" :xl="8">
        <div class="classContent">
          <p>班级名称<span>系统集成面授1班</span></p>
          <p style="margin-top:20px">班级名称<span>系统集成面授1班</span></p>
        </div>
      </el-col>
      <el-col :lg="8" :xs="8" :sm="8" :xl="8">
        <div class="classContent">
          <p style="display:flex;aligin-item:flex-start">
            <span style="margin-right:35px;color:#999">图片封面</span
            ><img src="" alt="" style="width:240px;height:136px" />
          </p>
        </div>
      </el-col>
    </el-row>
    <div class="navigation-box">
      <ul class="navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          @click="statusSwitch(item)"
          :class="{ tabg: item.id == isTagactive }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <section>
      <!--班级学生-->
      <div class="classStudent" v-if="isTagactive == 1">
        <!--列表-->
        <search2
          :contentShow="true"
          api="getHomeclassifiList"
          inputText="分类名称"
          @getTable="getTableList"
        ></search2>
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="schoolData"
            tooltip-effect="light"
            stripe
            style="width: 100%;"
            class="min_table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="uid"
              label="学员编号"
              show-overflow-tooltip
              min-width="90"
            ></el-table-column>
            <el-table-column
              prop="realname"
              label="学生姓名"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="mobile"
              label="手机号码"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="所属机构"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="category_name"
              label="所属校区"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="course_name"
              label="加入时间"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!--班级学生-->
      <div v-if="isTagactive == 2">
        <el-calendar v-model="value">
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
             <div style="color:red">水电费水电费</div>
              <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}} -->
            </p>
          </template>
        </el-calendar>
      </div>
      <!--上课考勤-->
      <div class="classStudent" v-if="isTagactive == 3">
        <!--列表-->
        <search2
          :contentShow="true"
          api="getHomeclassifiList"
          inputText="分类名称"
          @getTable="getTableList"
        ></search2>
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="schoolData"
            tooltip-effect="light"
            stripe
            style="width: 100%;"
            class="min_table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="uid"
              label="序号"
              show-overflow-tooltip
              min-width="90"
            ></el-table-column>
            <el-table-column
              prop="realname"
              label="课次名称"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="mobile"
              label="课程类型"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="上课时间"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="category_name"
              label="上课老师"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="course_name"
              label="学生数"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
              <el-table-column
              prop="course_name"
              label="出勤"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
              <el-table-column
              prop="course_name"
              label="请假"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>

              <el-table-column
              prop="course_name"
              label="旷课"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
             <el-table-column
              prop="course_name"
              label="出勤率"
              min-width="150"
              show-overflow-tooltip
            ></el-table-column>
             <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="topayment(scope.row)"
                  >点名</el-button
                >
                <el-button type="text" @click="toExamStatis(scope.row)"
                  >考勤详情</el-button
                >

             
              </div>
            </template>
          </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isTagactive: 1,
      schoolData: [{
          course_name:'水电费第三方'
      }],
      tabFun: [
        {
          id: 1,
          name: '班级学生',
        },
        {
          id: 2,
          name: '班级课表',
        },
        {
          id: 3,
          name: '上课考勤',
        },
      ],
    }
  },
  methods: {
      toExamStatis(){
        this.$router.push(
            {
                path:'/eda/examStatis'
            }
        )
      },
    statusSwitch(ab) {
      this.isTagactive = ab.id
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
.classContent {
  p {
    font-family: 'Microsoft YaHei UI', sans-serif;
    color: #999999;
    font-size: 16px;
    span {
      padding-left: 30px;
      color: #666666;
    }
  }
}
.navigation {
  width: 267px;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;

  li {
    height: 28px;
    font-size: 14px;

    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.navigation-box {
  padding-left: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.tabg {
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.userTable {
  margin-top: 20px;
}
</style>
