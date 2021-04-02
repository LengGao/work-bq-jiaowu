<template>
    <div>
     <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>
    <section class="mainwrap">
      <ul class="navigation">
        <li
          v-for="item in tabFun"
          :key="item.id"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)">
          {{ item.name }}
        </li>
      </ul>
      <div class="client_head">
         <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
          v-show="isTagactive === 1"
        />
        <SearchList
          :options="searchOptionss"
          :data="searchDatas"
          @on-search="handleSearchs"
          v-show="isTagactive === 2"
        />
        <Tablelist v-show="isTagactive === 1" />
      </div>
      
      <!--表格-->
      <div class="userTable" v-show="isTagactive === 1">
   
        <el-table
          ref="multipleTable"
          :data="subjectData.list"
          tooltip-effect="light"
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            show-overflow-tooltip
            min-width="60"
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="subject_name"
            label="考试科目"
            min-width="160"
            column-key="subject_name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="exam_type"
            label="科目性质"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_score"
            label="考试总分"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pass_score"
            label="合格分数"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="credit_hour"
            label="科目学分"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cost"
            label="补考费用"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="是否启用"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="stateChanged(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="editNotice(scope.row)"
                  >编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="subjectData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import { subjectList } from "@/api/examination";
import SearchList from '@/components/SearchList/index'
import { provinceAndCityData } from 'element-china-area-data'
import { getCateList } from '@/api/sou'
import Tablelist from './components/tablelist.vue'

export default {
    name: 'examination',
    components:{
      Tablelist
    },
    data() {
    return {
      selectData: [],
      schoolData: [],
      subjectData: [],
      createData: [],
      isTagactive: 1,
      page: 1,
      cate_id: '',
      tabFun: [
        {
          id: 1,
          name: '考试科目',
        },
        {
          id: 2,
          name: '报考规则',
        },
      ],
        // 搜索框
       searchOptions: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'keyboard',
          attrs: {
            placeholder: '科目名称',
          },
        },
      ],
       searchOptionss: [
        {
          key: 'category_id',
          type: 'cascader',
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'keyboard',
          attrs: {
            placeholder: '报考规则',
          },
        },
      ],
      searchData: {
        category_id: [],
        keyboard: '',
      },
      searchDatas: {
        category_id: [],
        keyboard: '',
      },
      listData:[]
     }
  },

  created() {
    this.subjectList() //考试科目列表
    this.getCateList()
    // this.$api.updateSubject(this, 'subjectData')
    // this.$api.createRule(this, 'schoolData')  //添加规则
  },

    methods: {
      statusSwitch(ab) {
      if(  ab.name === '报考规则'){
      this.$api.ruleList(this, 'schoolData')  //报考规则列表
      }else{
       this.subjectList()  //考试科目列表
      }
    // this.getCateList()
      this.isTagactive = ab.id
    },
      //搜索功能
     handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.subjectList()
    },
    handleSearchs(data) {
      this.pageNum = 1
      this.searchDatas = data
      console.log(this.isTagactive)
      if(this.isTagactive === 2){
      this.$api.ruleList(this, 'schoolData')
      }else{
       this.subjectList()  //考试科目列表
      }
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
    async subjectList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      }
      this.listLoading = true
      const res = await subjectList(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
  
    },
    //报考规则search
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
    async ruleList() {
      const data = {
        page: this.pageNum,
        ...this.searchDatas,
      }
      this.listLoading = true
      const res = await ruleList(data)
      this.listLoading = false
      this.listData = res.data.data
      this.listTotal = res.data.total
    },
   
    subjectData(page) {
      this.page = page
      this.$api.subjectList(this, 'subjectData', this.datas)
    },
    doPageChange(page) {
      this.page = page
      this.$api.subjectList(this, 'subjectData', this.datas)
    },
    doPageChange(page) {
      this.page = page
      this.$api.createSubject(this, 'createData', this.datas)
    },
    doPageChange(page) {
      this.page = page
      this.$api.ruleList(this, 'schoolData', this.datas)
    },
    handleSelectionChange(val) {
      let multipleSelection = val
      this.course_ids = multipleSelection.map((i) => {
        console.log(i.course_id)
        return i.course_id
      })
    },
    editNotice(id) {
      this.classTitle = '编辑科目'
      this.ruleForm = id
      this.dialogVisible = true
      this.$api.updateSubject(this, this.ruleForm, 'GET')
    },
    addSubject(){
      this.classTitle = '添加科目'
      this.dialogVisible = true
       this.ruleForm = {
        subject_name:'',
          category_name: '',
          cost: '',
          total_score: '',
          pass_score: ''
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
.tabg {
  //background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>

