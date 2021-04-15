<template>
  <section class="mainwrap">
    <div class="client_head">
      <search2
        :contentShow="true"
        api="getallcustomfield"
        inputText="字段名称"
        @getTable="getTableList"
      ></search2>

      <el-button type="primary" @click="handleEdit">添加字段</el-button>
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="fieldList.list"
        tooltip-effect="light"
        stripe
        style="width: 100%;"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="field_id"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="field_text"
          label="字段名称"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="field_text"
          label="字段属性"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.status == 0 ? '自定义字段' : '系统字段' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field_type"
          label="字段类型"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.field_type | fieldtype }}
          </template>
        </el-table-column>
        <el-table-column label="是否必填" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.required == '1' ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="scope">
            <div class="operation_btn">
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                style="padding-left:20px"
                type="text"
                v-if="scope.row.status == 0"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="fieldList.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <!--弹框部分-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="576px"
      :close-on-click-modal="false"
    >
      <div class="fieldbox">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="字段名称">
            <el-input
              v-model="ruleForm.text"
              placeholder="请输入字段名称"
              style="width:280px"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="字段类型">
            <el-select
              style="width:280px"
              v-model="ruleForm.type"
              placeholder="请选择字段类型"
              filterable
              @change="contentShow"
            >
              <el-option
                v-for="item in fieldtypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容项" v-if="iscontentshow">
            <div
              class="inputLine"
              v-for="(item, index) in proName"
              :key="index"
            >
              <el-input
                class="contentWidth"
                placeholder="请输入内容项"
                v-model="proName[index].name"
                clearable
              ></el-input>
              <el-button
                type="text"
                icon="el-icon-plus"
                @click="addProName"
                style="margin-left:10px"
              ></el-button>
              <el-button
                type="text"
                icon="el-icon-minus"
                @click="delSingleInput(index)"
              ></el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="ruleForm.checked"
              label="必填"
              true-label="1"
              false-label="0"
            ></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="conserve">保 存</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { constants } from 'crypto'
export default {
  name: 'seaStudent',
  data() {
    return {
      dialogVisible: false,
      datas: {},
      input2: '',
      dialogTitle: '',
      page: 1,
      iscontentshow: false,
      fieldtypeList: [
        {
          value: 'text',
          label: '文本',
        },
        {
          value: 'select',
          label: '单选',
        },
        {
          value: 'multi_select',
          label: '多选',
        },
        {
          value: 'date',
          label: '日期',
        },
      ],
      value: '',
      editEvent: '',
      ruleForm: {
        id: 0,
        text: '',
        type: '',
        content: '',
        checked: 0,
      },
      proName: [
        {
          /*这里先写一个，默认就有一条*/
          name: '',
        },
      ],

      fieldList: [],
      schoolData: [
        { nickname: '聊', mobile: '1500333' },
        { nickname: '聊', mobile: '1500333' },
      ],
    }
  },
  mounted() {
    this.$api.getallcustomfield(this, 'fieldList')
  },
  filters: {
    fieldtype(text) {
      // console.log(text)
      if (text == 'text') {
        return '文本'
      } else if (text == 'select') {
        return '单选'
      } else if (text == 'multi_select') {
        return '多选'
      } else {
        return '日期'
      }
    },
  },
  methods: {
    handleDelete(yx) {
      // console.log(yx)
      let field_id = yx.field_id
      this.$confirm('此操作将删除该字段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.delfield(this, field_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 获取数据
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.fieldList = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getallcustomfield(this, 'fieldList', this.datas)
    },
    handleEdit(zx) {
      //判断是添加事件还是编辑事件
      console.log(zx.field_id)
      if (zx.field_id != undefined) {
        this.dialogTitle = '字段编辑'
        this.editEvent = true
        this.ruleForm.text = zx.field_text
        this.ruleForm.type = zx.field_type
        this.ruleForm.id = zx.field_id
        if (zx.required == 1) {
          this.ruleForm.checked = true
        } else {
          this.ruleForm.checked = false
        }
        if (zx.field_type == 'select' || zx.field_type == 'multi_select') {
          this.iscontentshow = true
          let content = zx.field_content
          let contentList = []
          var cope = { name: '' }
          for (let i in content) {
            console.log(content[i])
            var cope = { name: '' }
            cope.name = content[i]
            contentList.push(cope)
          }
          this.proName = contentList

          console.log(cope)
        } else {
          this.iscontentshow = false
        }
      } else {
        this.dialogTitle = '添加字段'
        this.editEvent = false
        this.proName = [
          {
            name: '',
          },
        ]
        this.ruleForm.text = ''
        this.ruleForm.checked = 0
        this.ruleForm.type = ''
      }
      this.dialogVisible = true

      // this.ruleForm.field_content = zx.content
    },
    addProName() {
      let cope = {
        name: '',
      }
      this.proName.push(cope)
    },
    contentShow(ab) {
      if (ab == 'select' || ab == 'multi_select') {
        this.iscontentshow = true
      } else {
        this.iscontentshow = false
      }
    },
    //保存
    conserve() {
      let nameStr = ''
      for (const i in this.proName) {
        if (this.proName[i].name !== '') {
          nameStr += this.proName[i].name + '#'
        }
      }
      this.ruleForm.content = nameStr
      console.log(nameStr)
      console.log(this.ruleForm)
      if (this.editEvent) {
        this.$api.editfield(this, this.ruleForm)
      } else {
        this.$api.addfield(this, this.ruleForm)
      }
      console.log(this.proName) // this.dialogVisible = true
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
// /deep/.el-select .el-input__inner:nth-child(1) {
//   color: #606266;
//   width: 240px;
// }
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.contentWidth {
  width: 230px !important;
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
  // margin-right: 20px;
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

    .el-input {
      width: 235px;
      margin-left: 54px;
    }
  }
}
.operation_btn {
  display: flex;
  justify-content: center;
}
.inputLine {
  margin-bottom: 20px;
}
</style>
