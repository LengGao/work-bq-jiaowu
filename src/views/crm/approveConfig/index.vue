<template>
  <div class="approve-config">
    <div class="head_remind">*本模块用于设置订单的审批流程</div>
    <div class="container">
      <Title text="审批开关" class="switch">
        <el-switch v-model="value"> </el-switch>
      </Title>
      <p class="tips">
        *开启审批后，数据看板只统计审批通过的订单业绩，并进行数据展示；
      </p>
      <p class="tips">
        *关闭审批后，系统将自动通过所有未审批完成的订单，数据看板统计所有的订单业绩；
      </p>
      <!--表格-->
      <div class="table">
        <el-table :data="listData" border>
          <el-table-column
            label="审批级别"
            min-width="160"
            align="center"
            prop="name"
          >
          </el-table-column>
          <el-table-column prop="has_question" label="审批人" min-width="400">
            <template slot-scope="{ row }">
              {{ row.checked }}
              <el-radio-group
                v-model="row.value"
                @change="(row.single = ''), (row.multiple = [])"
              >
                <el-radio :label="1">老板</el-radio>
                <el-radio :label="2">部门主管（任意一人）</el-radio>
                <el-radio :label="3">指定用户（任意一人）</el-radio>
                <el-radio :label="4">指定用户（多人会签）</el-radio>
              </el-radio-group>
              <div style="padding: 10px" v-if="row.value !== 1 && row.value">
                <el-select
                  :key="row.value"
                  v-if="row.value === 4"
                  v-model="row.multiple"
                  clearable
                  filterable
                  multiple
                  placeholder="请选择"
                  style="width: 400px"
                >
                  <el-option
                    v-for="item in staffOptions"
                    :key="item.staff_id"
                    :label="item.staff_name"
                    :value="item.staff_id"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-else
                  :key="row.value"
                  v-model="row.single"
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in staffOptions"
                    :key="item.staff_id"
                    :label="item.staff_name"
                    :value="item.staff_id"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="submit">
        <el-button type="primary">保存设置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffList,
  updateStaffStatus,
  getDepartmentlists,
  delDepartment,
} from "@/api/set";
export default {
  name: "approveConfig",
  data() {
    return {
      value: true,
      listData: [
        {
          name: "一级审批",
          value: "",
          single: "",
          multiple: [],
        },
        {
          name: "二级审批",
          value: "",
          single: "",
          multiple: [],
        },
      ],
      staffOptions: [],
    };
  },

  created() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
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
}
.switch {
  display: flex;
  align-items: center;
  /deep/.text {
    margin-right: 10px;
  }
}
.tips {
  color: #999;
  font-size: 14px;
}
.table {
  margin-top: 20px;
}
.submit {
  width: 100%;
  padding-top: 100px;
  text-align: center;
  button {
    width: 200px;
  }
}
</style>
