<template>
  <section>
    <div class="head-certificates">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作
    </div>
    <section class="mainwrap">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="学生编号"
            show-overflow-tooltip
            min-width="90"
            prop="project_id"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_price"
            label="免冠正面照"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="身份证扫描件"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="毕业证扫描件"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="社保卡/居住证"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="工作年限承诺书"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="个人健康承诺书"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toTimetablePreview(scope.row)"
                  >课表预览</el-button
                >
                <!-- <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                > -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </section>
</template>

<script>
import { getCertificates } from "@/api/educational";
import SearchList from "@/components/SearchList/index";
export default {
  name: "certificates",
  components: {
    SearchList,
  },
  data() {
    return {
      schoolData: [{ project_name: "双方都浪费" }],
      searchData: {
        date: "",
        name: "",
        name1: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
          },
        },
        {
          key: "name1",
          type: "select",
          options: [
            {
              value: "1",
              label: "test",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "所属分类",
          },
        },
        {
          key: "name1",
          type: "select",
          options: [
            {
              value: "1",
              label: "test",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "所属项目",
          },
        },
        {
          key: "name1",
          type: "select",
          options: [
            {
              value: "1",
              label: "test",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "所属班级",
          },
        },
        {
          key: "name1",
          type: "select",
          options: [
            {
              value: "1",
              label: "test",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "推荐机构",
          },
        },
        {
          key: "name",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
    };
  },
  created() {
    // this.getCertificates();
  },
  methods: {
    handleSearch() {
      console.log(this.searchData);
    },
    async getCertificates() {
      const data = {};
      const res = await getCertificates(data);
      console.log(res);
    },
    toTimetablePreview() {
      this.$router.push({
        path: "/eda/timetablePreview",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head-certificates {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.head-search {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
