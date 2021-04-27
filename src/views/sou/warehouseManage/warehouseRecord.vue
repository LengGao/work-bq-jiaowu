<template>
  <section class="mainwrap">
    <search
      :organHide="false"
      :schoolHide="false"
      :classNameHide="false"
      :dealStatusHide="false"
      :teacherHide="false"
      @getTable="getTableList"
      api="getMyclient"
      :statusNum="3"
    ></search>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="uid"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>

        <el-table-column
          prop="user_nicename"
          label="操作时间"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="操作类型"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="教材名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作数量"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="from"
          label="更新库存数量"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="from"
          label="操作人"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="from"
          label="备注信息"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "seaStudent",
  data() {
    return {
      schoolData: [],
      page: 1,
      status: 3,
      datas: {},
    };
  },
  mounted() {
    // let status = 3
    // this.$api.getCommonUserList(this, 'schoolData')
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
        this.datas = datas;
      } else if (state == "data") {
        this.schoolData = val;
      }
    },

    receiveStudent(zx) {
      console.log(zx);
      this.$api.receive(this, zx.intent_id);
    },
    doPageChange(page) {
      this.page = page;
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.getCommonUserList(this, "schoolData", this.datas);
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.userTable {
  margin-top: 20px;
}
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
</style>
