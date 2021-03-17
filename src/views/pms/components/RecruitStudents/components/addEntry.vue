<template>
  <el-dialog
    title="设置常用入口"
    :visible.sync="visible"
    width="60%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="getMenuList"
  >
    <div class="add-entry" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="tab.menu_name"
          :name="index + ''"
          v-for="(tab, index) in entryData"
          :key="index"
        >
          <ul class="entry-list">
            <li v-for="(item, cIndex) in tab.children" :key="cIndex">
              <span>{{ item.menu_name }}</span>
              <el-switch v-model="item.selected"> </el-switch>
            </li>
            <li v-if="!tab.children.length" class="no-data">暂无数据</li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuList } from "@/api/workbench";
export default {
  name: "AddEntry",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeName: "0",
      entryData: [],
      loading: false,
    };
  },
  methods: {
    getIds(arr) {
      const ids = [];
      arr.forEach((item) => {
        item.children.forEach((chid) => {
          if (chid.selected) {
            ids.push(chid.id);
          }
        });
      });
      console.log(ids);
      return ids;
    },
    handleOk() {
      const ids = this.getIds(this.entryData);
      this.$emit("on-ok", ids);
      this.$emit("update:visible", false);
    },
    handleCancel() {
      this.$emit("update:visible", false);
    },
    handleClick(val) {
      console.log(val);
    },
    async getMenuList() {
      this.loading = true;
      const res = await getMenuList();
      this.loading = false;
      this.entryData = res.data || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.add-entry {
  height: 350px;
  .entry-list {
    height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    li {
      width: 160px;
      margin-right: 16px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      span {
        margin-right: 6px;
      }
    }
    li.no-data {
      display: block;
      font-size: 12px;
      color: #c0c4cc;
      text-align: center;
      width: 100%;
      padding-top: 100px;
    }
  }
}
</style>