<template>
  <div class="record">
    <el-input type="textarea" placeholder="请填写跟进记录" v-model="record" />
    <div class="record_btn">
      <el-button type="primary" size="medium" @click="release">发布</el-button>
    </div>
    <div class="userTable">
      <el-table ref="multipleTable" :data="schoolData.list" tooltip-effect="light" stripe style="width: 100%" class="min_table">
        <el-table-column prop="admin_name" label="员工姓名" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role_name" label="员工职位" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="发布时间" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="record" label="记录详情" min-width="100" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.total" :curpage="page" @pageChange="doPageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      schoolData: [],
      record: '',
    }
  },
  props: {
    uid: {
      type: Number,
    },
    course_id: {
      type: Number,
    },
  },
  created() {
    // console.log(this.uid, this.course_id)
  },
  mounted() {
    console.log('我是更进记录')
    this.$api.getRoutineRecordList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getRoutineRecordList(this, 'schoolData')
    },
    release() {
      if (this.record == '') {
        this.$message({
          type: 'success',
          message: '请填写跟进记录',
        })
      } else {
        this.$api.insertRoutineRecord(this, 'schoolData')
      }
    },
  },
}
</script>
<style lang="scss">
  .el-tooltip__popper {
    max-width:70%
  }
</style>
<style lang="scss" scoped>
.el-textarea__inner {
  height: 100px;
}
.record_btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .el-button {
    width: 100px;
  }
}
</style>
