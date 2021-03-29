<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="addClassiFion">添加分类</el-button>
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
            label="分类ID"
            show-overflow-tooltip
            min-width="90"
            prop="category_id"
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="分类名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="分类图标"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div style="margin:0 auto;width:50px ;height:50px;">
                <img :src="scope.row.icon" alt class="school_class_box" />
              </div>
            </template>
          </el-table-column>
         
          <el-table-column label="排序" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-col :span="12">
                  <el-input
                    v-model="scope.row.sort"
                    placeholder
                    size="small"
                    @blur="scopes(scope.row.category_id, scope.row.sort)"
                  ></el-input>
                </el-col>
              </div>
            </template>
          </el-table-column>
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
      <!--弹框-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="576px"
      >
        <el-form label-width="100px">
          <el-form-item label="所属分类">
            <el-select
              v-model="ruleForm.category_name"
              placeholder="请选择所属分类"
              style="width:240px"
            >
              <el-option
                v-for="item in schoolData.list"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_name"
              >
              </el-option>
            </el-select>
            <!-- <el-input
              placeholder="请输入分类名称"
              v-model="ruleForm.index_category_name"
              class="input-width"
            ></el-input> -->
          </el-form-item>
          <el-form-item label="分类名称：">
            <el-input
              placeholder="请输入分类名称"
              v-model="ruleForm.index_category_name"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类排序：">
            <el-input
              v-model="ruleForm.sort"
              class="input-width"
              placeholder=" 排序数字越大分类越靠前"
              type="number"
            ></el-input>
            <!-- <p style="color:#aaa;ling-height:20px">
            排序数字越大分类越靠前,最小值为1
          </p> -->
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
import { getCateList } from '@/api/sou'
import SearchList from '@/components/SearchList/index'

export default {
  data() {
    return {
      pageNum:[],
      searchData:[],
      selectData: [],
      schoolData: [],
      dialogTitle: '',
      ruleForm: {
      category_name: '',
      sort: '',
      },
      datas: {},
      url: '',
      pictureVisible: false,
      haschoose: false,
      page: 1,
      dialogVisible: false,
      keyboard:'',

      // 搜索框
       searchOptions: [
   
        {
          key: 'keyboard',
          attrs: {
            placeholder: '分类名称',
          },
        },
      ],
    
    }
  },
  created() {
    this.getCateList()
    this.$api.getCategoryList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getCategoryList(this, 'schoolData', this.datas)
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
    topayment(zx) {
        this.dialogTitle = '编辑首页分类'
        console.log(zx)
        this.dialogVisible = true
        this.haschoose = true
        this.index_category_id = zx.index_category_id
        this.$api.getHomeclassifiDetail(this, this.index_category_id)
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

    addClassiFion() {
      this.dialogTitle = '添加分类'
        for (let key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.url = ''
        this.haschoose = false
      this.dialogVisible = true
    },
    handleConfirm() {
      console.log(this.ruleForm)
      console.log(this.index_category_id == '')
      if (this.index_category_id == '' || this.index_category_id == undefined) {
        this.$api.getCategoryList(this, 'ruleForm')
      } else {
        this.$api.getCategoryList(this, 'ruleForm')
      }
    },

     //搜索功能
     handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.$api.getCategoryList(this, 'schoolData')

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

    changeSwitch(ab) {
      console.log(ab)
      let formData = {
        category_id: ab.category_id,
        category_name: ab.category_name,
        icon: ab.icon,
        category_id: ab.category_id,
        sort: ab.sort,
        account_status: ab.account_status,
      }
      this.$api.getCategoryList(this, formData, 'POST')
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
.school_class_box{
  width: 32px;
  height: 32px;
}
</style>
