<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="listData"
      style="width: 100%"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      height="534"
    >
      <el-table-column label="序号" width="70" type="index"> </el-table-column>
      <el-table-column label="用户名" min-width="140">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.nickname"
            placeholder="请输入用户姓名"
            maxlength="30"
          />
        </template>
      </el-table-column>
      <el-table-column label="手机号码" min-width="140">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.mobile"
            placeholder="请输入手机号码"
            maxlength="30"
          />
        </template>
      </el-table-column>
      <el-table-column label="登录密码" min-width="140">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.password"
            placeholder="请输入登录密码"
            maxlength="30"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否超管" min-width="100">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.is_master"
            active-color="#2798ee"
            inactive-color="#eaeefb"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="{ $index: index }">
          <el-button type="text" @click="handleAdd">添加</el-button>
          <el-button
            type="text"
            @click="handleDel(index)"
            :disabled="listData.length < 2"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="actions">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button class="cancel" @click="hanldeClose">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { createInstitutionUser } from "@/api/institution";
export default {
  name: "AddInstitutionUser",
  props: {
    institutionId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [
        {
          nickname: "",
          mobile: "",
          password: "",
          is_master: 0,
        },
      ],
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleAdd() {
      this.listData.push({
        nickname: "",
        mobile: "",
        password: "",
        is_master: 0,
      });
    },
    handleDel(index) {
      this.listData.splice(index, 1);
    },
    hanldeClose() {
      this.$emit("close");
    },
    handlePrev() {
      this.$emit("prev");
    },
    validataPhone(rule, value, callback) {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    },

    async submit() {
      const data = {};
      this.addLoading = true;
      const res = await createInstitutionUser(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
.actions {
  display: flex;
  margin-top: 16px;
  .cancel {
    margin-left: auto;
  }
}
</style>