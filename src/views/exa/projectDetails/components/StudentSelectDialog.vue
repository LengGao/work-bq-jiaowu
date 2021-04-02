<template>
  <!--添加编辑报考选择学生弹窗-->
  <el-dialog
    title="选择学生"
    :visible.sync="visible"
    width="1000px"
    @open="handleOpen"
    append-to-body
    :close-on-click-modal="false"
    @closed="hanldeCancel"
    class="student-select-dialog"
  >
    <!--搜索模块-->
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <div class="table-container">
      <div class="container-left">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          :row-key="getRowKeys"
          @selection-change="handleTableChange"
          height="400"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            reserve-selection
            type="selection"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="user_realname"
            label="学生姓名"
            min-width="90"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.telphone | filterPhone }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <div class="container-right">
        <div class="right-head">
          <div class="checked-num">
            已选学生
            <span>{{ getCheckedNumber }}</span>
          </div>
          <el-button type="text" @click="hadleResetUser">清空</el-button>
        </div>
        <ul class="right-content">
          <li v-for="(item, index) in selection" :key="item.uid">
            <span>{{ item.user_realname }}</span>
            <i class="el-icon-delete" @click="handleRemoveUser(index)"></i>
          </li>
        </ul>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneOptions } from "@/utils/index";
import { getproject } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { getStudentUserSelect, getClassRoomSelect } from "@/api/exa";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    checkeds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        pid: "",
        iid: [],
        cid: "",
        search_box: "",
      },
      searchOptions: [
        {
          key: "pid",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
          },
        },
        {
          key: "iid",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
            options: [],
          },
        },
        {
          key: "cid",
          type: "select",
          options: [],
          optionValue: "classroom_id",
          optionLabel: "classroom_name",
          attrs: {
            placeholder: "所属班级",
            clearable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      selection: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    // 已选数量
    getCheckedNumber() {
      return this.selection.length;
    },
  },
  methods: {
    handleOpen() {
      this.getStudentUserSelect();
      this.getproject();
      this.getInstitutionSelectData();
      this.getClassRoomSelect();
      // 把已经选择的回显上
      this.$nextTick(() => {
        this.selection = [...this.checkeds];
        // 替换掉this.$refs.multipleTable.selection上原有的
        const len = this.$refs.multipleTable.selection.length;
        this.$refs.multipleTable.selection.splice(0, len, ...this.checkeds);
      });
    },
    // 切换列表选择状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 指定一个唯一标识。id或者其他唯一的
    getRowKeys(row) {
      return row.uid;
    },

    // 右侧已选删除
    handleRemoveUser(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.selection.splice(index, 1);
    },
    // 右侧已选清空
    hadleResetUser() {
      this.toggleSelection();
    },
    // table选中
    handleTableChange(selection) {
      this.selection = selection ? [...selection] : [];
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        iid: data.iid.pop(),
      };
      this.getStudentUserSelect();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getStudentUserSelect();
    },
    //学生列表
    async getStudentUserSelect() {
      const data = {
        cate_id: this.$route.query?.cate_id,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getStudentUserSelect(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },

    // 获取班级下拉
    async getClassRoomSelect() {
      const data = {
        cate_id: this.$route.query?.cate_id,
      };
      const res = await getClassRoomSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取项目下拉
    async getproject() {
      const data = {
        category_id: this.$route.query?.cate_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    handleOk() {
      this.$emit("on-select", [...this.selection]);
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
      this.pageNum = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.student-select-dialog {
  .table-container {
    display: flex;
    justify-content: space-between;
    .container-left {
      border: 1px solid #dcdfe6;
      width: 68%;
    }
    .container-right {
      border: 1px solid #dcdfe6;
      width: 30%;
      .right-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 16px;
        color: #909399;
        background-color: #f8f8f8;
        border-bottom: 1px solid #dcdfe6;
        .checked-num {
          font-weight: 550;
          span {
            color: #2798ee;
          }
        }
      }
      .right-content {
        overflow-y: auto;
        height: 431px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid #dcdfe6;
          i {
            font-size: 18px;
            cursor: pointer;
            &:hover {
              color: #f56c6c;
            }
          }
        }
      }
    }
  }
}
</style>