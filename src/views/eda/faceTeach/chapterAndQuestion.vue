<template>
  <div class="chapter-and-question">
    <ul class="chapter-list" v-loading="chapterLoading">
      <li class="chapter-list-item title">章节试卷</li>
      <li
        class="chapter-list-item"
        :class="{ active: activeId === item.id }"
        @click="chapterChange(item.id)"
        v-for="item in chapterList"
        :key="item.id"
      >
        {{ item.chapter_name }}
      </li>
      <li class="no-data" v-if="!chapterList.length">暂无数据</li>
    </ul>
    <div class="question-list">
      <!--表格-->
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
        height="650"
      >
        <el-table-column
          label="题目ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="topic_description"
          label="题干内容"
          min-width="300"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="topic_type_name"
          label="题目类型"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { favoritesChapter, favoritesTopic } from "@/api/eda";
export default {
  name: "chapterAndQuestion",
  props: {
    type: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      chapterList: [],
      chapterLoading: false,
      activeId: "",
    };
  },
  watch: {
    type() {
      this.activeId = "";
      this.pageNum = 1;
      this.favoritesChapter();
    },
  },
  created() {
    this.favoritesChapter();
  },
  methods: {
    chapterChange(id) {
      this.activeId = id;
      this.favoritesTopic();
    },
    async favoritesTopic() {
      const data = {
        chapter_id: this.activeId,
        page: this.pageNum,
        uid: this.$route.query.uid,
        is_fail: this.type,
        question_bank_id: this.$route.query.question_bank_id,
      };
      this.listLoading = true;
      const res = await favoritesTopic(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    async favoritesChapter() {
      this.chapterLoading = true;
      const data = {
        uid: this.$route.query.uid,
        question_bank_id: this.$route.query.question_bank_id,
        is_fail: this.type,
      };
      const res = await favoritesChapter(data).catch();
      this.chapterLoading = false;
      if (res.code === 0) {
        this.chapterList = res.data;
        if (this.chapterList.length) {
          this.activeId = this.chapterList[0].id;
          this.favoritesTopic();
        }
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.favoritesTopic();
    },
  },
};
</script>
<style lang="less">
.chapter-and-question {
  padding: 20px 0;
  display: flex;
  .chapter-list {
    width: 300px;
    border: 1px solid #dcdfe6;
    height: 700px;
    color: #666;
    flex-shrink: 0;
    margin-right: 20px;
    overflow-y: auto;
    .no-data {
      margin: 200px auto;
      line-height: 60px;
      text-align: center;
      font-size: 14px;
      color: #909399;
    }
    &-item {
      padding: 12px 16px;
      border-bottom: 1px solid #dcdfe6;
      cursor: pointer;
      &.title {
        font-weight: bold;
        cursor: inherit;
        &:hover {
          color: #666;
          background: #fff;
        }
      }
      &:hover {
        color: #199fff;
        background: #199fff2d;
      }
      &.active {
        color: #fff;
        background: #199fff;
      }
    }
  }
  .question-list {
    flex: 1;
  }
}
</style>