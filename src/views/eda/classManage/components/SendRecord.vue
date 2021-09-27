<template>
  <!--发送记录弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1000px"
    class="add-class"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
  <SearchList :options="searchOptionsSend" :data="searchDataSend" @on-search="handleSearch" />
  <el-table :data="gridData" :header-cell-style="{ 'text-align': 'center' }"
  :cell-style="{ 'text-align': 'center' }">
    <el-table-column property="date" label="编号" width="120"></el-table-column>
    <el-table-column property="name" label="姓名" width="120"></el-table-column>
    <el-table-column property="mobile" label="手机号码" width="140"></el-table-column>
    <el-table-column property="jg" label="所属机构" width="160"></el-table-column>
    <el-table-column property="zt" label="发送状态" width="120"></el-table-column>
    <el-table-column property="bz" label="备注"></el-table-column>
  </el-table>
  <div class="table_bottom">
    <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
  </div>
  </el-dialog>
</template>
<script>
import { uploadImageUrl } from "@/api/educational";
import {
  getHeadMasters,
  getproject,
  addClassroom,
  editClassroom,
  getClassroomDetail,
  getCourseOptions,
} from "@/api/eda";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          mobile: '13522023030',
          jg: '越潮教育',
          bz: "系统集成VIP学霸班上课通知系统集成VIP学霸班上课通知"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz:"2022年系统集成VIP学霸班上课通知"
        }, {
          date: '2016-05-01',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz:"2022年系统集成VIP学霸班上课通知"
        }, {
          date: '2016-05-03',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz:"2022年系统集成VIP学霸班上课通知"
        }],
    pageNum: 1,
    listTotal: 0,  
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
        searchDataSend: {
        },
        searchOptionsSend: [
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属机构",
            clearable: true,
            filterable: true,
          },
        },
          {
            key: "keyword",
            attrs: {
              placeholder: "学生姓名、手机号码",
            },
          },
        ],
    };
  },

  methods: {
    handleSearch(data) {
        this.pageNum = 1;
        this.searchData = {
          ...data,
          // category_id: data.category_id.pop(),
        };
        this.getClassList();
      },
    handlePageChange(val) {
        this.pageNum = val;
        this.getClassList();
      },
      handleOpen() {
      this.getClassList();
      if (this.id) {
        this.getClassroomDetail();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.getClassList();
    },
    async getClassList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-cover-upload {
  .upload-desc {
    //   #c0c4cc
    p {
      line-height: 1.5;
      color: #909399;
    }
  }
  .upload-item {
    position: relative;
    width: calc(100% / 4);
  }
  .upload-item /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-item /deep/.el-upload:hover {
    border-color: #409eff;
  }
  .upload-item-icon,
  .upload-loading {
    font-size: 28px;
    color: hsl(215, 8%, 58%);
    width: 220px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .imgs {
    padding: 5px;
    width: 220px;
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .del {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
    }
    &:hover {
      .del {
        color: #333;
        display: block;
      }
    }
  }
}
/deep/.el-dialog__body {
  padding: 30px 40px 20px 20px;
}
</style>
