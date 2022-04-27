<template>
  <!-- 跟进记录 -->
  <div class="follow-up-record">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="add-record"
    >
      <el-form-item label="备注信息" class="describe">
        <el-input
          type="textarea"
          placeholder="请输入"
          v-model="ruleForm.describe"
        ></el-input>
      </el-form-item>
      <div class="add-record-actions">
        <el-form-item label="下次跟进时间">
          <el-date-picker
            class="w-100"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            v-model="ruleForm.follow_next_time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >发布</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <div class="record-list" v-loading="listLoading">
      <ul>
        <li v-for="item in listData" :key="item.id">
          <el-card class="box-card" shadow="never">
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">跟进时间：</span>
                <span>{{ item.create_time || "--" }}</span>
              </div>
              <div class="list-row-col">
                <span class="col-name">跟进人：</span>
                <span>{{ item.follow_user_name || "--" }} </span>
              </div>
              <!-- <div class="list-row-col">
                <span class="col-name">部门：</span>
                <span>{{ item.staff_name }} </span>
              </div> -->
              <div class="list-row-col">
                <span class="col-name">角色：</span>
                <span>{{ item.position }}</span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">跟进内容：</span>
                <span>{{ item.describe }} </span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">下次跟进时间：</span>
                <span>{{ item.next_follow_time }}</span>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
      <p class="no-data" v-if="!listData.length && !listLoading">
        暂无跟进记录
      </p>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getFollowPage, insertTeachFollow } from "@/api/eda";
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
      ruleForm: {
        describe: "",
        follow_next_time: "",
      },
      rules: {
        describe: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
      },
      listData: [],
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      listLoading: false,
    };
  },
  created() {
    this.getFollowPage();
  },
  methods: {
    // 添加跟进记录
    async insertTeachFollow() {
      const data = {
        ...this.ruleForm,
        uid: this.uid,
      };
      const res = await insertTeachFollow(data);
      if (res.code === 0) {
        this.ruleForm = {
          describe: "",
          follow_next_time: "",
        };
        this.$message.success(res.message);
        this.getFollowPage();
      }
    },
    // 跟进记录
    async getFollowPage() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await getFollowPage(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getFollowPage();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getFollowPage();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.insertTeachFollow();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    position: relative;
    font-size: 14px;
    ul {
      height: 520px;
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
    .no-data {
      position: absolute;
      left: 50%;
      top: 35%;
      transform: translate(-50%, -35%);
      color: #909399;
    }
  }
}
</style>