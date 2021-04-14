<template>
  <section class="mainwrap">
    <div class="client_head">
      <search2 :contentShow="true" api="getTeacherList" inputText="授课老师" @getTable="getTableList"></search2>
      <el-button type="primary" @click="toAddTeacher">添加老师</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table ref="multipleTable" :data="schoolData.list" style="width: 100%" class="min_table" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="teacher_id" label="老师编号" min-width="110" show-overflow-tooltip></el-table-column>

        <el-table-column prop="head_image_id" label="老师头像" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="margin:0 auto;width:50px ;height:50px;">
              <img :src="scope.row.url" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="老师姓名" min-width="110" show-overflow-tooltip></el-table-column>

        <el-table-column prop="telephone" label="联系方式" min-width="150" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <div>
              {{ row.telephone | filterPhone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-col :span="12">
              <el-input v-model="scope.row.sort" placeholder size="small" @blur="scopes(scope.row.teacher_id, scope.row.sort)"></el-input>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch active-color="#13ce66" v-model="scope.row.account_status" :active-value="1" :inactive-value="2" @change="changeSwitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" @click="toAddTeacher(scope.row)">编辑</el-button>
              <el-button type="text" style="padding-left:40px" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.total" :curpage="page" @pageChange="doPageChange" />
        </div>
      </div>
    </div>
    <!--弹框-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [],
      page: 1,
      status: '',
      url: '',
      datas: {},
    }
  },

  created() {
    this.$api.getTeacherList(this, 'schoolData')
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  methods: {
    scopes(teacher_id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.updateTeacherSort(teacher_id, sorts, this)
      }
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    changeSwitch(zx) {
      console.log(zx)
      let statue = ''
      if (zx.account_status == '1') {
        statue = '1'
      } else {
        statue = '2'
      }
      this.$api.changeTeacherStatus(this, zx.teacher_id, statue)
    },
    doPageChange(page) {
      this.page = page
      this.$api.getTeacherList(this, 'schoolData', this.datas)
    },
    toAddTeacher(zx) {
      this.$router.push({
        name: 'addTeacher',
        query: {
          teacher_id: zx.teacher_id,
        },
      })
    },
    handleDelete(ab) {
      this.$confirm('确定要删除当前授课老师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteTeacher(this, ab.teacher_id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    addClassiFion() {
      for (let key in this.addClassify) {
        this.addClassify[key] = ''
      }
      this.url = ''
      this.haschoose = false
      this.dialogVisible = true
    },
    doPageChange(page) {
      this.page = page
      this.$api.getHomeclassifiList(this, 'schoolData')
    },
    handleConfirm() {
      if (this.index_category_id != undefined) {
        this.$api.modifyHomeCategory(this, this.index_category_id)
      } else {
        this.$api.addHomeCategory(this, 'addClassify')
      }
    },
    addIcon() {
      this.$router.push({
        path: '/eda/addNewClassify',
        query: { id: '' },
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
