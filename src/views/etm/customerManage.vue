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
        <div>
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
                <h3>客户总数</h3>
                <div class="time_num">
                  {{ listTotal ? listTotal : 0 }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>报名客户</h3>
                <div class="time_num">
                  {{ analysis.total_sign ? analysis.total_sign : 0 }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>复购客户</h3>
                <div class="time_num">
                  {{
                    analysis.total_repurchase ? analysis.total_repurchase : 0
                  }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
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
          </el-col>
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
            prop="project"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div v-if="row.project">
                {{ row.project }}
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="from_organization_name"
            label="推荐机构"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div v-if="row.from_organization_name">
                {{ row.from_organization_name }}
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="渠道来源"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div v-if="row.sources">
                {{
                  field_content[row.sources]
                    ? field_content[row.sources].label
                    : ""
                }}
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="contract_status"
            label="合同状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag
                size="small"
                :type="statusMap[row.contract_status || 0].type"
              >
                {{ statusMap[row.contract_status || 0].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="250">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  @click="seebtn(row)"
                  v-if="!row.contract_status"
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
                  v-if="row.sign_url"
                  >复制签名链接</el-button
                >
                <el-button
                  type="text"
                  @click="Approval(row)"
                  v-if="row.contract_status == 1"
                  >审核</el-button
                >
                <el-button type="text" @click="toCusDetail(row)"
                  >客户详情</el-button
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
          width="25%"
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
            <el-button type="primary" @click="Entryenter">确 定</el-button>
          </span>
        </el-dialog>

        <!-- <Viewcontract v-model="viewcondialog" :id="currentId" :project="project" :template_url="template_url" /> -->

        <!--查看模板弹窗 -->
        <el-dialog
          title="查看合同"
          :visible.sync="viewcondialog"
          width="1000px"
          :close-on-click-modal="false"
          style="margin-top: -6vh"
        >
          <!-- <div class="right" style="float:right; margin-bottom:20px;">
        <el-button type="primary">发送合同链接</el-button>
        <el-button plain>生成二维码</el-button>
      </div> -->

          <div style="height: 650px; overflow: hidden; margin-top: 0">
            <iframe
              :src="sign_url"
              ref="iframe"
              type="application/x-google-chrome-pdf"
              width="1200px"
              height="800px"
              border="0"
              style="margin-top: -120px; margin-left: -10px"
            />
          </div>
          <!-- <iframe :src="sign_url" type="application/x-google-chrome-pdf" width="1150px" height="650px" border="0" /> -->
        </el-dialog>

        <Toexamine
          v-model="toexadialog"
          @on-success="getCustomerList"
          :contractInfo="contractInfo"
          :id="currentId"
        />
        <addCustomeDialog
          :innerVisible="innerVisible"
          @on-success="getCustomerList"
          v-on:innerDialog="getInnerStatus($event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { templatelist } from "@/api/system";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { generate } from "@/api/fina";
import { getproject } from "@/api/eda";
import { contractaudit } from "@/api/fina";
import { getCustomerList, getInstitutionList, getfieldinfo } from "@/api/etm";
import { cloneOptions } from "@/utils/index";
import addCustomeDialog from "./components/addCustomeDialog";
import Viewcontract from "./components/viewcontract";
import Seetemplate from "./components/seetemplate";
import Toexamine from "./components/toexadialog";

export default {
  name: "myClients",
  components: {
    addCustomeDialog,
    Viewcontract,
    Seetemplate,
    Toexamine,
  },
  data() {
    let validMail = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请填写邮箱"));
      } else {
        let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (!reg.test(value)) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
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
        category_id: "",
        date: [],
        project_id: "",
        from_org: "",
        keyword: "",
        sources: "",
        online_user: "",
        all: "",
        all_in: "",
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
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 120,
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },
        // {
        //   key: 'from_org',
        //   type: 'select',
        //   width: 120,
        //   optionValue: 'institution_id',
        //   optionLabel: 'institution_name',
        //   options: [],
        //   attrs: {
        //     clearable: true,
        //     placeholder: '推荐机构',
        //   },
        // },
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
          key: "sources",
          type: "select",
          width: 120,
          optionValue: "value",
          optionLabel: "label",
          options: [],
          attrs: {
            clearable: true,
            placeholder: "渠道来源",
          },
        },
        {
          key: "pay_status",
          type: "select",
          width: 120,
          options: [
            {
              value: "0",
              label: "待验证/等待付款 ",
            },
            {
              value: "1",
              label: "新订单/待入账/已付款",
            },
            {
              value: "2",
              label: "部分入账",
            },
            {
              value: "3",
              label: "已入账",
            },
            {
              value: "4",
              label: "已作废",
            },
            {
              value: "5",
              label: "已退款",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "成交状态",
          },
        },
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
      date: "",
      templateId: "",
      orderId: "",
    };
  },
  created() {
    this.date = this.searchData.date = this.AddDays(new Date(), 7);
    this.getCateList();
    this.getfieldinfo();
    this.getInstitutionSelectData();
    this.getCustomerList();
  },
  mounted() {
    console.log(this.date);
  },
  filters: {
    // dealType(is_verify) {
    //   if (is_verify == '1') {
    //     return '已成交'
    //   } else if (is_verify == '2') {
    //     return '已退费'
    //   } else {
    //     return '未成交'
    //   }
    // },
  },
  methods: {
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
    handleClose(done) {
      this.seetempdialog = false;
    },
    seebtn(row) {
      this.templatelist();
      this.templateId = "";
      this.orderId = row.order_id;
      this.dialogVisible = true;
    },
    // 查看合同
    seetemplate(row) {
      console.log(row);
      this.seetempdialog = true;
      this.sign_url = row.sign_url;
    },
    Entryenter() {
      this.generate();
    },
    // exambtn(row) {
    //   this.order_id = row.order_id
    //   this.project = row.project
    //   this.examdialogVisible = true
    // },
    Approval(row) {
      this.toexadialog = true;
      this.dialogTitle = "合同审核";
      this.currentId = row.order_id;
      this.contractInfo = row;
    },
    // 合同模板列表接口
    async templatelist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      const res = await templatelist(data);
      // console.log(res.data.data)
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
    async generate() {
      const data = {
        template_id: this.templateId,
        order_id: this.orderId,
      };
      // console.log(data)
      const res = await generate(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.getCustomerList();
      }
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
    AddDays(date, days) {
      var nd = new Date(date);
      var Y = nd.getFullYear();
      var M = nd.getMonth() + 1;
      var D = nd.getDate();
      if (M <= 9) M = "0" + M;
      if (D <= 9) D = "0" + D;
      var nowcdate = Y + "-" + M + "-" + D;

      nd = nd.valueOf();
      nd = nd - days * 24 * 60 * 60 * 1000;
      nd = new Date(nd);
      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      var cdate = y + "-" + m + "-" + d;
      // date = cdate + ' - ' + nowcdate
      var dateArr = [];
      dateArr.push(cdate);
      dateArr.push(nowcdate);

      return dateArr;
      // return cdate
    },

    handlePageChange(val) {
      this.pageNum = val;
      this.getCustomerList();
    },
    //客户列表
    async getCustomerList() {
      this.checkedIds = [];
      this.intent_id = "";
      console.log(this.searchData.date);
      const data = {
        page: this.pageNum,
        ...this.searchData,
        date: this.searchData.date[0] + " - " + this.searchData.date[1],
        // all: 1,
      };
      console.log(data);
      this.listLoading = true;
      const res = await getCustomerList(data);
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
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      // this.getcourseallclass(id);
      this.getproject(id);
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
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
        this.searchOptions[3].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    // 获取渠道来源
    async getfieldinfo() {
      const data = {
        field_text: "渠道来源",
      };
      const res = await getfieldinfo(data);
      if (res.code === 0) {
        let field_content = res.data.field_content.map((i, index) => {
          var obj = {};
          obj.value = index;
          obj.label = i;
          return obj;
        });
        this.searchOptions[4].options = this.field_content = field_content;
      }
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;

      this.searchData = {
        // category_id: data.category_id?.pop() || 0,
        ...data,
        from_org: data.from_org ? data.from_org.pop() : "",
        category_id: data.category_id ? data.category_id.pop() : "",
        date: times,
        // date: times[0] + ' - ' + times[1],
      };
      this.getCustomerList();
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
      this.getCustomerList();
    },

    seeview(row) {
      this.viewcondialog = true;
      // this.project = sing_url.projects
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
