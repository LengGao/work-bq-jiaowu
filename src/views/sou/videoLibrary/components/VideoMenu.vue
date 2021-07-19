<template>
  <div class="videoGroup-menu">
    <div class="videoGroup-menu-header">
      <h4>视频分组</h4>
      <el-button
        type="primary"
        plain
        circle
        size="mini"
        icon="el-icon-plus"
        @click="openAdd"
      ></el-button>
    </div>
    <ul class="videoGroup-menu-list" v-loading="videoGroupLoading">
      <li
        :class="{
          'list-item': true,
          'list-item--active': item.id === videoGroupActiveId,
        }"
        v-for="item in videoGroupList"
        :key="item.id"
        @click="handlevideoGroupChange(item.id)"
        :title="item.group_name"
      >
        <span class="list-item-title"
          >{{ item.group_name }}（{{ item.video_count }}）</span
        >
        <div class="list-item-actions" v-if="item.id > 0">
          <i class="el-icon-edit" @click.stop="openEdit(item)"></i>
          <i class="el-icon-delete" @click.stop="deleteConfirm(item.id)"></i>
        </div>
      </li>
    </ul>
    <EditvideoGroupDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :editData="editData"
      @on-success="getVideoGroupList"
    />
  </div>
</template>

<script>
import { getVideoGroupList, deleteGroup } from "@/api/sou";
import EditvideoGroupDialog from "./editvideoGroupDialog";
export default {
  name: "videoGroupMenu",
  components: {
    EditvideoGroupDialog,
  },
  data() {
    return {
      editData: {},
      dialogTitle: "添加视频分组",
      dialogVisible: false,
      videoGroupList: [],
      videoGroupLoading: false,
      videoGroupActiveId: -1,
    };
  },
  watch: {
    videoGroupType() {
      this.getVideoGroupList();
    },
  },
  created() {
    this.getVideoGroupList();
  },
  methods: {
    openEdit(row) {
      this.dialogTitle = "修改视频分组";
      this.editData = { ...row };
      this.dialogVisible = true;
    },
    openAdd() {
      this.editData = {};
      this.dialogTitle = "添加视频分组";
      this.dialogVisible = true;
    },
    handlevideoGroupChange(id) {
      this.videoGroupActiveId = id;
      this.$emit("on-change", id);
    },
    // 删除分组
    deleteConfirm(id) {
      this.$confirm("确定要删除此分组吗?", { type: "warning" })
        .then(() => {
          this.deleteGroup(id);
        })
        .catch(() => {});
    },
    async deleteGroup(id) {
      const data = { id };
      const res = await deleteGroup(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getVideoGroupList();
      }
    },
    // 获取分组列表
    async getVideoGroupList() {
      this.videoGroupLoading = true;
      const res = await getVideoGroupList().catch(() => {
        this.videoGroupLoading = false;
      });
      this.videoGroupLoading = false;
      if (res.code === 0) {
        this.videoGroupList = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.videoGroup-menu {
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