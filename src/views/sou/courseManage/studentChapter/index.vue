<template>
  <div class="student-chapter">
    <div class="course-info">
      <div class="course-info-item">
        <span class="name">学生姓名</span>
        <span class="value">{{ studentData.user_realname }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">手机号码</span>
        <span class="value">{{ studentData.telphone }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">课程名称</span>
        <span class="value">{{ studentData.course_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">课程章节</span>
        <span class="value">{{ studentData.chapter_count }}个</span>
      </div>
      <div class="course-info-item">
        <span class="name">完成章节数</span>
        <span class="value">{{ studentData.finish_chapter_count }}个</span>
      </div>
      <div class="course-info-item">
        <span class="name">累计学习时长</span>
        <span class="value">{{ studentData.user_total_duration }}</span>
      </div>
    </div>
    <!--表格-->
    <div class="userTable">
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
        row-key="treeId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTableChildren"
      >
        <el-table-column
          prop="name"
          label="章节名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="viedeoDuration"
          label="章节时长"
          min-width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="first_time"
          label="首次学习时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="last_time"
          label="最后学习时间"
          align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="learn_duration"
          label="学习时长"
          align="center"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="学习进度"
          align="center"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.progress }}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="images"
          label="抓拍图片"
          min-width="160"
          align="center"
        >
          <template slot-scope="{ row }">
            <div class="images" v-if="row.images.length">
              <img
                v-for="(src, index) in row.images"
                :key="index"
                @click="handlePreview(src)"
                :src="src"
                alt=""
              />
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  courseChapterVideoStatisticsList,
  courseLessonVideoStatisticsList,
} from "@/api/sou";
export default {
  name: "studentChapter",
  data() {
    return {
      listData: [],
      listLoading: false,
      studentData: {},
      treeId: 0,
    };
  },

  created() {
    this.courseChapterVideoStatisticsList();
  },
  methods: {
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    setId() {
      return (this.treeId += 1);
    },
    // table懒加载子节点
    async loadTableChildren(tree, treeNode, resolve) {
      const children = await this.getChildrenData(tree.id);
      resolve(children);
    },
    async getChildrenData(chapter_id) {
      const data = {
        uid: this.$route.query.uid,
        chapter_id,
      };
      const res = await courseLessonVideoStatisticsList(data);
      console.log(res);
      return res.data.list.map((item) => ({
        ...item,
        parentId: chapter_id,
        name: item.title,
        viedeoDuration: item.duration,
        treeId: this.setId(),
      }));
    },
    async courseChapterVideoStatisticsList() {
      const data = {
        uid: this.$route.query.uid,
        course_id: this.$route.query.course_id,
      };
      this.listLoading = true;
      const res = await courseChapterVideoStatisticsList(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        hasChildren: item.lesson_count > 0,
        name: item.chapter_name,
        viedeoDuration: item.chapter_duration,
        learn_duration: item.duration,
        treeId: this.setId(),
        images: [],
      }));
      this.studentData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.student-chapter {
  padding: 20px;
}

.course-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &-item {
    margin-right: 30px;
    padding: 16px 0;
    .name {
      color: #909399;
      margin-right: 8px;
    }
    .value {
      color: #666;
    }
  }
}
.images {
  height: 40px;
  display: flex;
  img {
    margin-left: 10px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
