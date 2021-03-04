<template>
  <section class="mainwrap">
    <div class="client_head">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        api="getCategoryList"
        @getTable="getTableList"
      ></search>
      <el-button type="primary" @click="addClassifion">添加分类</el-button>
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
          prop="category_name"
          label="分类名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="describe"
          label="分类描述"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="分类图标" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <div style="width:50px ;height:50px">
                <img :src="scope.row.icon" alt class="school_class_box" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分类排序" show-overflow-tooltip min-width="90">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center;width:100%">
              <el-col :span="12">
                <el-input
                  v-model="scope.row.sort"
                  placeholder
                  size="small"
                  @blur="scopes(scope.row, scope.row.sort)"
                ></el-input>
              </el-col>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" @click="topayment(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                style="padding-left:40px"
                @click="delbtn(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <el-dialog
      title="添加课程分类"
      :visible.sync="dialogVisible"
      width="576px"
      append-to-body
    >
      <el-form label-width="100px">
        <el-form-item label="分类名称：">
          <el-input
            v-model="addClassify.category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类描述：">
          <el-input
            v-model="addClassify.describe"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类图标：" style>
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon"></i>
            <img style="width:100%;height:100%;" :src="url" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="分类排序：">
          <el-input
            v-model="addClassify.sort"
            class="input-width"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
const defaultAddClassifyPicture = {
  name: null,
}
export default {
  data() {
    return {
      imgUrl: '',
      // Visible: false,
      // Visible2: false,
      datas: {},
      schoolData: [],
      page: 1,
      dialogVisible: false,
      pictureVisible: false,
      addClassify: Object.assign({}, defaultAddClassifyPicture),
      haschoose: false,
      url: '',
    }
  },
  created() {
    this.$api.getCategoryList(this, 'schoolData')
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  // deactivated: function() {
  //   console.log(4)
  // },
  // activated: function() {
  //   console.log('faffafafafaf', this.dialogVisible)
  //   if (this.$route.query.url) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //     this.$api.getCategoryList(this, 'schoolData')
  //   }
  // },
  // deactivated: function() {
  //   console.log(4)
  // },
  methods: {
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
    addIcon() {
      this.imgUrl = ''
      this.pictureVisible = true
      // this.$router.push({
      //   path: '/eda/addNewClassify',
      //   query: { id: '' },
      // })
    },
    // setUrl(radioUrl) {
    //   this.url = radioUrl
    // },
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
      }
    },
    scopes(id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.updateCategorySort(id, sorts, this)
      }
    },
    topayment(data) {
      console.log(data)
      this.$router.push(
        // name: 'payMent'
        {
          path: '/eda/lessonDetail',
          query: { id: data.category_id, url: JSON.stringify(data.icon) },
        }
      )
    },
    toStudentDetail() {
      this.$router.push({
        name: 'studentDetail',
      })
    },
    delbtn(id) {
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteCategory(id, this)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getCategoryList(this, 'schoolData', datas)
    },
    addClassifion() {
      this.haschoose = false
      this.url = ''
      this.addClassify = {}
      this.dialogVisible = true
    },
    handleConfirm() {
      this.$api.insertCategory(this, 'addClassify')
    },
  },
  //   mounted() {}
}
</script>

<style lang="scss" scoped>
.el-icon-folder-opened {
  font-size: 50px;
  cursor: pointer;
}

/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  background: #ffffff;
 
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
.input-width {
  width: 280px;
  text-align: center;
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
