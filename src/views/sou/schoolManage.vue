<template>
  <div>
    <div class="head_remind">
      *管理校区负责人的联系方式
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <search2
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="校区名称"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="projectDialog">
          添加校区
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
            label="校区名称"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="负责人"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="联系方式"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="status"
            label="是否启用"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.account_status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>

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
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="校区名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入校区名称"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :lg="12" :md="12" :sm="12" :xs="12">
              <el-form-item label="负责人" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入负责人姓名"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xs="12">
              <el-form-item label="联系方式" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入联系方式"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :md="12" :sm="12" :xs="12">
              <el-form-item label="地址" prop="name">
                <div style="display:flex;aligin-item:center; ">
                  <el-input
                    v-model="ruleForm.name"
                    placeholder="请输入详细地址"
                    class="input-width"
                  ></el-input>
                  <div class="el-icon-search search-btn"></div>
                </div>
              </el-form-item>
            </el-col>
            <el-col
              :lg="12"
              :md="12"
              :sm="12"
              :xs="12"
              style="display:flex;justify-content:space-between"
            >
              <el-form-item label="经度" prop="name">
                <el-input v-model="ruleForm.name" style="80px"></el-input>
              </el-form-item>
              <el-form-item label="纬度" prop="name">
                <el-input v-model="ruleForm.name" style="80px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
      dialogTitle: '添加校区',
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
.search-btn {
  background: #199fff;
  width: 42px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  margin-left: 10px;
}
</style>
