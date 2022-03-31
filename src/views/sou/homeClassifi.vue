<template>
  <section class="mainwrap">
    <div class="client_head">
      <search2
        :contentShow="true"
        api="getHomeclassifiList"
        inputText="分类名称"
        @getTable="getTableList"
      ></search2>
      <el-button type="primary" @click="addClassiFion">添加分类</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="分类排序"
          show-overflow-tooltip
          min-width="90"
          prop="index_category_id"
        >
        </el-table-column>
        <el-table-column
          prop="index_category_name"
          label="分类名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="mobile"
          label="分类描述"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          prop="index_category_icon"
          label="分类图标"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div style="margin: 0 auto; width: 50px; height: 50px">
              <img
                :src="scope.row.index_category_icon"
                alt
                class="school_class_box"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-col :span="12">
              <el-input
                v-model="scope.row.sort"
                placeholder
                size="small"
                @blur="scopes(scope.row.index_category_id, scope.row.sort)"
              ></el-input>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="topayment(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                style="padding-left: 40px"
                @click="delbtn(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <!--弹框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="576px"
      :close-on-click-modal="false"
    >
      <el-form label-width="100px">
        <el-form-item label="分类名称：">
          <el-input
            placeholder="请输入分类名称"
            v-model="addClassify.index_category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类描述：">
          <el-input v-model="addClassify.describe"
                    class="input-width"></el-input>
        </el-form-item> -->
        <el-form-item label="分类图标：" style>
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon"></div>
            <div style="color: #aaa; ling-height: 20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class="imageBox">
            <i class="iconjia el-icon-plus" @click="addIcon"></i>
            <img
              style="width: 100%; height: 100%; border-radius: 3px"
              :src="url"
              alt=""
            />
          </div>
        </el-form-item>
        <el-form-item label="分类图排序：">
          <el-input
            v-model="addClassify.sort"
            class="input-width"
            type="number"
            @mousewheel.native.prevent
          ></el-input>
          <p style="color: #aaa; ling-height: 20px">
            排序数字越大分类越靠前,最小值为1
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [],
      index_category_id: "",
      dialogTitle: "",
      addClassify: {
        index_category_name: "",
        sort: "",
      },
      datas: {},
      url: "",
      pictureVisible: false,
      haschoose: false,
      page: 1,
      dialogVisible: false,
    };
  },
  // mounted() {
  //   this.$api.getMyclient(this, 'myclient', status)
  // },
  created() {
    this.$api.getHomeclassifiList(this, "schoolData");
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  methods: {
    doPageChange(page) {
      this.page = page;
      this.$api.getHomeclassifiList(this, "schoolData", this.datas);
    },
    // 获取数据
    getTableList(state, val, datas) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
        this.datas = datas;
      } else if (state == "data") {
        this.schoolData = val;
      }
    },
    topayment(zx) {
      this.dialogTitle = "编辑首页分类";
      console.log(zx);
      this.dialogVisible = true;
      this.haschoose = true;
      this.index_category_id = zx.index_category_id;
      this.$api.getHomeclassifiDetail(this, this.index_category_id);
      // this.$router.push(
      //   { path: '/etm/payMent', query: { id: 'row.id' } }
      // )
    },
    scopes(index_category_id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
      var re = new RegExp(regu);
      if (!re.test(sorts)) {
        this.$message.error("请输入正确的排序！");
        return false;
      } else {
        this.$api.updateHomeClassifiSort(index_category_id, sorts, this);
      }
    },
    delbtn(id) {
      this.$confirm("确定要删除当前分类吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.deleteHomeclassifi(id, this);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addClassiFion() {
      this.dialogTitle = "添加首页分类";
      for (let key in this.addClassify) {
        this.addClassify[key] = "";
      }
      this.url = "";
      this.haschoose = false;
      this.dialogVisible = true;
    },
    handleConfirm() {
      console.log(this.index_category_id == "");
      if (this.index_category_id == "" || this.index_category_id == undefined) {
        this.$api.addHomeCategory(this, "addClassify");
      } else {
        this.$api.modifyHomeCategory(this, this.index_category_id);
      }
    },
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false;
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false;
      if (radioUrl != undefined) {
        this.haschoose = true;
        this.url = radioUrl;
      } else {
        this.url = "";
        this.haschoose = false;
      }
    },
    addIcon() {
      this.pictureVisible = true;
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
  width: 280px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
</style>
