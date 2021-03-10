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
        <div class="searchModule">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>

          <el-select
            filterable
            style="width:130px;margin:0 10px"
            v-model="ruleForm.institution_id"
            slot="prepend"
            placeholder="所属项目"
            clearable
          >
            <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
          </el-select>
          <el-select
            filterable
            style="width:130px;margin-right:10px"
            v-model="ruleForm.institution_id"
            slot="prepend"
            placeholder="推荐机构"
            clearable
          >
            <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
          </el-select>
          <el-select
            filterable
            style="width:130px;margin-right:10px"
            v-model="ruleForm.institution_id"
            slot="prepend"
            placeholder="渠道来源"
            clearable
          >
            <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
          </el-select>
          <el-select
            filterable
            style="width:130px;margin-right:10px"
            v-model="ruleForm.institution_id"
            slot="prepend"
            placeholder="成交状态"
            clearable
          >
            <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
          </el-select>
          <el-select
            filterable
            style="width:130px;margin-right:10px"
            v-model="ruleForm.institution_id"
            slot="prepend"
            placeholder="所属校区"
            clearable
          >
            <!-- <el-option
            :label="item.institution_name"
            :value="item.institution_id"
            v-for="(item, index) in campusData.list"
            :key="index"
          ></el-option> -->
          </el-select>
          <el-input
            v-model="ruleForm.institution_id"
            placeholder="客户姓名/手机号码"
            style="width:200px;margin-right:10px;"
          ></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <!-- <el-button type="primary" style="height:40px" @click="addCustomer">
          添加客户</el-button
        > -->
      </header>
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
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="uid"
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="realname"
            label="学生姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="所属项目"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="所属校区"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="sources"
            label="所属老师"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="topayment(scope.row)"
                  >添加</el-button
                >
                <!-- <el-button type="text" @click="topayment(scope.row)"
                  >移除</el-button
                > -->
              </div>
            </template>
          </el-table-column>
        </el-table>
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
                    style="width:240px"
                    v-model="ruleForm.surname"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="手机号码" prop="mobile">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.mobile"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="备用号码" prop="name">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="身份证号" prop="id_card_number">
                  <el-input
                    style="width:240px"
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
                    style="width:240px"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="QQ" prop="qq">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.qq"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="邮箱地址" prop="email">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.email"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="文化程度" prop="culture">
                  <!-- <el-input
                    style="width:240px"
                    v-model="ruleForm.culture"
                  ></el-input> -->
                  <el-select
                    v-model="value"
                    placeholder="请选择文化程度"
                    style="width:240px"
                  >
                    <el-option
                      v-for="item in cultures"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="籍贯" prop="province">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.province"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="常住地" prop="city">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.city"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="8">
                <el-form-item label="推荐机构" prop="from_organization_id">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.from_organization_id"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8">
                <el-form-item label="渠道来源" prop="sources">
                  <el-input
                    style="width:240px"
                    v-model="ruleForm.sources"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="8">
                <el-form-item label="是否跨区报考" prop="name">
                  <el-input
                    style="width:240px"
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
            <el-button type="primary" @click="preserve">保 存</el-button>
            <el-button type="primary" @click="toCustomeRegist"
              >保存并报名</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
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
        // id_card_number: [
        //   { required: true, message: '请输入身份证ID', trigger: 'blur' },
        //   {
        //     validator: function(rule, value, callback) {
        //       if (
        //         /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
        //       ) {
        //         callback(new Error('你的身份证格式不正确'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'blur',
        //   },
        // ],
        sources: [
          { required: true, message: '请填写渠道来源', trigger: 'change' },
        ],
      },
      ruleForm: {
        surname: '',
        mobile: '',
        id_card_number: '',
        sex: 0,
        birthday: '',
        marry: '',
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
    }
  },
  created() {
    this.status = 1
  },
  mounted() {
    // this.$api.getCategoryList(this, 'schoolData')
  },
  filters: {
    dealType(type) {
      if (type == '2') {
        return '已成交'
      } else if (type == '3') {
        return '已退费'
      } else {
        return '未成交'
      }
    },
  },
  methods: {
    //保存
    preserve() {
      console.log(this.ruleForm)
      this.$api.addCustomers(this, this.ruleForm)
    },

    toCustomeRegist() {
      this.$router.push({
        path: '/etm/customeRegist',
      })
    },

    addCustomer() {
      //添加用户弹框打开
      this.curstomerVisible = true
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
    //   doPageChange(page) {
    //     this.page = page
    //     this.$api.getMyclient(this, 'schoolData', this.datas)
    //   },
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
