<template>
  <div class="chapter-menu">
    <div class="chapter-menu-header">
      <h4>{{ chapterType == 1 ? "章节名称" : "试卷名称" }}</h4>
      <el-button
        type="primary"
        plain
        circle
        size="mini"
        icon="el-icon-plus"
        @click="openAdd"
      ></el-button>
    </div>
    <ul class="chapter-menu-list" v-loading="chapterLoading">
      <li
        :class="{
          'list-item': true,
          'list-item--active': item.id === chapterActiveId,
        }"
        v-for="item in chapterList"
        :key="item.id"
        @click="handleChapterChange(item.id)"
        :title="item.chapter_name"
      >
        <span class="list-item-title"
          >{{ item.chapter_name }}（{{ item.topic_total }}）</span
        >
        <div class="list-item-actions" v-if="!item.disabled">
          <i class="el-icon-edit" @click="openEdit(item.id)"></i>
          <i class="el-icon-delete" @click="deleteConfirm(item.id)"></i>
        </div>
      </li>
    </ul>
    <editChapterDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :chapterType="chapterType"
      @on-success="getTopicChapterList"
    />
  </div>
</template>

<script>
import { getTopicChapterList, deletedTopicChapter } from "@/api/sou";
import editChapterDialog from "./editChapterDialog";
export default {
  name: "ChapterMenu",
  components: {
    editChapterDialog,
  },
  props: {
    chapterType: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      currentId: "",
      dialogTitle: "添加章节",
      dialogVisible: false,
      chapterList: [],
      chapterLoading: false,
      chapterActiveId: 0,
    };
  },
  watch: {
    chapterType() {
      this.getTopicChapterList();
    },
  },
  created() {
    this.getTopicChapterList();
  },
  methods: {
    openEdit(id) {
      this.dialogTitle = `编辑${this.chapterType == 1 ? "章节" : "试卷"}`;
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = `添加${this.chapterType == 1 ? "章节" : "试卷"}`;
      this.dialogVisible = true;
    },
    handleChapterChange(id) {
      this.chapterActiveId = id;
      this.$emit("on-change", id);
    },
    // 删除章节
    deleteConfirm(id) {
      this.$confirm(
        `确定要删除此${this.chapterType == 1 ? "章节" : "试卷"}吗?`,
        {
          type: "warning",
        }
      )
        .then(() => {
          this.deletedTopicChapter(id);
        })
        .catch(() => {});
    },
    async deletedTopicChapter(id) {
      const data = { id };
      const res = await deletedTopicChapter(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getTopicChapterList();
      }
    },
    // 获取章节列表
    async getTopicChapterList() {
      const data = {
        question_bank_id: this.$route.query.id,
        chapter_type: this.chapterType,
      };
      this.chapterLoading = true;
      const res = await getTopicChapterList(data).catch(() => {
        this.chapterLoading = false;
      });
      this.chapterLoading = false;
      if (res.code === 0) {
        const allItem = {
          chapter_name: "全部",
          topic_total: res.data?.total_topic || 0,
          id: 0,
          disabled: true,
        };
        this.chapterList = res.data.list;
        this.chapterList.unshift(allItem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-menu {
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #e4e7ed;
  }
  &-list {
    font-size: 14px;
    height: calc(100% - 53px);
    overflow-y: auto;
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      height: 44px;
      border-bottom: 1px solid #e4e7ed;
      cursor: pointer;
      &-title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &-actions {
        display: none;
        flex-shrink: 0;
        i {
          font-size: 18px;
          padding: 0 10px;
        }
      }
      &:hover {
        background-color: #ecf5ff;
        color: #199fff;
        .list-item-actions {
          display: block;
        }
      }
      &--active {
        color: #fff;
        background-color: #199fff;
        .list-item-actions {
          display: block;
        }
      }
      &--active:hover {
        color: #fff;
        background-color: #199fff;
        .list-item-actions {
          display: block;
        }
      }
    }
  }
}
</style>