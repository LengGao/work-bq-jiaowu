<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div v-if="isAdd">
          <el-button @click="handleReset">取消</el-button>
          <el-button type="primary" @click="updateFollow">保存记录</el-button>
        </div>
        <div v-else>
          <el-button @click="handleReset">复位</el-button>
          <el-button type="primary" @click="updateFollow">更新记录</el-button>
        </div>
      </div>
      <ul class="class-info">
        <li class="info-item">
          <span class="info-item-label">班级名称</span>
          <span class="info-item-value">{{ classInfo.classroom_name }}</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">班主任</span>
          <span class="info-item-value">{{ classInfo.teacher_name }}</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">学生人数</span>
          <span class="info-item-value">{{ classInfo.total_students }}</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">数据截止时间</span>
          <span class="info-item-value">{{ classInfo.datetime }}</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">回访人</span>
          <span class="info-item-value">{{ classInfo.my_name }}</span>
        </li>
        <li class="info-item">
          <span class="info-item-label">下次回访时间</span>
          <span class="info-item-value">
            <el-date-picker
              v-model="nextFollowTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker
          ></span>
        </li>
      </ul>
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
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="学员编号" min-width="80" prop="id">
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.mobile | filterPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="org_name"
            label="所属机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="learn_rate"
            label="学习进度"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="problem_rate"
            label="做题进度"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="attendance_num"
            label="出勤次数"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="attendance_rate"
            label="出勤率"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="沟通内容" fixed="right" min-width="250">
            <template slot-scope="{ row }">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1 }"
                v-model="row.remark"
                placeholder="请输入"
              ></el-input>
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
    </section>
  </div>
</template>

<script>
import {
  getReturnVisitDetail,
  followClassroomInfo,
  updateFollow,
} from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        organization_id: [],
        value: "",
      },
      searchOptions: [
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "value",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      classInfo: {},
      nextFollowTime: "",
    };
  },
  computed: {
    isAdd() {
      return !!this.$route.query?.isAdd;
    },
  },
  created() {
    this.getInstitutionSelectData();
    this.followClassroomInfo();
    this.getReturnVisitDetail();
  },

  methods: {
    // 重置
    handleReset() {
      this.nextFollowTime = "";
      this.getReturnVisitDetail();
    },
    // 更新记录
    async updateFollow() {
      if (!this.listData.length) {
        this.$message.warning("暂无学员信息！");
        return;
      }
      const param = this.listData
        .filter((item) => item.remark)
        .map(({ id, remark }) => ({
          id,
          remark,
        }));
      const data = {
        param,
        follow_id: this.$route.query?.id || "",
        next_follow_time: this.nextFollowTime,
      };
      const res = await updateFollow(data);
      if (res.code === 0) {
        this.nextFollowTime = "";
        this.getReturnVisitDetail();
        this.$message.success(res.message);
      }
    },
    // 获取回访班级信息
    async followClassroomInfo() {
      const data = {
        class_id: this.$route.query?.class_id || "",
      };
      const res = await followClassroomInfo(data);
      if (res.code === 0) {
        this.classInfo = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
      };
      this.getReturnVisitDetail();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReturnVisitDetail();
    },
    // 回访详情列表
    async getReturnVisitDetail() {
      const data = {
        page: this.pageNum,
        class_id: this.$route.query?.class_id || "",
        id: this.$route.query?.id || "",
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getReturnVisitDetail(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
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
  },
};
</script>

<style lang="scss" scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 10px;
  .info-item {
    min-width: 120px;
    margin: 0 26px 16px 0;
    &-label {
      color: #909399;
      margin-right: 8px;
    }
    &-value {
      color: #606266;
    }
  }
}
</style>
