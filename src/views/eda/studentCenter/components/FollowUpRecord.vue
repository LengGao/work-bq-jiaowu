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
        <el-form-item label="出生日期">
          <el-date-picker
            class="w-100"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
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
        <li>
          <el-card class="box-card">
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">跟进时间：</span>
                <span>2020-05-26 17:21:01 </span>
              </div>
              <div class="list-row-col">
                <span class="col-name">跟进人</span>
                <span>admin </span>
              </div>
              <div class="list-row-col">
                <span class="col-name">部门：</span>
                <span>招生部 </span>
              </div>
              <div class="list-row-col">
                <span class="col-name">角色：</span>
                <span>教务</span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">跟进内容：</span>
                <span>2020-05-26 17:21:01 </span>
              </div>
            </div>
            <div class="list-row">
              <div class="list-row-col">
                <span class="col-name">下次跟进时间：</span>
                <span>2020-05-26 17:21:01 </span>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "followUpRecord",
  data() {
    return {
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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