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
      <el-form-item label="备注信息" class="desc">
        <el-input
          type="textarea"
          placeholder="请输入"
          v-model="ruleForm.desc"
        ></el-input>
      </el-form-item>
      <div class="add-record-actions">
        <el-form-item label="下次跟进时间">
          <el-date-picker
            class="w-100"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            v-model="ruleForm.todo_time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >发布</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <div class="record-list">
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
                <span>{{ item.staff_name || "--" }} </span>
              </div>
              <!-- <div class="list-row-col">
                <span class="col-name">部门：</span>
                <span>{{ item.staff_name }} </span>
              </div> -->
              <!-- <div class="list-row-col">
                <span class="col-name">角色：</span>
                <span>教务</span>
              </div> -->
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">跟进内容：</span>
                <span>{{ item.desc }} </span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">下次跟进时间：</span>
                <span>{{ item.todo_time }}</span>
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
import { userArchivesRecord, addUserArchivesRecord } from "@/api/eda";
export default {
  name: "followUpRecord",
  props:{
    uid:{
      type:[String,Number],
      default:''
    }
  },
  data() {
    return {
      ruleForm: {
        desc: "",
        todo_time: "",
      },
      rules: {
        desc: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
      },
      listData: [],
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.userArchivesRecord();
  },
  methods: {
    // 添加跟进记录
    async addUserArchivesRecord() {
      const data = {
        ...this.ruleForm,
        uid: this.uid,
      };
      const res = await addUserArchivesRecord(data);
      if (res.code === 0) {
        this.ruleForm = {
          desc: "",
          todo_time: "",
        };
        this.$message.success(res.message);
        this.userArchivesRecord();
      }
    },
    // 跟进记录
    async userArchivesRecord() {
      const data = {
        page: this.pageNum,
        uid: this.datas.uid,
      };
      const res = await userArchivesRecord(data);
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.userArchivesRecord();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUserArchivesRecord();
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
    font-size: 14px;
    height: 590px;
    overflow-y: auto;
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