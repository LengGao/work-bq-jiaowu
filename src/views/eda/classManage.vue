<template>
  <div>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <search2
          :contentShow="true"
          :courseTypeShow="true"
          :classTypeShow="true"
          api="getHomeclassifiList"
          inputText="分类名称"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="addClass">添加班级</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="90"
            prop="classroom_id"
          >
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="班级名称"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="index_category_name"
            label="项目名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="班主任"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="student_number"
            label="班级人数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="300">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="toLearnerManage(scope.row)"
                  >学生管理</el-button
                >

                <el-button type="text" @click="toMassMessage(scope.row)"
                  >群发消息</el-button
                >
                <el-button type="text" @click="topayment(scope.row)"
                  >排课管理</el-button
                >
                <el-button type="text" @click="topayment(scope.row)"
                  >考试统计</el-button
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
      <!--弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
        <el-form label-width="100px">
          <el-row>
            <el-col :lg="12" :xs="12" :sm="12" :xl="12">
              <el-form-item label="所属分类">
                <el-select
                  v-model="ruleForm.category_id"
                  placeholder="请选择所属分类"
                >
                  <el-option
                    v-for="item in classifyData.list"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="12" :xs="12" :sm="12" :xl="12">
              <el-form-item label="所属项目">
                <el-input
                  placeholder="请输入所属项目"
                  v-model="ruleForm.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :lg="12" :xs="12" :sm="12" :xl="12">
              <el-form-item label="班级名称">
                <el-input
                  placeholder="请输入班级名称"
                  v-model="ruleForm.classroom_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :xs="12" :sm="12" :xl="12">
              <el-form-item label="班主任">
                <el-select
                  v-model="ruleForm.master_teacher_id"
                  placeholder="请选择"
                >
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="班级封面">
            <div v-show="!haschoose">
              <div class="headPortrait el-icon-plus" @click="addIcon"></div>
              <div style="color:#aaa;ling-height:20px">
                <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
                <p><span> 2. 推荐尺寸750*420px或者16:9</span></p>
              </div>
            </div>
            <div v-show="haschoose" class=" imageBox ">
              <i class=" iconjia el-icon-plus" @click="addIcon"></i>
              <img
                style="width:100%;height:100%; border-radius: 3px"
                :src="url"
                alt=""
              />
            </div>
          </el-form-item>
        </el-form>
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
  data() {
    return {
      schoolData: [],
      classifyData: [],
      index_category_id: '',
      dialogTitle: '添加班级',
      ruleForm: {
        classroom_name: '',
        teacher_id: '',
        master_teacher_id: 1,
        course_id: '',
        class_icon:
          'http://dpsystem.oss-cn-shenzhen.aliyuncs.com/moren1607659060/35b5e665b81ee8be42812abdb9a40256',
        describe: '',
        category_id: '',
      },
      datas: {},
      url: '',
      pictureVisible: false,
      haschoose: false,
      page: 1,
      dialogVisible: false,
    }
  },

  created() {},
  mounted() {
    this.$api.getClassroomList(this, 'schoolData')
    this.$api.getCategoryList(this, 'classifyData')
  },

  methods: {
    handleEdit(ab) {
      this.dialogVisible = true
      this.ruleForm.classroom_id = ab.classroom_id
      this.ruleForm.classroom_name = ab.classroom_name
      this.ruleForm.teacher_id = ab.teacher_id
      this.ruleForm.master_teacher_id = ab.master_teacher_id
      this.ruleForm.class_icon = ab.class_icon

      // console.log(ab)
    },
    toClassDetail() {
      this.$router.push({
        path: '/eda/classDetail',
      })
    },
    addIcon() {},
    toMassMessage() {
      this.$router.push({
        path: '/eda/massMessage',
      })
    },
    toLearnerManage() {
      this.$router.push({
        path: '/eda/learnerManage',
      })
    },
    // doPageChange(page) {
    //   this.page = page
    //   this.$api.getHomeclassifiList(this, 'schoolData', this.datas)
    // },
    // 获取数据
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    topayment(zx) {
      //   this.dialogTitle = '编辑首页分类'
      //   console.log(zx)
      //   this.dialogVisible = true
      //   this.haschoose = true
      //   this.index_category_id = zx.index_category_id
      //   this.$api.getHomeclassifiDetail(this, this.index_category_id)
    },
    scopes(index_category_id, sorts) {
      //   var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      //   var re = new RegExp(regu)
      //   if (!re.test(sorts)) {
      //     this.$message.error('请输入正确的排序！')
      //     return false
      //   } else {
      //     this.$api.updateHomeClassifiSort(index_category_id, sorts, this)
      //   }
    },

    addClass() {
      this.dialogTitle = '添加班级'
      for (let key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      //   this.url = ''
      //   this.haschoose = false
      this.dialogVisible = true
    },
    handleConfirm() {
      console.log(this.ruleForm)
      console.log(this.ruleForm.classroom_id == '')
      if (
        this.ruleForm.classroom_id == '' ||
        this.ruleForm.classroom_id == undefined
      ) {
        this.$api.addClasses(this, this.ruleForm)
      } else {
        this.$api.modifyClasses(this, this.ruleForm)
      }
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
.headPortrait {
  width: 240px;
  height: 135px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.realname {
  color: #199fff;
  cursor: pointer;
}
</style>
