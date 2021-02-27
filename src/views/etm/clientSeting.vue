<template>
  <section class="main">
    <div class="client_head">
      <div class="main_top">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
        <el-button type="success">搜索</el-button>
      </div>
      <el-button type="primary" @click="handleEdit">添加字段</el-button>
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%;"
        class="min_table"
      >
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <!-- <el-table-column prop="uid"
                         label="学员头像"
                         show-overflow-tooltip
                         min-width="90"></el-table-column> -->
        <el-table-column
          prop="uid"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="字段名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="内容项"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template>
            <div style="display: flex;">
              <el-button type="text" @click="handleEdit">编辑</el-button>
              <el-button type="text" @click="handleDelete">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
    </div>
    <!--弹框部分-->
    <el-dialog
      title="字段编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="fieldbox">
        <span>字段名称</span>
        <el-input placeholder="渠道来源" disabled></el-input>
        <div class="content">
          <div class="title">内容项</div>
          <div class="inputBox">
            <div
              class="inputLine"
              v-for="(item, index) in proName"
              :key="index"
            >
              <el-input placeholder="渠道来源" clearable></el-input>
              <el-button
                type="text"
                icon="el-icon-plus"
                @click="addProName"
              ></el-button>
              <el-button
                type="text"
                icon="el-icon-minus"
                @click="delSingleInput(index)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'seaStudent',
  data() {
    return {
      dialogVisible: false,
      proName: [
        {
          /*这里先写一个，默认就有一条*/
          name: '',
        },
      ],
      schoolData: [
        { nickname: '聊', mobile: '1500333' },
        { nickname: '聊', mobile: '1500333' },
      ],
    }
  },
  methods: {
    handleEdit() {
      this.dialogVisible = true
    },
    addProName() {
      let cope = {
        name: '',
      }
      this.proName.push(cope)
    },
    // 单个删除
    delSingleInput(index) {
      this.proName.splice(index, 1)
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
.main {
  padding: 20px;
}

.userTable {
  margin-top: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main_top {
  .el-input {
    width: 300px;
    padding-right: 20px;
  }
}
.el-input {
  width: 300px;
  padding-right: 20px;
}
.fieldbox {
  padding: 30px;
  span {
    padding-right: 40px;
  }
  .content {
    display: flex;
    margin-top: 40px;
    .title {
      padding-top: 8px;
    }
    .inputLine {
      margin-bottom: 20px;
    }
    .el-input {
      width: 235px;
      margin-left: 54px;
    }
  }
}
</style>
