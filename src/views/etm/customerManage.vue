<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <div class="mainPart">
      <!-- <ul class="customer_navigation">
        <li v-for="item in tabFun" :key="item.id">{{ item.name }}</li>
      </ul> -->
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button
            type="primary"
            style="height:40px"
            @click="toOnlineStudents"
          >
            学生导入</el-button
          >
          <el-button type="primary" style="height:40px" @click="addCustomer">
            添加客户</el-button
          >
        </div>
      </header>
      <el-row class="dataPanel" style="">
        <template>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>客户总数</h3>
                <div class="time_num">
                  {{ analysis.total_count }}
                  <!-- <span>{{ panelData.day }}</span -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>报名客户</h3>
                <div class="time_num">
                  {{ analysis.total_refund_money }}
                  <!-- <span>{{ panelData.use_time }}</span> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>复购客户</h3>
                <div class="time_num">
                  {{ analysis.total_repurchase }}
                  <!-- <span>{{ panelData.total_problem }}</span> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>订单金额</h3>
                <div class="time_num">
                  {{ analysis.total_order_money }}
                  <!-- <span>{{ panelData.accuracy }}</span
                  ><em>%</em> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="{ span: '4-8' }">
            <div class="timeCard">
              <div>
                <h3>汇款金额</h3>
                <div class="time_num">
                  {{ analysis.total_pay_money }}
                  <!-- <span>{{ panelData.accuracy }}</span
                  ><em>%</em> -->
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
          :data="schoolData.list"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
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
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="报读项目"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="from_organization_name"
            label="推荐机构"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="sources"
            label="渠道来源"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            label="成交状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.is_verify | dealType }}
            </template>
          </el-table-column> -->
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="toCusDetail(scope.row)"
                  >客户详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="pageNum"
            @pageChange="doPageChange"
          />
        </div>
        <!--添加客户弹框--->

        <el-dialog
          title="添加客户"
          :visible.sync="curstomerVisible"
          width="70%"
          style="min-width:1070px"
        >
          <el-form
            label-width="110px"
            class="demo-ruleForm"
            :show-message="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-row>
              <el-col :lg="8">
                <el-form-item label="客户姓名" prop="surname">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.surname"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="手机号码" prop="mobile">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.mobile"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="备用号码" prop="name">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="身份证号" prop="id_card_number">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.id_card_number"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="婚姻状况" prop="marry">
                  <el-radio-group v-model="ruleForm.marry">
                    <el-radio :label="2">未婚</el-radio>
                    <el-radio :label="1">已婚</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="ruleForm.birthday"
                    type="date"
                    format="yyyy-MM-dd "
                    value-format="yyyy-MM-dd "
                    class="input-width"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="QQ" prop="qq">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.qq"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="邮箱地址" prop="email">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.email"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="文化程度" prop="culture">
                  <!-- <el-input
                   class="input-width"
                    v-model="ruleForm.culture"
                  ></el-input> -->
                  <el-select
                    v-model="ruleForm.value"
                    placeholder="请选择文化程度"
                    class="input-width"
                  >
                    <el-option
                      v-for="item in cultures"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="籍贯" prop="province">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.province"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="常住地" prop="city">
                  <el-input
                    class="input-width"
                    v-model="ruleForm.city"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="推荐机构" prop="from_organization_id">
                  <el-input
                    class="input-width"
                    placeholder="请选择推荐机构"
                    v-model="ruleForm.from_organization_id"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="渠道来源" prop="sources">
                  <el-input
                    class="input-width"
                    placeholder="请选择渠道来源"
                    v-model="ruleForm.sources"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="8">
                <el-form-item label="是否跨区报考" prop="name">
                  <el-input
                   class="input-width"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-form-item label="备注信息" prop="tips">
                <el-input v-model="ruleForm.tips" type="textarea"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <!-- <span>这是一段信息</span> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="curstomerVisible = false">取 消</el-button>
            <el-button type="primary" @click="preserve('ruleForm')"
              >保 存</el-button
            >
            <el-button type="primary" @click="preserve('ruleForm', 2)"
              >保存并报名</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { getBirth, getSex } from '@/utils/index'
import { getCateList } from '@/api/sou'
export default {
  name: 'myClients',

  data() {
    let validMail = (rule, value, callback) => {
      if (value == '' || value == undefined) {
        callback(new Error('请填写邮箱'))
      } else {
        let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
        if (!reg.test(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
    }
    return {
      analysis: {},
      searchData: {
        category_id: '',
        date: '',
        project_id: '',
        from_org: '',
        keyword: '',
        sources: '',
        online_user: '',
        all: '',
        all_in: '',
      },
      pageNum: 1,
      listTotal: 0,
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
          },
        },
        {
          key: 'category_id',
          type: 'cascader',
          width: 120,
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'project_id',
          type: 'select',
          width: 120,
          options: [],
          attrs: {
            clearable: true,
            placeholder: '所属项目',
          },
        },
        {
          key: 'from_org',
          type: 'select',
          width: 120,
          options: [
            {
              value: '1',
              label: 'test',
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '推荐机构',
          },
        },
        {
          key: 'sources',
          type: 'select',
          width: 120,
          options: [
            {
              value: '1',
              label: 'test',
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '渠道来源',
          },
        },
        {
          key: 'pay_status',
          type: 'select',
          width: 120,
          options: [
            {
              value: '0',
              label: '待验证/等待付款 ',
            },
            {
              value: '1',
              label: '新订单/待入账/已付款',
            },
            {
              value: '2',
              label: '部分入账',
            },
            {
              value: '3',
              label: '已入账',
            },
            {
              value: '4',
              label: '已作废',
            },
            {
              value: '5',
              label: '已退款',
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '成交状态',
          },
        },
        {
          key: 'online_user',
          type: 'select',
          width: 120,
          options: [
            // {
            //   value: '1',
            //   label: '全部',
            // },
            {
              value: '1',
              label: '网课学生',
            },
            {
              value: '0',
              label: '非网课学生',
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '学生类型',
          },
        },
        {
          key: 'keyword',
          attrs: {
            placeholder: '客户姓名/手机号码',
          },
        },
      ],
      cultures: [
        {
          value: 1,
          label: '高中毕业',
        },
        {
          value: 2,
          label: '大专毕业',
        },
        {
          value: 3,
          label: '本科毕业',
        },
        {
          value: 4,
          label: '研究生毕业',
        },
      ],
      schoolData: [],
      rules: {
        surname: [
          { required: true, message: '请填写学生姓名', trigger: 'blur' },
        ],
        // mail: [{ validator: validMail, trigger: 'blur', required: true }],
        // mobile: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   {
        //     validator: function(rule, value, callback) {
        //       if (/^1\d\d{9}$/.test(value) == false) {
        //         callback(new Error('请输入正确的手机号'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'blur',
        //   },
        // ],
        id_card_number: [
          { required: true, message: '请输入身份证ID', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error('你的身份证格式不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        // sources: [
        //   { required: true, message: '请填写渠道来源', trigger: 'change' },
        // ],
      },
      ruleForm: {
        surname: '',
        mobile: '',
        id_card_number: '',
        sex: 0,
        birthday: '',
        marry: 0,
        qq: '',
        email: '',
        culture: '',
        province: '',
        city: '',
        from_organization_id: '',
        sources: '',
        tips: '',
      },
      curstomerVisible: false,
      tabFun: [
        {
          id: 1,
          name: '全部客户',
        },
        {
          id: 2,
          name: '我的客户',
        },
      ],
      page: 1,
      status: 1,
      datas: {},
      selectData: [],
      projectData: [],
    }
  },
  created() {
    // this.getCateList()
    this.$api.getCustomerList(this, 'schoolData')
  },
  mounted() {
    this.status = 1
    this.$api.getcategorytree(this, 1) //分类下拉列表
    this.$api.getProjectSub(this, 2) //项目下拉列表
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
    toCusDetail(ab) {
      this.$router.push({
        path: '/fina/cusdetail',
        query: {
          uid: ab.uid,
        },
      })
    },
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData)
        this.$set(this.searchOptions[1].attrs, 'options', this.selectData)
        // console.log(this.searchOptions[1])
        // this.searchOptions[1].attrs.options = this.selectData
        console.log(this.searchOptions[1])
      }
    },
    cloneData(data, newData, val, lab) {
      data.forEach((item, index) => {
        console.log(item)
        newData[index] = {}
        newData[index].value = item[val]
        newData[index].label = item[lab]
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },
    handleSearch(data) {
      console.log(data)
      if (data.date && data.date.length) {
        data.date = data.date[0] + '-' + data.date[1]
      }

      this.pageNum = 1
      this.searchData = data
      this.$api.getCustomerList(this, 'schoolData')
    },
    toOnlineStudents() {
      this.$router.push({
        path: '/etm/onlineStudents',
      })
    },

    //保存
    preserve(formName, num) {
      //没有自动填充生日
      if (this.ruleForm.birthday == '') {
        this.ruleForm.birthday = getBirth(this.ruleForm.id_card_number)
      }
      //没有自动填充性别
      if (this.ruleForm.sex == '') {
        this.ruleForm.sex = getSex(this.ruleForm.id_card_number)
      }
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addCustomers(this, this.ruleForm, num)
          // alert('submit!');
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    toCustomeRegist() {
      this.$router.push({
        path: '/etm/customeRegist',
      })
    },

    addCustomer() {
      console.log(this.ruleForm)
      for (var i in this.ruleForm) {
        console.log(i)
        this.ruleForm[i] = ''
      }
      //添加用户弹框打开
      this.curstomerVisible = true
    },
    doPageChange(page) {
      this.page = page
      this.$api.getCustomerList(this, 'schoolData')
    },
    //   getTableList(state, val, datas) {
    //     console.log(state, val, datas)
    //     if (state == 'page') {
    //       this.page = val
    //       this.datas = datas
    //       console.log(this.datas)
    //     } else if (state == 'data') {
    //       this.schoolData = val
    //     }
    //   },
    //   toSwapStudent() {
    //     this.$router.push({
    //       path: '/etm/swapStudent',
    //     })
    //   },
    //   topayment(yz, zx) {
    //     this.$router.push({
    //       path: '/etm/payMent',
    //       query: { intent_id: yz.intent_id, refund: zx, lastPage: this.page },
    //     })
    //   },
    //   toRefundDetail(ab) {
    //     console.log(ab)
    //     this.$router.push({
    //       path: '/etm/refundDetail',
    //       query: { intent_id: ab.intent_id },
    //     })
    //   },
    //   toStudentDetail(zx) {
    //     console.log(zx)
    //     let intent_id = zx.intent_id
    //     let uid = zx.uid
    //     this.$router.push({
    //       path: '/etm/studentDetail',
    //       query: { intent_id: intent_id, uid: uid },
    //     })
    //   },
    //   toIntentionEntry(ab) {
    //     console.log(ab)
    //     let intent_id = ab.intent_id
    //     this.$router.push({
    //       path: '/etm/IntentionEntry',
    //       query: { intent_id: intent_id, lastPage: this.page },
    //     })
    //   },
    //   jumpSea(ab) {
    //     let intent_id = ab.intent_id
    //     this.$confirm('确定要把学员转交到公海吗?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     })
    //       .then(() => {
    //         this.$api.jumpSea(this, intent_id)
    //         // this.$message({
    //         //   type: 'success',
    //         //   message: '删除成功!',
    //         // })
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type: 'info',
    //           message: '已取消删除',
    //         })
    //       })
    //   },
    //
    // },
    //
  },
}
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
    justify-content: flex-start;
    align-items: baseline;
    font-family: 'Microsoft YaHei UI', sans-serif;
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
</style>
