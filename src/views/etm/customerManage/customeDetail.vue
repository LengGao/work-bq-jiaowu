<template>
  <section class="mainwrap">
    <el-row style="min-width: 1100px">
      <el-col :lg="15" :md="15" :sm="15" :xs="15">
        <el-row>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-name">
              <img
                alt=""
                style="width: 50px; height: 50px; border-radius: 40%"
              />
              <div style="padding-left: 10px">张小北</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">ID:</div>
              <div class="detail-con">56935</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">手机号码:</div>
              <div class="detail-con">56935</div>
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
        <div>
          <el-button type="primary" @click="openSingUpDialog">报名</el-button>
          <!-- <el-button type="primary">编辑</el-button> -->
        </div>
      </el-col>
    </el-row>
    <!--基本信息-->
    <div>
      <el-row style="min-width: 1100px">
        <el-col :lg="18" :sm="18" :xs="18" :md="18">
          <el-row>
            <el-col :lg="4" :sm="4" :xs="4" :md="4">
              <h3 style="margin: 20px 0 15px 0">基本信息</h3></el-col
            >
            <el-col :lg="16" :sm="16" :xs="16" :md="16"
              ><div style="width: 10px%; height: 10px"></div
            ></el-col>
            <el-col :lg="4" :sm="4" :xs="4" :md="4">
              <template v-if="editorInfoShow">
                <el-button type="primary" @click="editorInfoHide"
                  >取消</el-button
                >
                <el-button type="primary">保存</el-button>
              </template>
              <el-button
                type="primary"
                @click="showEditorInfo"
                v-if="!editorInfoShow"
                >编辑</el-button
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="min-width: 1100px">
        <el-col :lg="18" :sm="18" :xs="18" :md="18" v-if="!editorInfoShow">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row class="detailLine">
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="客户姓名" prop="uid">
                  <div class="ruleWord">{{ ruleForm.uid }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="手机号码" prop="create_time">
                  <div class="ruleWord">{{ ruleForm.create_time }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="备用号码" prop="user_nicename">
                  <div class="ruleWord">{{ ruleForm.user_nicename }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="身份证号" prop="realname">
                  <div class="ruleWord">{{ ruleForm.realname }}sdfdsfsdf</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="学员性别" prop="mobile">
                  <div class="ruleWord">{{ ruleForm.mobile }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="婚姻状况" prop="identity_card">
                  <div class="ruleWord">{{ ruleForm.identity_card }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="出生日期" prop="name">
                  <div class="ruleWord">{{ ruleForm.name }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="年龄" prop="type">
                  <div class="ruleWord">{{ ruleForm.type }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="邮箱地址" prop="organization_id">
                  <div class="ruleWord">{{ ruleForm.organization_id }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="文化程度" prop="name">
                  <div class="ruleWord">{{ ruleForm.name }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="地域" prop="pay_amount">
                  <div class="ruleWord">{{ ruleForm.pay_amount }}</div>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属校区" prop="class_type">
                  <div class="ruleWord">{{ ruleForm.class_type }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="渠道来源" prop="update_time">
                  <div class="ruleWord">{{ ruleForm.update_time }}</div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属机构" prop="update_time">
                  <div class="ruleWord">{{ ruleForm.update_time }}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <!--编辑基本信息-->
        <el-col :lg="18" :sm="18" :xs="18" :md="18" v-if="editorInfoShow">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row class="detailLine">
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="客户姓名" prop="uid">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="手机号码" prop="create_time">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="电话号码" prop="user_nicename">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="身份证号" prop="realname">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="学员性别" prop="mobile">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="婚姻状况" prop="identity_card">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="出生日期" prop="name">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="年龄" prop="type">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="邮箱地址" prop="organization_id">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="文化程度" prop="name">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="地域" prop="pay_amount">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属校区" prop="class_type">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="渠道来源" prop="update_time">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="所属机构" prop="update_time">
                  <el-input
                    v-model="ruleForm.create_time"
                    style="width: 240px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>

        <el-col :lg="3" :sm="3" :xs="3" :md="3"> </el-col>
      </el-row>
    </div>
    <el-row style="min-width: 1100px">
      <el-col :lg="18" :sm="18" :xs="18" :md="18">
        <!--订单记录-->
        <div class="customer_sum_up">
          <h3 style="margin: 20px 0">订单记录</h3>
          <!--表格-->

          <div class="userTable">
            <el-table
              ref="multipleTable"
              :data="schoolData"
              style="width: 100%"
              class="min_table"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                label="订单编号"
                show-overflow-tooltip
                min-width="90"
                prop="index_category_id"
              >
              </el-table-column>
              <el-table-column
                prop="index_category_name"
                label="订单状态"
                min-width="110"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="mobile"
                label="订单总价"
                min-width="150"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="mobile"
                label="优惠金额"
                min-width="150"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="mobile"
                label="应收金额"
                min-width="150"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="mobile"
                label="实收金额"
                min-width="150"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="mobile"
                label="欠交金额"
                min-width="150"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column label="操作" fixed="right" min-width="200">
                <template>
                  <div style="display: flex; justify-content: center">
                    <el-button type="text" style="" @click="orderVisibleShow"
                      >收款</el-button
                    >
                    <el-button
                      type="text"
                      style="padding: 0 40px"
                      @click="orderVisibleShow"
                      >退费</el-button
                    >
                    <el-button type="text" style="" @click="orderVisibleShow"
                      >作废</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--客户历史-->
        <div class="customer_sum_up">
          <h3 style="margin: 20px 0">订单记录</h3>
          <!--表格-->
          <el-input type="textarea" placeholder="请填写跟进记录"></el-input>
          <div style="display: flex; justify-content: flex-end">
            <el-button type="primary" style="margin-top: 20px; width: 80px"
              >发布</el-button
            >
          </div>
          <div class="textContent">
            <h5>报名缴费</h5>
            <p>2020-05-26 17:21:01 操作人：admin 角色：教务 部门：招生部</p>
            <div>备注信息：老客户转介绍，给予八五折优惠</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="orderVisible"
      width="70%"
      :close-on-click-modal="false"
    >
      <h3 style="margin-bottom: 10px">订单信息</h3>
      <el-row>
        <el-col
          :lg="8"
          :md="8"
          :sm="8"
          :xs="8"
          class="orderInfo"
          v-for="i in 6"
          :key="i"
        >
          订单编号: <span>A-451420200701</span>
        </el-col>
      </el-row>
      <h3 style="margin: 20px 0">支付信息</h3>
      <el-form
        label-width="100px"
        class="demo-ruleForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :show-message="true"
        label-position="right"
      >
        <el-row>
          <el-col :lg="12" :md="12" :sm="12" :xs="12">
            <el-form-item label="支付方式" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xs="12">
            <el-form-item label="支付金额" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xs="12">
            <el-form-item label="上传收据" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="orderVisible = false">取 消</el-button>
        <el-button type="primary" @click="toOrderDetail">收 费</el-button>
      </span>
    </el-dialog>
    <!-- 报名 -->
    <CustomeRegist v-model="signUpDialog" :userInfo="detailData" />
  </section>
</template>

<script>
import CustomeRegist from '@/views/etm/components/customeRegist'
export default {
  name: 'customeDetail',
  components: {
    CustomeRegist,
  },
  data() {
    return {
      ruleForm: {},
      schoolData: [{ index_category_id: 1 }],
      editorInfoShow: false, //控制编辑信息显示
      orderVisible: false,
      signUpDialog: false,
    }
  },
  methods: {
    openSingUpDialog() {
      this.signUpDialog = true
    },
    //跳转订单详情页
    toOrderDetail() {
      this.$router.push({
        name: 'orderdetail',
      })
    },
    orderVisibleShow() {
      this.orderVisible = true
    },
    showEditorInfo() {
      this.editorInfoShow = !this.editorInfoShow
    },
    editorInfoHide() {
      this.editorInfoShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-form-item__label {
  font-size: 16px;
  color: #909399;
}
/deep/.el-input__inner {
  width: 240px;
}
.ruleWord {
  font-size: 16px;
  color: #606266;
}
.orderInfo {
  padding: 10px 0;
}
.detail-name {
  display: flex;
  font-size: 16px;
  color: #909399;
  align-items: center;
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
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
h3 {
  color: #333333;
  font-size: 16px;

  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;

  padding-left: 4px;
  border-left: 4px solid #199fff;
}
.textContent {
  font-size: 16px;
  color: #606266;
  font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  h5 {
    font-size: 16px;
    color: #606266;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    padding-top: 10px;
  }
  p {
    padding: 10px 0;
    font-size: 16px;
    color: #909399;
  }
}
</style>
