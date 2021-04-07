<template>
  <!-- 阅读情况弹窗 -->
  <section>
    <el-dialog title="阅读情况" :visible.sync="visible" width="45%" @open="handleOpen" :close-on-click-modal="false" @closed="resetForm('ruleForm')">
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="light" stripe style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table" @selection-change="handleAllSelect">
          <el-table-column prop="id" label="序号" min-width="80" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="identity" label="账号身份" min-width="180" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="staff_name" label="员工姓名" min-width="180" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="read" label="阅读状态" min-width="180" column-key="role_id" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div>
                <el-button type="text"> {{noticeMap[row.read] }}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="完成时间" min-width="160" column-key="role_id" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>

      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span> -->
    </el-dialog>
  </section>
</template>

<script>
import { sendRecord, getReceiverSelect } from '@/api/system'
import SearchList from '@/components/SearchList/index'
import { getCateList } from '@/api/sou'

export default {
  components: {
    SearchList,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      // id: '',
      pageNum: 1,
      listTotal: 0,
      noticeMap: {
        1: '未读',
        2: '已读',
      },
      selectData: [],
      selection: [],
      listData: [],
      visible: this.value,
      //搜索数据
      searchData: {
        search_box: '',
        identity: '',
        read: '',
      },
      searchOptions: [
        {
          key: 'identity',
          type: 'select',
          options: [],
          optionValue: 'id',
          optionLabel: 'name',
          attrs: {
            placeholder: '账号身份',
            clearable: true,
          },
        },
        {
          key: 'read',
          type: 'select',
          options: [
            { value: 1, lable: '未读' },
            { value: 2, lable: '已读' },
          ],
          optionValue: 'value',
          optionLabel: 'lable',
          attrs: {
            placeholder: '阅读状态',
            clearable: true,
          },
        },
        {
          key: 'search_box',
          attrs: {
            placeholder: '搜索员工姓名',
          },
        },
      ],
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  created() {},
  methods: {
    handleAllSelect(selection) {
      this.selection = selection
    },
    handleOpen() {
      this.sendRecord()
      this.getReceiverSelect()
      // this.getCateList()
    },
    resetForm() {
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
    //搜索模块
    handleSearch(data) {
      console.log(data)
      this.pageNum = 1
      this.searchData = {
        ...data,
        date: data.list ? data.list.join(' - ') : '',
      }
      this.sendRecord()
    },

    handlePageChange(val) {
      this.pageNum = val
      this.sendRecord()
    },

    // 获取搜索选项
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
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
    //发送记录列表接口
    async sendRecord() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        id: this.id,
        limit: 20,
      }
      console.log(this.id)
      const res = await sendRecord(data)
      console.log(res.data.list)
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    //通知对象接口
    async getReceiverSelect() {
      const data = {
        id: this.id,
        name: this.name,
      }
      console.log(data)
      const res = await getReceiverSelect(data)
      console.log(res.data)
      if (res.code == 0) {
        // this.options = res.data
        this.searchOptions[0].options = res.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table_bottom {
  text-align: right;
}
</style>