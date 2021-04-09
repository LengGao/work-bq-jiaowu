<template>
  <!-- 学员历史 -->
  <div class="follow-up-record">
    <div class="record-list" v-loading="listLoading">
      <ul>
        <li v-for="item in listData" :key="item.id">
          <el-card class="box-card" shadow="never">
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">时间：</span>
                <span>{{ item.create_time || "--" }}</span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">内容：</span>
                <span>{{ item.desc }} </span>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
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
import { userArchivesRecord } from "@/api/eda";
export default {
  name: "followUpRecord",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.userArchivesRecord();
  },
  methods: {
    // 跟进记录
    async userArchivesRecord() {
      const data = {
        page: this.pageNum,
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await userArchivesRecord(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.userArchivesRecord();
    },
  },
};
</script>

<style lang="less" scoped>
.follow-up-record {
  .add-record {
    .add-record-actions {
      display: flex;
      justify-content: space-between;
    }
  }
  .record-list {
    font-size: 14px;
    ul {
      height: 640px;
      overflow-y: auto;
    }
    li {
      margin-bottom: 10px;
    }
    .list-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      .list-row-col {
        color: #606266;
        .col-name {
          color: #909399;
        }
      }
    }
  }
}
</style>