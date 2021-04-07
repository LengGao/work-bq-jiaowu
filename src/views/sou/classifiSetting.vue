<template>
  <div>
    <div class="head_remind">
      *分类设置是按照一定条件将相关对象进行归纳整理，方便后期筛选区分。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
        <el-button type="primary" @click="addClassiFion">添加分类</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" style="width: 100%;" class="min_table" :header-cell-style="{ 'text-align': 'left' }" :cell-style="{ 'text-align': 'left' }" :props="optionProps" row-key="category_id" :tree-props="{ children: 'son' }">
          <el-table-column prop="category_name" label="分类名称" min-width="180" style="padding-left:20px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="分类ID" show-overflow-tooltip min-width="130" prop="category_id">
          </el-table-column>
          <el-table-column label="分类图标" min-width="130" show-overflow-tooltip prop="icon">
            <template slot-scope="scope">
              <div style="width:50px ;height:50px;">
                <img :src="scope.row.icon" alt class="school_class_box" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-col :span="12">
                  <el-input v-model="scope.row.sort" placeholder size="small" @blur="scopes(scope.row.category_id, scope.row.sort)"></el-input>
                </el-col>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="scope">
              <div style="display:flex;">
                <el-button type="text" @click="topayment(scope.row)">编辑</el-button>
                <el-button type="text" style="padding-left:10px" @click="delbtn(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="true">
          <el-form-item label="所属分类：">

            <el-cascader ref="cascader" clearable class="input-width" placeholder="请选择分类" v-model="ruleForm.pid" :options="selectData" :props="{ checkStrictly: true }"></el-cascader>
          </el-form-item>
          <el-form-item label="分类名称：">
            <el-input placeholder="请输入分类名称" v-model="ruleForm.category_name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="分类排序：">
            <el-input v-model="ruleForm.sort" class="input-width" placeholder=" 排序数字越大分类越靠前" type="number"></el-input>
            <!-- <p style="color:#aaa;ling-height:20px">
            排序数字越大分类越靠前,最小值为1
          </p> -->
          </el-form-item>
          <el-form-item label="分类图标：" style>
            <div v-show="!haschoose" style="display:flex">
              <div class="headPortrait el-icon-plus" @click="addIcon"></div>
              <div style="color:#aaa;ling-height:10px;margin-left:10px">
                <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
                <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
              </div>
            </div>
            <div v-show="haschoose" class=" imageBox ">
              <i class=" iconjia el-icon-plus" @click="addIcon"></i>
              <img style="width:100%;height:100%;" :src="ruleForm.icon" alt="" />
            </div>
          </el-form-item>
          <el-form-item label="分类描述：">
            <el-input type="textarea" v-model="ruleForm.describe" style="width:90%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <imgDialog v-if="pictureVisible" @closeImg="closeImg" @clearUrl="clearUrl"></imgDialog>
    </section>
  </div>
</template>

<script>
import {
  getCateList,
  getCategoryList,
  insertCategory,
  updateCategory,
  deleteCategory,
  updateCategorySort,
} from '@/api/sou'
import SearchList from '@/components/SearchList/index'

export default {
  data() {
    return {
      row: '',
      optionProps: {
        label: 'category_name',
        value: 'category_id',
        children: 'son',
        checkStrictly: true,
      },
      pageNum: [],
      haschoose: false,
      pictureVisible: false,
      //搜索数据
      searchData: {
        category_id: [],
        keyboard: '',
      },
      listData: [],
      selectData: [],
      schoolData: [],
      dialogTitle: '',
      datas: {},
      data: [],
      url: '',
      pictureVisible: false,
      page: 1,
      dialogVisible: false,
      keyboard: '',
      icon: '',
      // 搜索框
      searchOptions: [
        {
          key: 'keyboard',
          attrs: {
            placeholder: '分类名称',
            clearable: true,
          },
        },
      ],
      ruleForm: {
        category_name: '',
        pid: '',
        sort: '',
        index_category_name: '',
        describe: '',
        icon: '',
      },
      rules: {
        index_category_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getCateList()
    this.getCategoryList()
  },
  methods: {
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.ruleForm.icon = radioUrl
      } else {
        this.ruleForm.icon = ''
        this.haschoose = false
      }
    },
    addIcon() {
      this.pictureVisible = true
    },

    //搜索功能
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.getCategoryList()
    },
    doPageChange(page) {
      this.page = page
      this.getCategoryList()
    },
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
    topayment(ab) {
      this.dialogTitle = '编辑首页分类'
      this.haschoose = true
      // this.index_category_id = zx.index_category_id
      // this.$api.getCategoryList(this, this.index_category_id)
      this.ruleForm = ab
      this.icon = ab.icon
      console.log(ab)
      this.dialogVisible = true
      this.category_name = ab.category_name
      this.sort = ab.sort
      // this.pid = ab.pid.pop()
      this.describe = ab.describe
    },
    scopes(category_id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.changeUpdateSort(this, category_id, sorts)
        // this.getCategoryList()
      }
    },

    delbtn(row) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteCategory(row.category_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    addClassiFion() {
      this.dialogTitle = '添加分类'
      this.ruleForm = {
        icon: '',
        pid: '',
        cate_id: '',
        category_name: '',
        sort: '',
        describe: '',
      }
      this.haschoose = false
      this.dialogVisible = true
    },

    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        console.log(this.selectData)
        this.searchOptions[0].attrs.options = this.selectData
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {}
        newData[index].value = item.category_id
        newData[index].label = item.category_name
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },
    //分类列表接口
    async getCategoryList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      const res = await getCategoryList(data)
      this.listLoading = false
      this.listData = res.data
      console.log(res)
      this.listLoading = true
      this.listTotal = res.data.total
    },
    //添加分类接口
    async insertCategory() {
      const data = {
        page: this.pageNum,
        ...this.searchData,

        icon: this.ruleForm.icon,
        category_name: this.ruleForm.category_name,
        pid: this.ruleForm.pid ? this.ruleForm.pid.pop() : '',
        sort: this.ruleForm.sort,
        describe: this.describe,
      }
      const res = await insertCategory(data)
      this.listLoading = false
      if (res.code == 0) {
        console.log(res)
        this.$message.success(res.message)
        this.getCategoryList()
      }
    },

    //编辑分类接口
    async updateCategory() {
      const data = {
        page: this.pageNum,
        ...this.searchData,

        icon: this.ruleForm.icon,
        category_name: this.ruleForm.category_name,
        pid: this.ruleForm.pid ? this.ruleForm.pid.pop() : '',
        sort: this.ruleForm.sort,
        describe: this.ruleForm.describe,
        category_id: this.ruleForm.category_id,
      }
      console.log(data)
      const res = await updateCategory(data)
      this.listLoading = false
      if (res.code == 0) {
        console.log(res)
        this.$message.success(res.message)
        this.getCategoryList()
        this.dialogVisible = false
      }
    },
    //删除分类接口
    async deleteCategory(category_id) {
      const data = {
        category_id,
      }
      console.log(data)
      const res = await deleteCategory(data)

      if (res.code == 0) {
        console.log(res)
        this.$message.success(res.message)
        this.getCategoryList()
        this.dialogVisible = false
      }
    },

    //校区排序
    changeUpdateSort(self, id, sort) {
      let config = {
        id: id,
        sort: sort,
      }
      console.log(config)
      axiosHttp({
        url: url.changeUpdateSort,
        data: config,
        // method: 'GET',
        then(res) {
          console.log(res.data.data)
          if (res.data.code == 0) {
            self.$message({
              type: 'success',
              message: res.data.message,
            })
            self.$api.getSchoolList(self, 'schoolData')
          }
        },
      })
    },

    //分类排序接口
    async updateCategorySort(category_id, sort) {
      const data = {
        category_id: category_id,
        sort: sort,
      }
      console.log(data)
      const res = await updateCategorySort(data)

      if (res.code == 0) {
        console.log(res)
        this.$message.success(res.message)
        this.getCategoryList()
        this.dialogVisible = false
      }
    },

    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.category_id) {
            //修改
            this.updateCategory()
          } else {
            //添加分类
            this.insertCategory()
            this.dialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
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
/deep/.el-form-item__content {
  line-height: 30px;
}
/deep/.cell {
  margin-left: 20px;
}

.input-width {
  width: 350px;
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
</style>
