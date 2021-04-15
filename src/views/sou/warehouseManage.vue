<template>
  <div>
    <div class="head_remind">*管理不同机构的仓库和仓库出入库。</div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openAdd">添加仓库</el-button>
        </div>
      </div>
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
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="storage_name"
            label="仓库名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="关联机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="number"
            label="教材总数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_price"
            label="是否启用"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                @change="editstorage(row)"
                v-model="row.status"
                :active-value="1"
                :inactive-value="2"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="300">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="openPutStorage(row.id)"
                  >入库</el-button
                >
                <el-button type="text" @click="openAllocation(row.id)"
                  >调拨</el-button
                >

                <el-button type="text" @click="link(row.id, 'textbookDetails')"
                  >教材详情</el-button
                >
                <el-button type="text" @click="link(row.id, 'storageLog')"
                  >仓库日志</el-button
                >
              </div>
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
    <!-- 添加仓库 -->
    <AddWarehouse
      v-model="addDialog"
      :title="dialogTitle"
      :selectData="selectData"
      :id="currentId"
      @on-success="getStorageList"
    />
    <!-- 入库 -->
    <PutInStorage
      v-model="putDialog"
      :id="currentId"
      @on-success="getStorageList"
    />
    <!-- 调拨 -->
    <AllocationStorage
      v-model="allocationDialog"
      :id="currentId"
      @on-success="getStorageList"
    />
  </div>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import AddWarehouse from "./components/AddWarehouse";
import PutInStorage from "./components/PutInStorage";
import AllocationStorage from "./components/AllocationStorage";
import {
  getStorageList,
  getInstitutionSelectData,
  editstorage,
} from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  components: {
    SearchList,
    AddWarehouse,
    PutInStorage,
    AllocationStorage,
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
            filterable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "仓库名称",
          },
        },
      ],
      addDialog: false,
      dialogTitle: "添加仓库",
      currentId: "",
      selectData: [],
      putDialog: false,
      allocationDialog: false,
    };
  },

  created() {
    this.getStorageList();
    this.getInstitutionSelectData();
  },

  methods: {
    //修改仓库状态
    async editstorage(row) {
      const data = {
        storage_id: row.id,
        status: row.status,
      };
      const res = await editstorage(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(
          `仓库 ${row.storage_name} 已${row.status === 1 ? "启" : "禁"}用`
        );
      }
    },
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.selectData = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    link(id, name) {
      this.$router.push({ name, query: { id } });
    },
    openAllocation(id) {
      this.currentId = id;
      this.allocationDialog = true;
    },
    openPutStorage(id) {
      this.currentId = id;
      this.putDialog = true;
    },
    openEdit(id) {
      this.dialogTitle = "编辑仓库";
      this.currentId = id;
      this.addDialog = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加仓库";
      this.addDialog = true;
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getStorageList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStorageList();
    },
    async getStorageList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        organization_id: this.searchData.organization_id.pop(),
      };
      this.listLoading = true;
      const res = await getStorageList(data);
      this.listLoading = false;
      this.listData = res.data.data;
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
.input-width {
  width: 240px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  text-align: right;
}
</style>
