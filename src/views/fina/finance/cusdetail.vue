<template>
  <section class="mainwrap">
    <el-row>
      <el-col :lg="21" :md="21" :sm="21" :xs="21">
        <el-row>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-name">
              <img alt="" style="width:50px;height:50px;border-radius:40%" />
              <div style="padding-left:10px">{{ ruleForm.surname }}</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">ID:</div>
              <div class="detail-con">{{ ruleForm.id }}</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">手机号码:</div>
              <div class="detail-con">{{ ruleForm.mobile }}</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">注册日期:</div>
              <div class="detail-con">54935</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="3" :md="3" :sm="3" :xs="3">
        <div style="display:flex;justify-content:flex-end">
          <el-button type="primary">报名</el-button>
        </div>
      </el-col>
    </el-row>

    <section class="main-contain">
      <el-row>
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <div class="navigationBox">
            <ul class="navigation">
              <li
                v-for="item in tabFun"
                :key="item.id"
                @click="statusSwitch(item)"
                :class="{ tabg: item.id == isTagactive }"
              >
                {{ item.name }}
              </li>
            </ul>
            <div style="margin-bottom:10px" v-if="isTagactive == 1">
              <div v-show="editorInfoShow">
                <el-button @click="editorInfoShow = false">取消</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
              </div>

              <el-button v-show="!editorInfoShow" @click="editorInfo"
                >编辑</el-button
              >
            </div>
          </div>
          <!--基本信息-->
          <div class="information" v-if="isTagactive == 1">
            <div style="padding:40px 100px">
              <el-steps :active="active" finish-status="success">
                <el-step title="报名"></el-step>
                <el-step title="培训"></el-step>
                <el-step title="考试"></el-step>
                <el-step title="毕业"></el-step>
              </el-steps>
            </div>

            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              v-if="!editorInfoShow"
            >
              <el-row class="detailLine">
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="客户姓名" prop="uid">
                    <div class="ruleWord">{{ ruleForm.surname }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="手机号码" prop="mobile">
                    <div class="ruleWord">{{ ruleForm.mobile }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="紧急号码" prop="user_nicename">
                    <div class="ruleWord">{{ ruleForm.user_nicename }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="身份证号">
                    <div class="ruleWord">{{ ruleForm.id_card_number }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="微信" prop="realname">
                    <div class="ruleWord">{{ ruleForm.realname }}sdfdsfsdf</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="学员性别" prop="mobile">
                    <div class="ruleWord">
                      {{
                        ruleForm.sex == 0
                          ? '未知'
                          : ruleForm.sex == 1
                          ? '男'
                          : '女'
                      }}
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="出生日期" prop="name">
                    <div class="ruleWord">{{ ruleForm.birthday }}</div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="QQ" prop="qq">
                    <div class="ruleWord">
                      {{ ruleForm.qq ? ruleForm.qq : '无' }}
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="邮箱地址" prop="organization_id">
                    <div class="ruleWord">
                      {{ ruleForm.email ? ruleForm.email : '无' }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="文化程度" prop="name">
                    <div class="ruleWord">
                      {{ ruleForm.culture ? ruleForm.culture : '未知' }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="籍贯" prop="pay_amount">
                    <div class="ruleWord">
                      {{ ruleForm.city ? ruleForm.city : '未知' }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="常住地" prop="pay_amount">
                    <div class="ruleWord">{{ ruleForm.pay_amount }}</div>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="渠道来源" prop="update_time">
                    <div class="ruleWord">
                      {{ ruleForm.sources | sourcestype }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="所属机构" prop="update_time">
                    <div class="ruleWord">
                      {{
                        ruleForm.from_organization_name
                          ? ruleForm.from_organization_name
                          : '未知'
                      }}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="备注信息" prop="update_time">
                    <div class="ruleWord">
                      {{ ruleForm.tips ? ruleForm.tips : '无' }}
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <!--编辑基本信息-->

            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              v-if="editorInfoShow"
            >
              <el-row class="detailLine">
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="学生姓名" prop="surname">
                    <el-input
                      v-model="ruleForm.surname"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input
                      v-model="ruleForm.mobile"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="紧急号码" prop="user_nicename">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="身份证号" prop="id_card_number">
                    <el-input
                      v-model="ruleForm.id_card_number"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="微信" prop="realname">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="学员性别" prop="sex">
                    <el-input
                      v-model="ruleForm.sex"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <!-- <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="婚姻状况" prop="identity_card">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      v-model="ruleForm.birthday"
                      type="date"
                      format="yyyy-MM-dd "
                      value-format="yyyy-MM-dd "
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="QQ" prop="qq">
                    <el-input
                      v-model="ruleForm.qq"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="年龄" prop="type">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col> -->

                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="邮箱地址" prop="email">
                    <el-input
                      v-model="ruleForm.email"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="文化程度" prop="culture">
                    <!-- <el-input
                      v-model="ruleForm.culture"
                      style="width:240px"
                    ></el-input> -->
                    <el-select
                      v-model="ruleForm.culture"
                      placeholder="请选择文化程度"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="籍贯" prop="province">
                    <el-input
                      v-model="ruleForm.province"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="常住地" prop="city">
                    <el-input
                      v-model="ruleForm.city"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="所属校区" prop="class_type">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="渠道来源" prop="sources">
                    <el-input
                      v-model="ruleForm.sources"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="所属机构" prop="update_time">
                    <el-input
                      v-model="ruleForm.create_time"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8" :xs="8">
                  <el-form-item label="备注信息" prop="tips">
                    <el-input
                      v-model="ruleForm.tips"
                      style="width:240px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!--证件资料-->
          <div class="certificate" v-if="isTagactive == 2">
            <el-row>
              <el-col :lg="18" :md="18" :sm="18" :xs="18">
                <el-row>
                  <el-col
                    :lg="8"
                    :md="8"
                    :sm="8"
                    :xs="8"
                    v-for="item in 5"
                    :key="item"
                    style="margin-bottom:40px"
                  >
                    <div class="certificate-item">
                      <p>免冠正面照</p>
                      <div
                        class="headPortrait el-icon-plus"
                        @click="addIcon"
                      ></div></div
                  ></el-col>
                </el-row>
              </el-col>
              <el-col
                :lg="6"
                :md="6"
                :sm="6"
                :xs="6"
                style="display:flex;justify-content:flex-end"
              >
                <el-button>查看大图</el-button>
                <el-button>打包下载</el-button>
              </el-col>
            </el-row>
          </div>

          <!--订单记录-->
          <div v-if="isTagactive == 3">
            <!--表格-->
            <div class="userTable">
              <el-table
                ref="multipleTable"
                :data="schoolData"
                tooltip-effect="light"
                stripe
                style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                class="min_table"
              >
                <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
                <el-table-column
                  prop="course_id"
                  label="订单编号"
                  show-overflow-tooltip
                  min-width="90"
                ></el-table-column>
                <el-table-column
                  prop="course_name"
                  label="订单时间"
                  min-width="200"
                  column-key="course_id"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="category_name"
                  label="订单金额"
                  min-width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="category_name"
                  label="订单状态"
                  min-width="100"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <!--跟进记录-->
          <div v-if="isTagactive == 4" class="record">
            <el-input type="textarea" placeholder="请填写跟进记录..." />
            <div class="record-head" style="">
              <div>
                <span>下次跟进时间</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <el-button type="primary">发布</el-button>
            </div>
            <div class="record-box" v-for="item in recordData.list" :key="item">
              <div class="record-title">
                <p>
                  跟进时间<span>{{ item.create_time }}</span>
                </p>
                <p>
                  更进人<span>{{
                    item.staff_name ? item.staff_name : '无'
                  }}</span>
                </p>
                <p>部门<span>招生部</span></p>
                <p>角色<span>教务</span></p>
              </div>
              <div class="record-content">
                <p>
                  更进内容<span>{{ item.desc }}</span>
                </p>
              </div>
              <div class="record-content">
                <p>
                  下次跟进时间<span>
                    {{ item.todo_time ? item.todo_time : '未设置' }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isTagactive: 1,
      active: 1,
      schoolData: [],
      editorInfoShow: false,
      ruleForm: {},
      formData: {
        id: '',
        surname: '',
        mobile: '',
        id_card_number: '',
        sex: '',
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
        uid: '',
      },
      options: [
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
      tabFun: [
        {
          id: 1,
          name: '基本信息',
        },
        {
          id: 2,
          name: '证件资料',
        },
        {
          id: 3,
          name: '订单记录',
        },
        {
          id: 4,
          name: '跟进记录',
        },
      ],
      recordData: [],
    }
  },
  created() {
    this.$api.getUserDetail(this, 'ruleForm')
  },
  filters: {
    sourcestype(sources) {
      console.log(sources)
      switch (sources) {
        case null:
          return '未知'
          break
        case '0':
          return '未知'
          break
        case '1':
          return '小程序'
          break
        case '2':
          return '后台录入'
          break
        case '4':
          return '教务系统录入'
          break
        case '3':
          return '业务员录入'
          break
      }
    },
  },
  methods: {
    handleSave() {
      this.$api.modifyUserDetail(this, this.ruleForm)
    },
    editorInfo() {
      this.editorInfoShow = !this.editorInfoShow
    },
    statusSwitch(ab) {
      this.isTagactive = ab.id
      switch (ab.id) {
        case 4:
          this.$api.getUserRecord(this, 'recordData')
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-button {
  padding: 9px 0;
  width: 80px;
}
.detail-name {
  display: flex;
  font-size: 16px;
  color: #909399;
  align-items: center;
}
.tabg {
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.detail-info {
  // height: 100%;
  margin-top: 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #909399;
  .detail-label {
  }
  .detail-con {
    font-size: 16px;
    padding-left: 30px;
  }
}

.navigationBox {
  height: 45px;
  border-bottom: 1px solid #ccc;
  margin-top: 30px;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .navigation {
    width: 400px;
    display: flex;
    justify-content: space-between;
    font-family: 'Microsoft YaHei UI', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    letter-spacing: normal;
    color: #333333;
    li {
      height: 28px;
      font-size: 16px;

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
.certificate-item {
  display: flex;
  p {
    padding: 10px 20px 0 0;
  }
}
.certificate {
  margin-top: 20px;
}
.userTable {
  margin-top: 20px;
}
.record {
  margin-top: 20px;
}
.record-head {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  span {
    padding-right: 20px;
  }
}
.record-box {
  margin-top: 40px;
}
.record-title {
  display: flex;
  justify-content: space-between;
  min-width: 600px;
  max-width: 800px;

  p {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #909399;
    letter-spacing: normal;
    span {
      color: #606266;
      margin-left: 15px;
    }
  }
}
.record-content {
  margin-top: 15px;
  p {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #909399;
    letter-spacing: normal;
    span {
      color: #606266;
      margin-left: 15px;
    }
  }
}
</style>
