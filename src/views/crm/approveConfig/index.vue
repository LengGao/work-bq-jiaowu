<template>
  <div class="approve-config">
    <div class="head_remind">*本模块用于设置订单的审批流程</div>
    <el-tabs class="tab" v-model="type" @tab-click="getApproveConfig">
      <el-tab-pane label="订单审批" name="order_review"></el-tab-pane>
      <el-tab-pane label="回款审批" name="receivable_review"></el-tab-pane>
      <el-tab-pane label="异动审批" name="move_review"></el-tab-pane>
    </el-tabs>
    <div class="container" v-loading="loading">
      <Title text="审批开关" class="switch">
        <el-switch
          v-model="status"
          @change="setApproveConfig"
          active-value="1"
          inactive-value="0"
        >
        </el-switch>
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
              <el-radio-group
                v-model="row.type"
                @change="handleRadioChange(row)"
              >
                <el-radio :label="1">老板</el-radio>
                <el-radio :label="2">部门主管（任意一人）</el-radio>
                <el-radio :label="3">指定用户（任意一人）</el-radio>
                <el-radio :label="4">指定用户（多人会签）</el-radio>
              </el-radio-group>
              <div style="padding: 10px" v-if="row.type !== 1 && row.type">
                <el-select
                  :key="row.type"
                  v-if="row.type === 4"
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
                  :key="row.type"
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
        <el-button
          type="primary"
          :loading="saveLoding"
          @click="setApproveConfig"
          >保存设置</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getStaffList } from "@/api/set";
import { setApproveConfig, getApproveConfig } from "@/api/crm";
export default {
  name: "approveConfig",
  data() {
    return {
      status: "",
      listData: [],
      staffOptions: [],
      loading: false,
      saveLoding: false,
      type: "order_review",
      nameMap: {
        1: "一级审批",
        2: "二级审批",
        3: "三级审批",
        4: "四级审批",
        5: "五级审批",
        6: "六级审批",
      },
    };
  },

  created() {
    this.getStaffList();
    this.getApproveConfig();
  },
  methods: {
    async setApproveConfig() {
      const arr = this.listData.map(
        ({ multiple, single, name, id, ...params }) => {
          if (params.type === 4) {
            params.staff_id = multiple.join(",");
          } else {
            // type=1时 staff_id置为0
            params.staff_id = params.type === 1 ? 0 : single;
          }
          return params;
        }
      );
      const data = {
        arr,
        status: this.status,
        type: this.type,
      };
      this.saveLoding = true;
      const res = await setApproveConfig(data).catch(() => {});
      this.saveLoding = false;
      this.getApproveConfig();
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    handleRadioChange(row) {
      row.single = "";
      row.multiple = [];
      row.type === 1 && (row.staff_id = 0);
    },
    async getApproveConfig() {
      this.loading = true;
      const data = {
        type: this.type,
      };
      const res = await getApproveConfig(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.status = res.data.switch.content;
        this.listData = res.data.list.map((item) => {
          return {
            ...item,
            multiple:
              item.type === 4
                ? item.staff_id.split(",").map((staff_id) => +staff_id)
                : [],
            single: item.type !== 4 ? +item.staff_id : "",
            name: this.nameMap[item.level],
          };
        });
      }
    },
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
.tab {
  margin: 20px 20px 0;
}
</style>
