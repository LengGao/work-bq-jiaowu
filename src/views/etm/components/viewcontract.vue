<template>
  <!-- 预览合同弹窗 -->
  <section>
    <el-dialog title="预览合同" :visible.sync="visible" width="50%" @open="handleOpen" :close-on-click-modal="false" @closed="resetForm('ruleForm')">
      <div style="display: flex;justify-content: space-between;">
        <div class="left">
          <div class="title">
            合同文本
          </div>
        </div>
        <div class="right">
          <el-button type="primary">发送合同链接</el-button>
          <el-button plain>生成二维码</el-button>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
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
  },
  data() {
    return {
      visible: this.value,
      tempForm: {
        category_name: '',
        category_names: '',
      },
      searchOptions: [
        {
          key: 'search_box',
          attrs: {
            placeholder: '合同名称',
            clearable: true,
          },
        },
      ],
      searchData: {
        category_id: [],
        search_box: '',
      },
      options: [],
      listData: [],
      pageNum: 1,
      listTotal: 0,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  created() {},
  methods: {
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
      // this.getCateList()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.noticelist()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.sendRecord()
    },
    handleAllSelect(selection) {
      this.selection = selection
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
.left {
  width: 75%;
  .title {
    height: 18px;
    line-height: 18px;
    border-left: 4px solid rgb(0, 153, 255);
    padding-left: 10px;
    font-size: 16px;
  }
}
.right {
  width: 25%;
  .el-button {
    font-size: 15px;
    display: block;
    width: 80%;
    height: 45px;
    margin: 0 0 20px 0;
    padding: 0;
  }
}
</style>