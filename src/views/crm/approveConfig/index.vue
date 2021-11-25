<template>
  <div class="approve-config">
    <div class="head_remind">*本模块用于设置订单的审批流程</div>
    <el-tabs class="tab" v-model="type" @tab-click="getApproveConfig">
      <el-tab-pane label="订单审批" name="1"></el-tab-pane>
      <el-tab-pane label="回款审批" name="2"></el-tab-pane>
      <el-tab-pane label="异动审批" name="3"></el-tab-pane>
    </el-tabs>
    <div class="container" v-loading="loading">
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
                <el-radio :label="2" v-if="type != 2"
                  >部门主管（任意一人）</el-radio
                >
                <el-radio :label="4">指定用户（任意一人）</el-radio>
                <el-radio :label="0" v-if="row.level !== 1">无</el-radio>
              </el-radio-group>
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
      listData: [],
      staffOptions: [],
      loading: false,
      saveLoding: false,
      type: "1",
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
          params.staff_id = "";
          if (params.type === 4) {
            if (!multiple.length) {
              this.$message.error("请选择指定用户");
              throw new Error("请选择指定用户");
            }
            params.staff_id = multiple.join(",");
          }
          params.bind_id = this.type;
          return params;
        }
      );
      const data = {
        arr,
        bind_id: this.type,
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
        bind_id: this.type,
      };
      const res = await getApproveConfig(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.listData = res.data.list.map((item) => {
          return {
            ...item,
            multiple:
              item.type === 4
                ? item.staff_id.split(",").map((staff_id) => +staff_id)
                : [],
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
