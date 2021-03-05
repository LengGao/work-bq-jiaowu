<template>
  <div>
    <div class="head_remind">
      *管理第三方推荐机构的账号密码
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <search2
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="机构名称"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="projectDialog">
          添加机构
        </el-button>
      </div>
      <!--表格-->
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
            label="机构编号"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="机构名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="负责人"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="手机号"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="推荐学员"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="index_category_name"
            label="成交学员"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="未成交学员"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="退费学员"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="addClassiFion(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="addClassiFion(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
      </div>
      <!--添加项目弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="机构名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入机构名称"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入负责人姓名"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入手机号码"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入登录密码"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'projectManage',
  data() {
    return {
      ruleForm: {},
      dialogTitle: '添加机构',
      dialogVisible: false,
    }
  },
  methods: {
    projectDialog() {
      this.dialogVisible = true
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
.input-width {
  width: 240px;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.head-search {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.project-h3 {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.580392156862745);
  line-height: 16px;
  border-left: 3px solid #199fff;
  padding-left: 5px;
}
.project-ul {
  width: 100%;
  border-top: 1px solid rgba(235, 238, 245, 1);
  border-left: 1px solid rgba(235, 238, 245, 1);
  border-right: 1px solid rgba(235, 238, 245, 1);
  display: flex;
  align-items: center;
  height: 45px;

  li:first-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:last-child {
    list-style: none;
    height: 45px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(235, 238, 245, 1);
    color: #199fff;
  }
}
.project-ul:last-child {
  border-bottom: 1px solid rgba(235, 238, 245, 1);
}
</style>
