<template>
  <section>
    <div class="head_remind">
      *管理不同机构的仓库
    </div>
    <div class="mainwrap">
      <header class="header">
        <search2></search2>
        <div>
          <el-button type="primary" @click="addWarehouse">添加仓库</el-button>
          <el-button type="primary" @click="enterWarehouse" class="btn-width"
            >入库</el-button
          >
          <el-button type="primary" @click="allocation" class="btn-width"
            >调拨</el-button
          >
        </div>
      </header>
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
            label="仓库名称"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="关联机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="教材总数量"
            min-width="150"
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

          <el-table-column label="操作" fixed="right" min-width="210">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center;width:100%">
                <el-button
                  type="text"
                  @click="topayment(scope.row)"
                  style="margin-right:20px"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  @click="toTextbookDetail(scope.row)"
                  style="margin-right:20px"
                  >教材详情</el-button
                >
                <el-button type="text" @click="toWarehouseRecord(scope.row)"
                  >仓库日志</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="添加仓库" :visible.sync="dialogVisible" width="30%">
      <!-- <span>这是一段信息</span> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库名称" prop="name">
          <el-input
            class="input-width"
            v-model="ruleForm.name"
            placeholder="请输入仓库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="关联机构" prop="name">
          <el-select
            v-model="value"
            placeholder="请选择关联机构"
            class="input-width"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="入库" :visible.sync="enterVisible" width="40%">
      <div style="display:flex">
        <div style="padding-right:40px">
          <span style="padding-right:10px">仓库名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span style="padding-right:10px">仓库名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:20px"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <template slot="empty">
          <!--  <img class="data-pic" src="#" alt="" />-->

          <el-button type="text">
            + 选择添加教材
          </el-button>
        </template>

        <el-table-column prop="date" label="教材名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="所属分类" width="180">
        </el-table-column>
        <el-table-column prop="address" label="价格"> </el-table-column>
        <el-table-column prop="address" label="库存"> </el-table-column>
        <el-table-column prop="address" label="入库数量"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="enterVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterVisible = false"
          >入 库</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="调拨"
      :visible.sync="allocationVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :lg="8" :md="8" :sm="8" :xs="8" v-for="item in 3" :key="item">
            <el-form-item label="活动名称" prop="name">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:20px"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <template slot="empty">
          <!--  <img class="data-pic" src="#" alt="" />-->

          <el-button type="text">
            + 选择添加教材
          </el-button>
        </template>

        <el-table-column prop="date" label="教材名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="所属分类" width="180">
        </el-table-column>
        <el-table-column prop="address" label="价格"> </el-table-column>
        <el-table-column prop="address" label="库存"> </el-table-column>
        <el-table-column prop="address" label="入库数量"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocationVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'warehouseManage',
  data() {
    return {
      dialogVisible: false,
      enterVisible: false, //入库弹框
      allocationVisible: false, //回播弹框
      options: [],
      schoolData: [
        {
          index_category_name: '我想',
        },
      ],
      ruleForm: {},
      rules: {},
    }
  },
  methods: {
    allocation() {
      this.allocationVisible = true
    },
    enterWarehouse() {
      this.enterVisible = true
    },
    toTextbookDetail() {
      this.$router.push({
        path: '/sou/textbookDetail',
      })
    },
    toWarehouseRecord() {
      this.$router.push({
        path: '/sou/warehouseRecord',
      })
    },
    addWarehouse() {
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
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.input-width {
  width: 240px;
}
.btn-width {
  width: 90px;
}
</style>
