<template>
  <div class="institution-account">
    <div class="head_remind">*查看机构项目</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          style="width: 100%"
          class="min_table"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="机构名称"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="institution_name"
            fixed="left"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                @click="linkTo('institutionDetails', row)"
                >{{ row.institution_name }}</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            v-for="(item, index) in listColumnData"
            :key="index"
            :label="item.category_name"
            align="left"
            min-width="240"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>
                <span style="margin-right: 10px"
                  >项目：
                  <span
                    :style="{
                      color: row[`project_count_${item.category_id}`]
                        ? ''
                        : 'red',
                    }"
                    >{{ row[`project_count_${item.category_id}`] }}</span
                  >
                </span>
                <span>渠道：</span>
                <span
                  class="btn-edu"
                  @click="openChangeDialog(row, item.category_id)"
                  >{{
                    row[`channel_staff_name_${item.category_id}`] || "无"
                  }}</span
                >
              </div>
              <span>教务：</span>
              <span
                class="btn-edu"
                @click="openChangeDialog(row, item.category_id)"
                >{{
                  row[`education_staff_name_${item.category_id}`] || "无"
                }}</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
    <el-dialog
      title="学生对接"
      :visible.sync="visible"
      width="400px"
      center
      @close="onChangeDialogClose"
    >
      <div style="margin-bottom: 10px">
        <span>渠道：</span>
        <el-select
          v-model="currentData[`channel_staff_id_${currentCateId}`]"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option
            v-for="item in channelStaffOptions"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span
              style="
                float: right;
                color: #8492a6;
                font-size: 13px;
                margin: 0 15px 0 10px;
              "
              >{{ item.department_name }}</span
            >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>教务：</span>
        <el-select
          v-model="currentData[`education_staff_id_arr_${currentCateId}`]"
          placeholder="请选择"
          filterable
          clearable
          multiple
        >
          <el-option
            v-for="item in eduStaffOptions"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id + ''"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span
              style="
                float: right;
                color: #8492a6;
                font-size: 13px;
                margin: 0 15px 0 10px;
              "
              >{{ item.department_name }}</span
            >
          </el-option>
        </el-select>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orgCateStatisticsList,
  getStaffSelect,
  setStudentReception,
} from "@/api/institution";
export default {
  name: "institutionProject",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        search_box: "",
      },
      searchOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "机构名称",
          },
        },
      ],
      channelStaffOptions: [],
      eduStaffOptions: [],
      listColumnData: [],
      visible: false,
      currentData: {},
      currentCateId: "",
    };
  },

  created() {
    this.orgCateStatisticsList();
    this.getStaffSelect(1);
    this.getStaffSelect(2);
  },
  methods: {
    onChangeDialogClose() {
      this.setStudentReception();
      // 设置选中的人名
      this.currentData[`education_staff_name_${this.currentCateId}`] =
        this.eduStaffOptions
          .filter((item) =>
            this.currentData[
              `education_staff_id_arr_${this.currentCateId}`
            ].includes(item.staff_id + "")
          )
          .map((item) => item.staff_name)
          .join(",");

      this.channelStaffOptions.forEach((item) => {
        if (
          item.staff_id ===
          this.currentData[`channel_staff_id_${this.currentCateId}`]
        ) {
          this.currentData[`channel_staff_name_${this.currentCateId}`] =
            item.staff_name;
        }
      });
    },
    openChangeDialog(row, cateId) {
      this.currentCateId = cateId;
      this.currentData = row;
      this.visible = true;
    },
    linkTo(name, query) {
      this.$router.push({
        name,
        query,
      });
    },
    async setStudentReception() {
      const data = {
        org_id: this.currentData.institution_id,
        channel_staff_id:
          this.currentData[`channel_staff_id_${this.currentCateId}`],
        cate_id: this.currentCateId,
        education_staff_id_arr:
          this.currentData[`education_staff_id_arr_${this.currentCateId}`],
      };
      const res = await setStudentReception(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    async getStaffSelect(status) {
      const data = {
        status,
      };
      const res = await getStaffSelect(data);
      if (res.code === 0) {
        if (status === 1) {
          this.channelStaffOptions = res.data;
        } else if (status === 2) {
          this.eduStaffOptions = res.data;
        }
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.orgCateStatisticsList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.orgCateStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.orgCateStatisticsList();
    },
    async orgCateStatisticsList() {
      this.checkedIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await orgCateStatisticsList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listColumnData = res.data.cate_field;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.container {
  padding: 20px;
  .red {
    color: #fd6584;
  }
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.btn-edu {
  color: gray;
  cursor: pointer;
  &:hover {
    color: #52adf1;
  }
}
</style>
