<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。默认显示为<span>近7天</span>的数据,想要查看更多数据请点击搜索
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <div style="color: #909399; margin-bottom: 10px"></div>
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div class="btns">
          <el-button
            type="primary"
            style="height: 40px"
            @click="toOnlineStudents"
          >
            学生导入</el-button
          >
          <el-button type="primary" style="height: 40px" @click="addCustomer">
            添加客户</el-button
          >
        </div>
      </header>
      <el-row class="dataPanel">
        <template>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>
                  报名项目
                  <sup
                    title="已通过教务平台录入的用户项目总数"
                    class="el-icon-question"
                  ></sup>
                </h3>

                <div class="time_num">
                  {{ listTotal ? listTotal : 0 }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>
                  报名客户
                  <sup
                    title="已通过教务平台录入报读项目的用户总数"
                    class="el-icon-question"
                  ></sup>
                </h3>
                <div class="time_num">
                  {{ analysis.total_online_course || 0 }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>
                  复购客户
                  <sup
                    title="已通过教务平台二次报名项目的用户总数"
                    class="el-icon-question"
                  ></sup>
                </h3>
                <div class="time_num">
                  {{ analysis.total_repurchase || 0 }}
                </div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>订单金额</h3>
                <div class="time_num">
                  ￥{{
                    analysis.total_order_money ? analysis.total_order_money : 0
                  }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>收款金额</h3>
                <div class="time_num">
                  ￥{{
                    analysis.total_pay_money ? analysis.total_pay_money : 0
                  }}
                </div>
              </div>
            </div>
          </el-col> -->
        </template>
      </el-row>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="light"
          stripe
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
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="surname"
            label="客户姓名"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div class="surname" @click="toCusDetail(row)">
                {{ row.surname }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>
                {{ row.mobile | filterPhone }}
              </span>
              <i
                class="el-icon-document-copy copy-number"
                @click="handleCopy(row.mobile)"
                title="复制"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>
                {{ row.sex == 1 ? "男" : row.sex == 2 ? "女" : "未知" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="报读项目"
            prop="project_name"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="from_institution_name"
            label="推荐机构"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="所属老师"
            prop="staff_name"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            prop="contract_status"
            label="合同状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag
                v-if="row.order_id"
                size="small"
                :type="statusMap[row.contract_status || 0].type"
              >
                {{ statusMap[row.contract_status || 0].text }}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" fixed="right" min-width="140">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <!-- <el-button
                  type="text"
                  @click="seebtn(row)"
                  v-if="!row.contract_status && row.project_id"
                  >生成合同</el-button
                >
                <el-button
                  type="text"
                  @click="seeview(row)"
                  v-if="row.sign_url && row.contract_status"
                  >查看合同</el-button
                >
                <el-button
                  type="text"
                  @click="handleCopy(row.sign_url)"
                  v-if="
                    row.sign_url &&
                    (row.contract_status === 2 || row.contract_status === 4)
                  "
                  >复制签名链接</el-button
                > -->
                <!-- <el-button
                  type="text"
                  @click="Approval(row)"
                  v-if="row.contract_status == 1"
                  >审核</el-button
                > -->
                <el-button type="text" @click="toCusDetail(row)"
                  >客户详情</el-button
                >
                <el-button
                  v-if="row.order_id"
                  type="text"
                  @click="orderDetail(row)"
                  >订单详情</el-button
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

        <!-- 生成合同弹窗 -->
        <el-dialog
          title="生成合同"
          :visible.sync="dialogVisible"
          width="600px"
          :close-on-click-modal="false"
        >
          <el-form
            label-width="130px"
            class="info-form"
            :model="ruleForm"
            ref="ruleForm"
          >
            <el-form-item label="合同模板" prop="template_name">
              <el-select
                style="width: 300px"
                v-model="templateId"
                clearable
                placeholder="请选择合同模板"
              >
                <el-option
                  v-for="item in dictOptions"
                  :key="item.id"
                  :label="item.template_name"
                  :value="item.id"
                  class="input-width"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="success" @click="generateContract(1)"
              >预 览</el-button
            >
            <el-button type="primary" @click="generateContract(0)"
              >确 定</el-button
            >
          </span>
        </el-dialog>

        <!--查看模板弹窗 -->
        <el-dialog
          title="查看合同"
          :visible.sync="viewcondialog"
          width="1000px"
          :close-on-click-modal="false"
          style="margin-top: -6vh"
          append-to-body
        >
          <div
            style="height: 650px; width: 800px; overflow: hidden; margin-top: 0"
          >
            <iframe
              :src="sign_url"
              ref="iframe"
              type="application/x-google-chrome-pdf"
              width="1200px"
              height="800px"
              border="0"
              style="margin-top: -150px; margin-left: -150px"
            />
          </div>
        </el-dialog>

        <Toexamine
          v-model="toexadialog"
          @on-success="getProjectUserList"
          :contractInfo="contractInfo"
          :id="currentId"
        />
        <addCustomeDialog
          :innerVisible="innerVisible"
          @on-success="getProjectUserList"
          v-on:innerDialog="getInnerStatus($event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { templatelist } from "@/api/system";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { generate } from "@/api/fina";
import { getproject } from "@/api/eda";
import { getProjectUserList } from "@/api/etm";
import { getAdminSelect } from "@/api/eda";
import { cloneOptions } from "@/utils/index";
import addCustomeDialog from "./components/addCustomeDialog";
import Toexamine from "./components/toexadialog";

export default {
  name: "customerManage",
  components: {
    addCustomeDialog,
    Toexamine,
  },
  data() {
    return {
      dictOptions: [],
      contractInfo: {},
      toexadialog: false,
      template_url: "",
      rules: {
        project: [{ required: true, message: "请输入合同id", trigger: "blur" }],
        audit_type: [{ required: true, message: "请选择", trigger: "blur" }],
        audit_content: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" },
        ],
      },
      seetempdialog: false,
      dialogVisible: false,
      examdialogVisible: false,
      viewcondialog: false,
      sign_url: "",
      statusMap: {
        0: {
          text: "未生成",
          type: "danger",
        },
        1: {
          text: "未审核",
          type: "primary",
        },
        2: {
          text: "已审核",
          type: "success",
        },
        3: {
          text: "已驳回",
          type: "warning",
        },
        4: {
          text: "签署完成",
          type: "success",
        },
      },
      contract_status: "",
      currentId: "",
      project: "",
      id: "",
      analysis: {},
      innerVisible: false,
      searchData: {
        id: "",
        category_id: [],
        date: [],
        project_id: [],
        from_org: "",
        keyword: "",
        sources: "",
        online_user: "",
        all: "",
        all_in: "",
        staff_id: "",
        contract_status: "",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "from_org",
          type: "cascader",
          width: 120,
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "所属分类（多选）",
            clearable: true,
            props: {
              multiple: true,
              checkStrictly: true,
            },
            "collapse-tags": true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          width: 280,
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        // {
        //   key: "pay_status",
        //   type: "select",
        //   width: 120,
        //   options: [
        //     {
        //       value: "0",
        //       label: "待验证/等待付款 ",
        //     },
        //     {
        //       value: "1",
        //       label: "新订单/待入账/已付款",
        //     },
        //     {
        //       value: "2",
        //       label: "部分入账",
        //     },
        //     {
        //       value: "3",
        //       label: "已入账",
        //     },
        //     {
        //       value: "4",
        //       label: "已作废",
        //     },
        //     {
        //       value: "5",
        //       label: "已退款",
        //     },
        //   ],
        //   attrs: {
        //     clearable: true,
        //     placeholder: "成交状态",
        //   },
        // },
        // {
        //   key: "contract_status",
        //   type: "select",
        //   width: 120,
        //   options: [
        //     {
        //       value: "0",
        //       label: "未生成",
        //     },
        //     {
        //       value: "1",
        //       label: "未审核",
        //     },
        //     {
        //       value: "2",
        //       label: "已审核",
        //     },
        //     {
        //       value: "3",
        //       label: "已驳回",
        //     },
        //     {
        //       value: "4",
        //       label: "签署完成",
        //     },
        //   ],
        //   attrs: {
        //     clearable: true,
        //     placeholder: "合同状态",
        //   },
        // },
        {
          key: "online_user",
          type: "select",
          width: 120,
          options: [
            {
              value: "1",
              label: "网课学生",
            },
            {
              value: "0",
              label: "非网课学生",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "学生类型",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "客户姓名/手机号码",
            clearable: true,
          },
        },
      ],
      schoolData: [],
      ruleForm: {
        template_name: "",
        order_id: "",
        surname: "",
        mobile: "",
        id_card_number: "",
        sex: 0,
        birthday: "",
        marry: 0,
        qq: "",
        email: "",
        culture: "",
        province: "",
        city: "",
        from_organization_id: "",
        sources: "",
        tips: "",

        id: "",
        audit_type: 0,
        audit_content: "",
        project: "",
      },
      curstomerVisible: false,
      tabFun: [
        {
          id: 1,
          name: "全部客户",
        },
        {
          id: 2,
          name: "我的客户",
        },
      ],
      page: 1,
      status: 1,
      datas: {},
      selectData: [],
      projectData: [],
      field_content: [],
      templateId: "",
      orderId: "",
    };
  },
  created() {
    this.getCateList();
    this.getInstitutionSelectData();
    this.getProjectUserList();
    this.getAdminSelect();
    this.getproject();
  },

  methods: {
    orderDetail(row) {
      this.$router.push({
        name: "orderdetail",
        query: {
          order_id: row.order_id,
        },
      });
    },
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
    seebtn(row) {
      this.templatelist();
      this.templateId = "";
      this.orderId = row.order_id;
      this.dialogVisible = true;
    },
    Approval(row) {
      this.toexadialog = true;
      this.dialogTitle = "合同审核";
      this.currentId = row.order_id;
      this.contractInfo = row;
    },
    // 合同模板列表接口
    async templatelist() {
      const res = await templatelist();
      if (res.code == 0) {
        this.dictOptions = res.data.data;
        console.log(this.dictOptions);
      }
    },

    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.category_id;
        newData[index].label = item.category_name;
        if (item.son && item.son.length) {
          newData[index].children = [];
          this.cloneData(item.son, newData[index].children);
        }
      });
    },

    // 生成合同接口
    async generateContract(preview) {
      const data = {
        template_id: this.templateId,
        order_id: this.orderId,
        preview,
      };
      // console.log(data)
      const res = await generate(data);
      if (res.code == 0) {
        console.log(res);
        if (preview) {
          this.seeview(res.data);
        } else {
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.getProjectUserList();
        }
      }
    },

    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectUserList();
    },
    //客户列表
    async getProjectUserList() {
      this.checkedIds = [];
      this.intent_id = "";
      console.log(this.searchData.date);
      const data = {
        page: this.pageNum,
        ...this.searchData,
        date: this.searchData.date[0]
          ? this.searchData.date[0] + " - " + this.searchData.date[1]
          : "",
        category_id: this.searchData.category_id.join(","),
        project_id: this.searchData.project_id.join(","),
      };
      this.listLoading = true;
      const res = await getProjectUserList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.analysis = res.data.analysis[0];
      this.listTotal = res.data.total;
    },
    toCusDetail(ab) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid: ab.uid,
        },
      });
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[3].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },

    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
      }
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;

      this.searchData = {
        ...data,
        from_org: data.from_org ? data.from_org.pop() : "",

        date: times,
      };
      this.getProjectUserList();
    },
    toOnlineStudents() {
      this.$router.push({
        path: "/etm/onlineStudents",
      });
    },

    //保存
    preserve(formName, num) {
      //没有自动填充生日
      if (this.ruleForm.birthday == "") {
        this.ruleForm.birthday = getBirth(this.ruleForm.id_card_number);
      }
      //没有自动填充性别
      if (this.ruleForm.sex == "") {
        this.ruleForm.sex = getSex(this.ruleForm.id_card_number);
      }
    },

    toCustomeRegist() {
      this.$router.push({
        path: "/etm/customeRegist",
      });
    },
    getInnerStatus(status) {
      this.innerVisible = status;
    },
    addCustomer() {
      this.innerVisible = true;
    },
    doPageChange(page) {
      this.page = page;
      this.getProjectUserList();
    },

    seeview(row) {
      this.viewcondialog = true;
      this.sign_url = row.sign_url;
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.el-input__inner {
  // width: 240px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.input-width {
  width: 240px;
}
.surname {
  color: #199fff;
  cursor: pointer;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  .btns {
    flex-shrink: 0;
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
  span {
    color: #199fff;
  }
}
.customer_navigation {
  width: 133px;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 14px;
    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.dataPanel {
  margin-top: 20px;
}
.el-col-lg-4-8 {
  width: 20%;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  h3 {
    font-weight: 400;
    font-style: normal;
    color: #606266;
    text-align: center;
    sup {
      color: #ddd;
    }
  }
  .time_num {
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-family: "Microsoft YaHei UI", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    color: #606266;
    text-align: center em {
      font-size: 20px;
    }
  }
}
.flexfr {
  display: flex;
  justify-content: flex-end;
}
.table_bottom {
  text-align: right;
}
.copy-number {
  color: #199fff;
  cursor: pointer;
  margin-left: 8px;
}
.colorgreen {
  color: green;
}
.colored {
  color: red;
}
</style>
