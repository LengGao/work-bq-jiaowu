<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="教材名称"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="projectDialog">
          添加项目
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
            label="项目ID"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="项目名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="最低价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="index_category_name"
            label="购买人数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="status"
            label="是否上架"
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
        <el-form label-width="100px">
          <h3 class="project-h3" style="margin-bottom:20px">
            基本信息
          </h3>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目名称">
                <el-input
                  placeholder="请输入项目名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="所属分类">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目价格">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="最低价格">
                <el-input
                  placeholder="请输入最低价格"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目周期">
                <el-radio-group>
                  <el-radio :label="3">服务时长</el-radio>
                  <el-radio :label="6">有效期限</el-radio>
                </el-radio-group>
                <el-select v-model="value" placeholder="请选择服务时长">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> -->
                </el-select>
                <!-- <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="适用范围">
                <el-radio-group>
                  <el-radio :label="3">当前校区</el-radio>
                  <el-radio :label="6">全部校区</el-radio>
                  <el-radio :label="6">指定校区</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="是否上架">
                <el-radio-group>
                  <el-radio :label="3">是</el-radio>
                  <el-radio :label="6">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
          </el-row>
        </el-form>
        <h3 class="project-h3" style="margin-bottom:20px">
          项目配置
        </h3>
        <ul class="project-ul" v-for="item in 3" :key="item">
          <li>
            课程
          </li>
          <li style="width:100%;list-style:none;padding-left:20px">
            <el-tag>家</el-tag>
          </li>
          <li>
            选择
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
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
      addClassify: {},
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
