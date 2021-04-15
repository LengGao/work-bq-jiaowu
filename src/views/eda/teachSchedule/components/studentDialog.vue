<template>
  <!--排课详情弹框-->
  <section>
    <el-dialog
      title="学员列表"
      :visible.sync="visible"
      width="70%"
      class="course-dialog"
      @open="handleOpen"
      @close="hanldeCancel"
      :close-on-click-modal="false"
    >
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          height="500px"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
            prop="uid"
          >
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="所属校区"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div v-if="row.schoole_name">
                {{ row.schoole_name }}
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="video_time_total"
            label="学习时长"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="video_progress"
            label="学习进度"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_problem"
            label="做题总数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="problem_rate"
            label="做题进度"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="real_topic_score"
            label="历年真题平均分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="exam_score"
            label="模拟考试平均分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="self_determination_score"
            label="自主出题最高分"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="live_time"
            label="直播时长"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column label="操作" fixed="right" min-width="130">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="linkTo(row)">转班</el-button>
              <el-button type="text" @click="removeConfirm([row.uid])"
                >移除</el-button
              >
            </div>
          </template>
        </el-table-column> -->
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { getClassstudentList } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    class_id: {
      type: [Number, String],
      default: "",
    },

    cateOptions: {
      type: Array,
      default: () => [],
    },
    datas: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        organization_id: [],
        keyword: "",
      },
      searchOptions: [
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
            clearable: true,
            options: this.cateOptions,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      visible: this.value,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
      };
      this.getClassstudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassstudentList();
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    //班级学生列表
    async getClassstudentList() {
      this.selectionIds = [];
      this.courseStudentIds = [];

      const data = {
        class_id: this.class_id,

        page: this.pageNum,
        ...this.searchData,
      };
      console.log(data);
      delete data.date;
      this.listLoading = true;
      const res = await getClassstudentList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
    handleOpen() {
      this.searchData = {
        organization_id: [],
        keyword: "",
      };
      this.getClassstudentList();
      this.getInstitutionSelectData();
    },
    //根据教室id获取课程
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.course-dialog {
  .detail {
    margin-left: 10px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    p {
      line-height: 30px;
    }
  }
  /deep/.el-dialog__body {
    padding-bottom: 0;
  }
  .detail__radius {
    position: relative;
    padding-left: 20px;

    &::before {
      position: absolute;
      left: 5px;
      top: 11px;
      content: "";
      width: 8px;
      height: 8px;
      background-color: #199fff;
      border-radius: 50%;
    }
  }
}
</style>
