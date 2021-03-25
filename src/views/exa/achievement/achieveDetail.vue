<template>
  <section class="mainwrap">
    <el-table
      :data="tableData"
      tooltip-effect="light"
      stripe
      style="width: 100%"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.title"
        width="150"
        v-for="item in title"
        :key="item.prop"
      >
        <el-table-column
          width="120"
          v-show="item.children && item.children.length"
          v-for="i in item.children"
          :key="i.prop"
          :prop="i.prop"
          :label="i.title"
        >
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column> -->
      <el-table-column label="操作" fixed="right" min-width="200">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button type="text" @click="openEdit(row.book_id)"
              >编辑</el-button
            >
            <el-button type="text" @click="link(row.book_id)"
              >库存详情</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: 'achieveDetail',
  data() {
    return {
      tableData: [],
      title: [
        { prop: 'id', title: '学生姓名' },
        { prop: 'tel', title: '手机号码' },
        { prop: 'score1', title: '系统集成基础知识' },
        {
          prop: '',
          title: '系统集成应用技术',
          children: [
            { prop: '1_1', title: '选择题' },
            { prop: 'score3', title: '判断题' },
            { prop: 'score4', title: '理论题' },
            { prop: 'score5', title: '总分' },
          ],
        },
        // { prop: 'tel', title: '手机号码' },
        // { prop: 'score1', title: '系统集成基础知识' },
        // { prop: 'tel', title: '手机号码' },
        // { prop: 'score1', title: '系统集成基础知识' },
      ],
      punchTitle: [
        { prop: 'date_time', title: '打卡时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'accuracy', title: '正确率' },
        { prop: 'use_time', title: '打卡用时' },
        { prop: 'ranking', title: '打卡排行' },
      ],
    }
  },
  created() {
    this.headTitle = this.punchTitle
  },
}
</script>

<style></style>
