<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="emp_form">
        <el-form-item prop="title" label="通知标题">
          <el-input
            disabled
            placeholder="请输入通知标题"
            v-model="ruleForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item prop="teacher" label="任课老师">
          <el-input
            disabled
            v-model="ruleForm.teacher"
            placeholder="请输入任课老师"
          ></el-input>
        </el-form-item>
        <el-form-item prop="time" label="上课时间">
          <el-input
            disabled
            v-model="ruleForm.time"
            placeholder="请输入上课时间"
          ></el-input>
        </el-form-item>
        <template>
          <el-form-item prop="content" label="上课内容">
            <el-input
              disabled
              v-model="ruleForm.content"
              style="width:500px"
              placeholder="请输入上课内容"
            ></el-input>
          </el-form-item>
          <el-form-item prop="address" label="上课地点">
            <el-input
              v-model="address"
              style="width:500px"
              placeholder="请输入详细地点"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks" label="注意事项">
            <el-input
              type="textarea"
              v-model="remarks"
              style="width:500px"
              placeholder="请输入注意事项(请携带xx教材)"
            ></el-input>
          </el-form-item>
        </template>

        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="preserve('ruleForm')"
            >群发消息</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="admin_id"
          label="序号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="title"
          label="通知标题"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="content"
          label="上课内容"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="发送时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total"
          label="发送总数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="success"
          label="发送成功"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
export default {
  name: 'addEmployee',
  data() {
    return {
      ruleForm: {},
      address: '',
      remarks: '',
      // detail: {},
      schoolData: [],
    }
  },
  mounted() {
    this.$api.getSubMessageInfo(this, 'schoolData')
  },
  methods: {
    cancel() {},
    preserve() {
      this.$confirm('此操作将群发该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.sendSubMessage(this, this.ruleForm)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
/deep/.el-form-item__label {
  padding: 0 30px 0 0;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
/deep/.el-form-item {
  margin-bottom: 40px;
}
.el-select {
  width: 250px;
}
.el-input {
  width: 250px;
}
.demo-ruleForm {
  display: flex;
}
.emp_upload {
  padding-left: 40px;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}
.imageBox:hover {
}
.imageBox:hover i {
  display: block;
}
</style>
