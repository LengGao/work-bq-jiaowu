<template>
  <div>
    <div class="head_remind">
      *管理所有教学教室以及使用情况
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <search2
          :contentShow="true"
          typeTx="punch"
          inputText="教室名称"
          api="getRoomList"
          @getTable="getTableList"
        ></search2>

        <el-button type="primary" @click="addClassroom">添加教室</el-button>
      </div>

      <!--教室配置表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="room_name"
            label="教室名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>

          <el-table-column
            prop="max_num"
            label="容纳人数"
            min-width="200"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="address"
            label="详细地址"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="comment"
            label="备注信息"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="是否启用"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                class="tablescope"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="startUsing(scope.row, $event)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="editClassroom(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="toClassroomUsage(scope.row)"
                  >使用情况</el-button
                >
                <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>

      <!--教室配置表格-->
      <!-- <div class="userTable" v-if="isTagactive === 2">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="course_id"
            label="上课时间"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>

          <el-table-column
            prop="course_name"
            label="教室名称"
            min-width="200"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="上课人数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="课程类型"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="课程名称"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="课次名称"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="上课老师"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_type_name"
            label="状态"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
      <!--教室配置弹框-->
      <el-dialog :title="classTitle" :visible.sync="classVisible" width="790px">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="flex-classroom">
            <el-form-item label="教室名称" prop="room_name">
              <el-input
                v-model="ruleForm.room_name"
                placeholder="请输入教室名称"
                class="input-width"
              ></el-input>
            </el-form-item>

            <el-form-item label="容纳人数" prop="max_num">
              <el-input
                v-model="ruleForm.max_num"
                placeholder="请输入容纳人数"
                type="number"
                class="input-width"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="详细地址">
            <el-input
              placeholder="请输入项目名称"
              v-model="ruleForm.address"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              v-model="ruleForm.comment"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- <span>这是一段信息</span> -->
        <span slot="footer" class="dialog-footer">
          <div style="display:flex;justify-content:space-between">
            <el-checkbox
              style="padding-left:10px ;"
              :class="ruleForm.id ? 'continueAdd' : ''"
              v-model="addChecked"
              >继续添加</el-checkbox
            >
            <div>
              <el-button @click="classVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleConfirm('ruleForm')"
                >确 定</el-button
              >
            </div>
          </div>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'courseManage',
  data() {
    return {
      classVisible: false,
      classTitle: '添加教室',
      addChecked: false, //继续添加
      rules: {
        room_name: [
          { required: true, message: '请输入教室名称', trigger: 'blur' },
        ],
        max_num: [
          { required: true, message: '请输入容纳人数', trigger: 'blur' },
        ],
      },
      ruleForm: {
        room_name: '',
        address: '',
        comment: '',
        max_num: '',
      },
      isTagactive: 1,
      tabFun: [
        {
          id: 1,
          name: '教室配置',
        },
        {
          id: 2,
          name: '使用情况',
        },
      ],
      page: 1,
      schoolData: [],
      course_ids: [],
      datas: {},
      selectData: [],
    }
  },
  created() {},
  mounted() {
    this.$api.getRoomList(this, 'schoolData')
    // this.$api.getCategoryList(this, 'selectData')
  },

  methods: {
    toClassroomUsage(row) {
      let obj = {
        room_name: row.room_name,
        address: row.address,
        max_num: row.max_num,
        comment: row.comment,
      }
      this.$router.push({
        path: '/sou/classroomUsage',
        query: {
          id: row.id,
          param: JSON.stringify(row),
        },
      })
    },
    startUsing(ab) {
      this.$api.updateRoomStatus(this, ab.id, ab.status)
    },
    handleDelete(ab) {
      this.$confirm('此操作将删除该教室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteRoom(this, ab.id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    handleConfirm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            //修改教室
            this.$api.updateRoom(this, this.ruleForm)
          } else {
            //添加教室
            this.$api.createRoom(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editClassroom(ab) {
      console.log(ab)
      this.classTitle = '编辑教室'
      this.ruleForm = ab
      this.classVisible = true
    },
    addClassroom() {
      this.classTitle = '添加教室'
      this.ruleForm = {
        room_name: '',
        address: '',
        comment: '',
        max_num: '',
      }

      this.classVisible = true
    },
    statusSwitch(ab) {
      this.isTagactive = ab.id
    },
    getTableList(state, val, datas) {
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getRoomList(this, 'schoolData')
    },

    toCreateClass(text) {
      this.$router.push({
        path: '/sou/createClass',
        query: {},
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.flex-classroom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.input-width {
  width: 240px;
}
.continueAdd {
  visibility: hidden;
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
.navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 14px;

    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.tabg {
  //   background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.batch_btn {
  padding-top: 20px;
  .el-button {
    margin-right: 25px;
  }
}
/deep/.tablescope {
  .el-switch__label--left {
    position: absolute;
    left: 10px;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right {
    position: absolute;
    color: #fff;
    z-index: -1;
  }
  .el-switch__label--right.is-active {
    z-index: 1;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1;
    color: #9c9c9c !important;
  }
  .is-checked {
    padding: 0;
  }
}
</style>
