<template>
  <section>
    <div class="head_remind">
      *可按照角色权限对员工账号进行分类管理
    </div>

    <div class="staffsearch">
    <search2
            :contentShow="true"
            api="getHomeclassifiList"
            inputText="搜索员工姓名/手机号"
            @getTable="getTableList"
          ></search2>
      </div>
    <div class="mainwrap main">
      
      <div class="left-container">

        <div class="enrollment-info">
          <h2>成员信息</h2>
          <ul>
            <li
              v-for="item in enrollData"
              :class="{ tabg: item.id == isTagactive }"
              :key="item.id"
              @click="statusSwitch(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="enrollment-info" style="margin-top:20px">
          <h2>部门信息</h2>
          <ul>
            <li v-for="item in depaData" 
            :class="{ tabg: item.id == isTagactive }"
            :key="item.id"
            @click="depaSwitch(item)"
            >
             
            {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <section class="main-right">
        <div class="client_head">
          <h4>{{ isTagactiveName }}</h4>
          
          <el-button type="primary" @click="addClassiFion">添加员工</el-button>
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
              label="ID"
              show-overflow-tooltip
              min-width="90"
              prop="index_category_id"
            >
            </el-table-column>
            <el-table-column
              prop="index_category_name"
              label="学籍状态"
              min-width="110"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column label="排序" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <div style="display:flex;justify-content:center">
                  <el-col :span="12">
                    <el-input
                      v-model="scope.row.sort"
                      placeholder
                      size="small"
                      @blur="
                        scopes(scope.row.index_category_id, scope.row.sort)
                      "
                    ></el-input>
                  </el-col>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="类型"
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

            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope">
                <div style="display:flex;justify-content:center">
                  <el-button type="text" @click="topayment(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="topayment(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
export default {
  name: 'staff',
  data() {
    return {
      schoolData: [{ index_category_name: 11 }],
      isTagactive: 1,
      isTagactiveName: '全部成员',
      enrollData: [
        { id: 1, name: '全部成员' },
        { id: 2, name: '未分配成员' },
        { id: 3, name: '已禁用成员' },
      ],
      depaData: [
        { id: 4, name: '总经办' },
        { id: 5, name: '岗顶-教务部' },
        { id: 6, name: '岗顶-技术部' },
      ],
    }
  },
  methods: {
    statusSwitch(ab) {
      this.isTagactive = ab.id
      this.isTagactiveName = ab.name
    },
    depaSwitch(cd) {
      this.isTagactive = cd.id
      this.isTagactiveName = cd.name
    },
    addClassiFion() {
      let obj = {
        index_category_name: '',
      }
      this.schoolData.push(obj)
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.main {
  display: flex;
  justify-content: center;

  .left-container {
    width: 250px;
    margin-right: 20px;
  }
  .main-right {
    flex: 1;
    width: 0;
  }
}
.tabg {
  background: rgba(236, 245, 255, 1) !important;
  //   color: #2798ee !important;
  //   border-bottom: 2px solid #199fff !important;
}
.enrollment-info {
  border: 1px solid rgba(220, 223, 230, 1);
  h2 {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;

    letter-spacing: normal;
    color: #333333;
    width: 100%;
    padding: 12px 0 12px 20px;
    border-bottom: 1px solid rgba(220, 223, 230, 1);
  }
  ul {
    font-size: 14px;
    color: #606266;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    li {
      padding: 12px 0 12px 20px;
    }
    li:hover {
      background: rgba(236, 245, 255, 1);
    }
  }
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    color: #333333;
    font-size: 20px;
  }
}
.userTable {
  margin-top: 20px;
}
.staffsearch{
  margin:20px 20px 0 20px;
  background:#fdfdfd;
  padding:10px;
  border-bottom: 1px solid #eee;
}
</style>
