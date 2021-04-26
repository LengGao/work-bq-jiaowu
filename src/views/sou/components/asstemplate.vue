<template>
  <!-- 关联模板弹窗 -->
  <section>
    <el-dialog title="关联模板" :visible.sync="visible" width="65%" @open="handleOpen" :close-on-click-modal="false" @closed="resetForm('ruleForm')">
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="light" stripe style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column prop="id" label="id" min-width="150" column-key="id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="template_code" label="模板code" min-width="150" column-key="ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="template_name" label="合同名称" min-width="200" column-key="template_name" show-overflow-tooltip></el-table-column>
          <el-table-column prop="update_time" label="上传时间" min-width="200" column-key="update_time" show-overflow-tooltip></el-table-column>
          <el-table-column prop="template_url" label="合同模板" fixed="right" min-width="200">
            <template slot-scope="{row}">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="seetemplate(row)">查看模板</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content:center;">
                <el-button type="primary" plain @click="edittemplate(row)" size="small" style="font-size:14px">关联模板</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span> -->
    </el-dialog>

    <!--查看模板弹窗 -->
    <el-dialog title="查看模板" :visible.sync="dialogVisible" width="950px" :before-close="handleClose">
      <iframe :src="template_url" type="application/x-google-chrome-pdf" width="900px" height="650px" border="0" />
    </el-dialog>

  </section>
</template>

<script>
import { templatelist, contractlink } from '@/api/system'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: '',
    },
    project_id: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      template_id: '',
      template_url: '',
      dialogVisible: false,
      visible: this.value,
      // id: '',

      searchOptions: [
        {
          key: 'keyword',
          attrs: {
            placeholder: '合同名称',
            clearable: true,
          },
        },
      ],
      searchData: {
        id: [],
        keyword: '',
      },
      options: [],
      listData: [],
      pageNum: 1,
      listTotal: 0,
    }
  },
  created() {
    this.templatelist()
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  created() {},
  methods: {
    handleClose(done) {
      this.dialogVisible = false
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
    handleOpen() {
      this.templatelist()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.templatelist()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.templatelist()
    },
    handleAllSelect(selection) {
      this.selection = selection
    },
    // 合同模板列表接口
    async templatelist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      const res = await templatelist(data)
      console.log(res.data.data)
      this.listData = res.data.data
      this.listTotal = res.data.total
    },
    seetemplate(row) {
      console.log(row)
      this.dialogVisible = true
      this.template_url = row.template_url
    },
    // 关联模板接口
    async contractlink() {
      const data = {
        project_id: this.project_id,
        template_id: this.template_id,
      }
      const res = await contractlink(data)
      if (res.code == 0) {
        console.log(res)
        this.$message.success(res.message)
      }
    },
    edittemplate(row) {
      console.log(row)
      // this.project_id = row.
      this.template_id = row.id
      this.contractlink()
    },
  },
}
</script>

<style lang="scss" scoped>
.table_bottom {
  text-align: right;
}
.content {
  padding: 0 30px 30px 30px;
  .title {
    display: block;
    height: 16px;
    line-height: 16px;
    border-left: 3px solid rgb(1, 153, 255);
    padding-left: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
}
[data-v-7af6cb0d] .el-form-item {
  margin-bottom: 25px;
}
.btnspan {
  color: rgb(172, 172, 172);
  margin-left: 10px;
}
.formmargin {
  padding-bottom: 20px;
}
/deep/.el-dialog__footer {
  padding: 0 40px 40px 0;
}
/deep/.search-lise .search-item[data-v-a11328ce] {
  width: 300px;
}
</style>