<template>
  <section class="mainwrap">
    <div class="client_head">
      <!-- <search2
        :contentShow="true"
        api="getHomeclassifiList"
        inputText="分类名称"
        @getTable="getTableList"
      ></search2> -->
      <div></div>
      <div>
        <el-button type="primary" @click="addMenu">添加菜单</el-button>
        <el-button type="success" @click="addFunction">添加功能</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        row-key="id"
        style="width: 100%"
        :tree-props="{ children: 'children' }"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="菜单名称"
          show-overflow-tooltip
          min-width="120"
          prop="menu_name"
        >
        </el-table-column>
        <el-table-column label="排序" min-width="60" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-col :span="12" v-if="scope.row.menu_type == 1">
              <el-input
                style="width: 56px"
                v-model="scope.row.sort"
                placeholder
                size="small"
                @blur="scopes(scope.row.id, scope.row.sort)"
              ></el-input>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="menu_type_name"
          label="类型"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="icon"
          label="菜单图标"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }" v-if="row.menu_type == 1">
            <i :class="['iconfont', row.icon]" style="font-size: 22px"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="auth"
          label="接口地址"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="node"
          label="前端标识"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="index_category_name"
          label="启用状态"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <el-switch :active-value="1" :inactive-value="0"></el-switch> -->
            <el-switch
              v-model="scope.row.menu_status"
              :active-value="1"
              :inactive-value="0"
              @change="switchStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="index_category_name"
          label="是否在菜单显示"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <!-- <el-switch :active-value="1" :inactive-value="0"></el-switch> -->
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="row.show_at_list"
              @change="updateShowStatus(row)"
            ></el-switch>
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
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
    </div>
    <!--弹框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="576px"
    >
      <el-form label-width="100px">
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="parent_id_arr"
            :options="ThumbData"
            :props="optionProps"
            clearable
            @change="checkDepart"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          :label="ruleForm.menu_type == 1 ? '菜单名称' : '功能名称'"
        >
          <el-input
            :placeholder="
              ruleForm.menu_type == 1 ? '请输入菜单名称' : '请输入功能名称'
            "
            v-model="ruleForm.menu_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="ruleForm.menu_type == 1">
          <div class="form-select-icon">
            <i
              v-if="ruleForm.icon"
              style="font-size: 40px; margin-right: 10px"
              class="iconfont"
              :class="ruleForm.icon"
            ></i>
            <el-button @click="iconDialog = true">选择图标</el-button>
          </div>
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input
            placeholder="请输入接口地址"
            v-model="ruleForm.auth"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="前端标识">
          <el-input
            placeholder="请输入前端标识"
            v-model="ruleForm.node"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="切换功能" prop="resource">
          <el-radio-group v-model="ruleForm.menu_type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="0">功能</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="菜单排序"
          prop="sort"
          v-if="ruleForm.menu_type == 1"
        >
          <el-input
            placeholder="请输入菜单排序"
            v-model="ruleForm.sort"
            class="input-width"
            type="number"
          ></el-input>
          <p style="color: #aaa; ling-height: 20px">
            排序数字越大分类越靠前,最小值为1
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">保 存</el-button>
      </span>
    </el-dialog>
    <!-- <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog> -->
    <el-dialog
      title="选择图标"
      :visible.sync="iconDialog"
      width="400px"
      top="30px"
      class="grant-teach-materials"
    >
      <ul class="icon-list">
        <li
          v-for="(icon, index) in iconList"
          :key="index"
          :class="icon === ruleForm.icon ? 'active' : ''"
          @click="handleIconChange(icon)"
        >
          <i :class="['iconfont', icon]"></i>
        </li>
      </ul>
    </el-dialog>
  </section>
</template>

<script>
import { createMenuData, updateMenuData, updateShowStatus } from "@/api/login";
import { createUserRouter } from "@/router";
export default {
  data() {
    return {
      funShow: false,
      parent_id_arr: [],
      nameLabel: "",
      nameInputword: "",
      optionProps: {
        label: "menu_name",
        value: "id",
        children: "children",
        checkStrictly: true,
      },
      menu_status: "",
      ruleForm: {
        id: "",
        menu_name: "",
        parent_id: [],
        node: "",
        auth: "",
        icon: "",
        sort: "",
        menu_type: "",
      },
      schoolData: [],
      ThumbData: [],
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
      iconList: [
        "iconzuijin1",
        "icon21zhangjielianxi",
        "icon20meiridaka",
        "icon23shuatitiaozhan",
        "icon18dingdanguanli",
        "icon06shouyefenlei",
        "icon26kechenglubo",
        "icon24monikaoshi",
        "icon25zizhuchuti",
        "icon29jigouxueyuan",
        "icon27zhibohuigu",
        "icon22linianzhenti",
        "icon34xiaoxihudong",
        "icon33pc",
        "icon28mianshouyueke",
        "icon30tupiankongjian",
        "icon19caozuorizhi",
        "iconshuiyin",
        "icon32xiaochengxu",
        "icon01wodekehu",
        "icon05kechengfenlei",
        "icon04kehuziduan",
        "icon08tikuguanli",
        "icon02gonghaixueyuan",
        "icon09kaoshipeizhi",
        "icon07shipinguanli",
        "icon03chaxunxueyuan",
        "icon10zhiboguanli",
        "icon11kechengguanli",
        "icon13xueyuanguanli",
        "icon16jiaoseguanli",
        "icon17yuangongguanli",
        "icon14banjiguanli",
        "icon15mianshouyueke",
      ],
      iconDialog: false,
    };
  },
  mounted() {
    this.$api.getMenuList(this, "schoolData");
    this.$api.getThumbMenuList(this, "ThumbData");
  },
  created() {
    // this.$api.getHomeclassifiList(this, 'schoolData')
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  methods: {
    handleIconChange(icon) {
      this.ruleForm.icon = icon;
      this.iconDialog = false;
    },
    checkDepart(ab) {
      console.log(ab);
      let end = ab[ab.length - 1];
      console.log(end);
      // this.ruleForm.parent_id = end
    },
    switchStatus(ab) {
      this.menu_status = ab.menu_status;
      this.ruleForm.id = ab.id;
      this.$api.updateStatus(this, this.ruleForm);
    },
    // doPageChange(page) {
    //   this.page = page
    //   this.$api.getHomeclassifiList(this, 'schoolData', this.datas)
    // },
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
      console.log(zx);
      this.$api.getThumbMenuList(this, "ThumbData");
      this.ruleForm.menu_type = zx.menu_type;
      if (this.ruleForm.menu_type == 1) {
        this.dialogTitle = "编辑菜单";
      } else {
        this.dialogTitle = "编辑功能";
      }

      this.ruleForm.id = zx.id;
      this.dialogVisible = true;
      this.$api.getMenuDetail(this, zx.id);
      console.log(this.ruleForm);
    },
    scopes(id, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
      var re = new RegExp(regu);
      if (!re.test(sorts)) {
        this.$message.error("请输入正确的排序！");
        return false;
      } else {
        this.$api.updateSort(id, sorts, this);
      }
    },

    delbtn(ab) {
      var warnTitle = "";
      ab.menu_type == 1
        ? (warnTitle = "确定要删除当前菜单吗?")
        : (warnTitle = "确定要删除当前功能吗?");
      this.$confirm(warnTitle, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.deleteMenuData(this, ab.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    addFunction() {
      this.$api.getThumbMenuList(this, "ThumbData"); //获取下拉数据
      //添加功能按钮
      this.dialogTitle = "添加功能";
      this.nameLabel = "功能名称";
      this.nameInputword = "请输入功能名称";
      // this.funShow = true
      this.parent_id_arr = [];
      for (let key in this.ruleForm) {
        this.ruleForm[key] = "";
      }

      this.ruleForm.menu_type = 0;
      this.dialogVisible = true;
    },
    addMenu() {
      // this.funShow = false
      this.$api.getThumbMenuList(this, "ThumbData"); //获取下拉数据
      //添加菜单按钮
      this.dialogTitle = "添加菜单";
      this.nameLabel = "菜单名称";
      this.nameInputword = "请输入菜单名称";
      this.parent_id_arr = [];
      for (let key in this.ruleForm) {
        this.ruleForm[key] = "";
      }
      this.ruleForm.menu_type = 1;

      this.dialogVisible = true;
    },
    // 更新路由+菜单
    updateRouter() {
      this.$store.dispatch("setRouterAndMenu");
    },
    // 是否中菜单中展示
    async updateShowStatus(row) {
      const data = {
        id: row.id,
        show_at_list: row.show_at_list,
      };
      const res = await updateShowStatus(data).catch(() => {
        row.show_at_list = row.show_at_list ? 0 : 1;
      });
      if (res?.code === 0) {
        this.$message.success("菜单状态修改成功！");
        this.$api.getMenuList(this, "schoolData");
        this.updateRouter();
      }
    },
    async handleConfirm() {
      console.log(this.parent_id_arr);
      const api = this.ruleForm.id ? updateMenuData : createMenuData;
      if (Array.isArray(this.parent_id_arr)) {
        let end = this.parent_id_arr[this.parent_id_arr.length - 1]; //添加时取最后一位为父级
        let start = this.parent_id_arr[0]; //编辑时取第一位为父级
        if (!this.ruleForm.id) {
          this.ruleForm.parent_id = end;
        } else {
          this.ruleForm.parent_id = end;
        }
      }
      const data = {
        ...this.ruleForm,
      };
      const res = await api(data);
      if (res.code === 0) {
        this.dialogVisible = false;
        this.$message.success(
          `菜单${this.ruleForm.id ? "修改" : "新增"}成功！`
        );
        this.$api.getMenuList(this, "schoolData");
        this.updateRouter();
      }

      // if (this.ruleForm.id != "" && this.ruleForm.id != undefined) {
      //   this.$api.updateMenuData(this, this.ruleForm);
      // } else {
      //   let end = this.parent_id_arr[this.parent_id_arr.length - 1]; //添加时取最后一位为父级
      //   this.ruleForm.parent_id = end;
      //   this.$api.createMenuData(this, this.ruleForm);
      // }
    },
    // clearUrl() {

    //   this.pictureVisible = false
    // },
    // closeImg(radioUrl) {
    //   // console.log(radioUrl + '我好睡')
    //   this.pictureVisible = false
    //   if (radioUrl != undefined) {
    //     this.haschoose = true
    //     this.url = radioUrl
    //   } else {
    //     this.url = ''
    //     this.haschoose = false
    //   }
    // },
    // addIcon() {
    //   this.pictureVisible = true
    // },
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
.form-select-icon {
  display: flex;
  align-items: center;
}
.icon-list {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50px;
    text-align: center;
    border: 2px solid #fff;
    .iconfont {
      font-size: 40px;
      cursor: pointer;
      &:hover {
        color: #199fff;
      }
    }
    &.active {
      border-color: #199fff;
      border-radius: 10px;
      .iconfont {
        color: #199fff;
      }
    }
  }
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
</style>
