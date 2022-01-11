<template>
  <div class="institutional-collection" v-loading="loading">
    <div class="student-order-title">
      <h3>{{ rebateData.institution_name }}-返点{{ rebateData.standard_rebate_price }}元</h3>
      <span class="student-order-status">机构返点订单</span>
      <div class="actions">
        <span v-if="rebateData.status == 0">
           <el-button
          type="primary"
          plain
          @click="dialogadopt()"
          >审批通过</el-button
        >
         <el-button
          type="danger"
          plain
          @click="dialogVisible = true"
          >审批驳回</el-button
        >
        </span>
       
        <el-button
          type="primary"
          plain
          v-if="rebateData.status == 1"
          >已通过</el-button
        >
        <el-tag
          type="danger"
          plain
          v-if="rebateData.status == 2"
          >已驳回</el-tag
        >
      </div> 
    </div>
    <Title text="返点信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">机构名称：</span>
        <span class="info-item__value">{{ rebateData.institution_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">关联订单数：</span>
        <span class="info-item__value">{{ rebateData.order_count }}</span>
      </div>
        <div class="info-item">
        <span class="info-item__name">应返点金额：</span>
        <span class="info-item__value">{{
          rebateData.standard_rebate_price | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">申请返点金额：</span>
        <span class="info-item__value">{{
          rebateData.apply_rebate_price | moneyFormat
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">支付方式：</span>
        <span class="info-item__value">{{ rebateData.pay_type }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ rebateData.remark || "--" }}</span>
      </div>
    </div>
    <div v-if="rebateData.status !== 0 ">
      <Title text="操作记录"></Title>
      <div class="tab_record">
        <div class="title">
          <span class="el-col-2">返点状态</span>
          <span class="el-col-3">返点日期</span>
          <span class="el-col-3">实际返点金额</span>
          <span class="el-col-6">备注信息</span>
          <span class="el-col-3">操作人</span>
          <span class="el-col-6">支付凭证</span>
          <span class="el-col-6">操作时间</span>
        </div>
        <div class="content">
          <span class="el-col-2">
            <el-tag
            v-if="rebateData.status == 0"
            type="success"
            size="small"
            class="tag-margin">
              待审批</el-tag>
            <el-tag
            v-if="rebateData.status == 1"
            class="tag-margin">
              已通过</el-tag>
            <el-tag
            v-if="rebateData.status == 2"
            type="danger"
            class="tag-margin">
              已驳回</el-tag>

            </span>
          <span class="el-col-3">
            <div v-if="rebateData.rebate_time">
            {{rebateData.rebate_time}}
            </div>
            <span v-else>--</span>
          </span>
          <span class="el-col-3">
            {{rebateData.real_rebate_price | moneyFormat}}
          </span>
          <span class="el-col-6">
            <div v-if="rebateData.reason">
            {{rebateData.reason}}
            </div>
            <span v-else>--</span>
          </span>
          <span class="el-col-3">
            {{rebateData.approve_staff_name}}
          </span>

          <span class="el-col-6">
            <div class="list-img" v-if="rebateData.pay_proof_arr && rebateData.pay_proof_arr.length">
                <img
                :src="item"
                alt=""
                title="点击预览大图"
                style="
                  width: 60px;
                  height: 50px;
                  cursor: pointer;
                  margin-right: 10px;
                "
                v-for="(item, index) in rebateData.pay_proof_arr"
                :key="index"
                @click="handlePreview(item)"
              />
                </div>
                <span v-else>--</span>
          </span>

          <span class="el-col-6">
            {{rebateData.operate_time}}
          </span>
        </div>
        <PreviewImg ref="view" />
      </div>
    </div>
    <div>
      <Title text="关联订单"></Title>
      <el-table
        :data="listData"
        style="border: 1px solid #f1f1f1"
        v-loading="false"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
      <el-table-column
          label="订单编号"
          min-width="140"
          align="center"
          prop="order_no"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentOrderDetail(row.order_id)">{{
              row.order_no
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="create_time"
        >
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="220"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="user_realname"
          label="客户姓名"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="学历形式"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="university_name"
          label="院校名称"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="level_name"
          label="层次名称"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="major_name"
          label="专业名称"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        
        <el-table-column
          label="订单总金额"
          align="center"
          min-width="100"
          prop="order_money"
          show-overflow-tooltip
        >
        <template slot-scope="{ row }">
            <span> {{ row.order_money | moneyFormat }} </span>
        </template>
        </el-table-column>
        <el-table-column
          label="返点比例"
          align="center"
          min-width="100"
          prop="rebate_rate"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="应返点金额"
          align="center"
          min-width="100"
          prop="order_standard_rebate_price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.order_standard_rebate_price | moneyFormat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          label="请求返点金额"
          align="center"
          min-width="100"
          prop="apply_rebate_price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.apply_rebate_price | moneyFormat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="返点状态"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        <template slot-scope="{ row }">
                <span
                  v-if="row.status == 0"
                  class="approve-status approve-status--none"
                  >待审批</span>
                <span
                  v-if="row.status == 1"
                  class="approve-status approve-status--wait"
                  >已通过</span
                >
                <span v-if="row.status == 2" 
                class="approve-status"
                  >已驳回
                </span>
              </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentOrderDetail(row.order_id)"
              >订单详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

     <!-- 审批通过 -->
      <el-dialog
        title="审批通过"
        :visible.sync="dialogVisibleadopt"
        :close-on-click-modal="false"
        width="790px"
        @closed="adoptresetForm('adoptData')">
        <el-form
      label-width="110px"
      :model="adoptData"
      :rules="rules"
      inline
      ref="adoptData">
      <el-form-item label="机构名称" prop="institution_name">
        <el-input
        disabled
          class="input"
          v-model="adoptData.institution_name"
        />
      </el-form-item>
      <el-form-item label="关联订单数" prop="order_count">
        <el-input
          class="input"
          v-model="adoptData.order_count"
          disabled
        />
      </el-form-item>
      <el-form-item label="申请返点金额" prop="apply_rebate_price">
        <el-input
          class="input"
          v-model="adoptData.apply_rebate_price"
          disabled
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-input
          class="input"
          v-model="adoptData.pay_type"
          disabled
        />
      </el-form-item>
      <el-form-item label="实际返点金额" prop="real_rebate_price">
        <el-input
          class="input"
          v-model="adoptData.real_rebate_price"
          type="number"
          placeholder="实际返点金额"
        />
      </el-form-item>
      <el-form-item prop="rebate_time" label="返点日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="adoptData.rebate_time"
          value-format="yyyy-MM-dd"
          :picker-options="{
            disabledDate: disabledDate,
          }"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="审批理由" prop="reason" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="adoptData.reason"
          placeholder="请输入内容"
        />
      </el-form-item>
       <el-form-item label="支付凭证" class="block">
         <el-upload
            :headers="headers"
            :action="uploadImageUrl"
            :on-remove="handleRemoveImg"
            :before-remove="beforeRemoveImg"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            multiple
            name="image"
            accept="image/*"
            list-type="picture-card"
            :file-list="adoptData.pay_proof"
          >
            <i class="el-icon-plus" style="font-size: 14px"></i>
          </el-upload>
      </el-form-item>
    </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleadopt = false">取 消</el-button>
          <el-button type="primary" 
          :loading="addLoading"
              @click="adoptsubmitForm('adoptData')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 审批驳回 -->
      <el-dialog
        title="审批驳回"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="600px"
        @closed="resetForm('rejectData')">
        <el-form
            label-width="110px"
            :model="rejectData"
            :rules="rulesr"
            inline
            ref="rejectData"
            class="rejecinput"
          >
            <el-form-item label="驳回原因" prop="reason" class="block">
              <el-input
                class="remark"
                type="textarea"
                v-model="rejectData.reason"
                placeholder="请输入驳回原因"
                width="420px"
              />
            </el-form-item>

          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" 
          :loading="addLoading"
              @click="submitForm('rejectData')">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import { rebateDetail } from "@/api/rebate";
import { approveRebate } from "@/api/rebate";
import { approveRebateadopt } from "@/api/rebate";
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "institutionalRebateDetail",
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      id:'',
      loading: false,
      dialogVisible: false,
      dialogVisibleadopt:false,
      currentId:"",
      rebateData:{},
      listData:[],
      addLoading: false,
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      pay_proof_arr:[],
      rejectData: {
        id:"",
        reason:"",
      },
      adoptData: {
        id:"",
        institution_name:"",
        pay_type:"",
        order_count:"",
        apply_rebate_price:"",
        rebate_time:"",
        reason:"",
        pay_proof:[],
      },
      rules: {
      real_rebate_price: [{ required: true, message: "请输入", trigger: "blur" }],
      rebate_time: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      rulesr: {
      reason: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.rebateDetail()
    // console.log(this.$route.query.id)
  },
  methods: {
    handleUploadError(response, file, fileList) {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(response, file, fileList) {
      this.adoptData.pay_proof = fileList;
    },
    handleRemoveImg(file, fileList) {
      this.adoptData.pay_proof = fileList;
    },
    beforeRemoveImg(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    disabledDate(e) {
      return e.getTime() > Date.now();
    },

    async rebateDetail() {
      const data = {
        id: this.$route.query.id,
      };
      this.loading = true;
      const res = await rebateDetail(data);
      this.loading = false;
      if (res.code === 0) {
        this.rebateData = res.data;
        this.listData = res.data.order_list;
      }
    },
    toStudentOrderDetail(id) {
      this.$router.push({
        name: "studentOrderDetail",
        query: {
          id,
        },
      });
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },

    //审核返点-同意
    async approveRebateadopt() {
      const data = {
        id: this.adoptData.id,
        institution_name: this.adoptData.institution_name,
        real_rebate_price: this.adoptData.real_rebate_price,
        rebate_time: this.adoptData.rebate_time,
        reason: this.adoptData.reason,
        status:1,
        pay_proof: this.adoptData.pay_proof.map(
          (item) => item.response.data.data.url
        ),
      };
      const res = await approveRebateadopt(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.dialogVisibleadopt = false;
      }
    },

    //审核返点-拒绝
    async approveRebate() {
      const data = {
        id: this.$route.query.id,
        reason: this.rejectData.reason,
        status:2,
      };
      const res = await approveRebate(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.dialogVisible = false;
      }
    },
   submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.approveRebate();
        }
        this.rebateDetail();
      });
    },
      resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.rejectData) {
        this.rejectData[k] = "";
      }
      this.dialogVisible = false;
      this.rebateDetail();
    },

    adoptsubmitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.approveRebateadopt();
        }
      });
       this.rebateDetail();
    },
    adoptresetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.rejectData) {
        this.rejectData[k] = "";
      }
      this.dialogVisible = false;
      this.rebateDetail();
    },

    dialogadopt () {
      this.id = this.$route.query.id,
      this.dialogVisibleadopt = true;
      console.log(this.id)
      if (this.id) {
        for (var i in this.adoptData) {
          if(i !== 'pay_proof'){
          this.adoptData[i] = this.rebateData[i] || '';
          }
        }
        console.log(this.adoptData)
     }
    },

  },
};
</script>

<style lang="scss" scoped>
.institutional-collection{
  padding: 16px;
  .student-order-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .actions {
      margin-left: auto;
      margin-right: 30px;
    }
    .student-order-status {
      margin-left: 20px;
      color: #999;
      &::before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #43d100;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 250px;
        line-height: 1.5;
      }
    }
  }
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.tab_record{
  .title{
    background-color: #f8f8f8;
    border-bottom: 1px solid #f1f1f1;
    height: 50px;
    display: flex;
    justify-content: space-between;
    span{
      font-size: 14px;
      font-weight: bold;
      display: block;
      text-align: center;
      line-height: 50px;
      color: #888;
    }
    .el-col-2{
      width:145px;
    }
    .el-col-3{
      width:14%;
    }
    .el-col-6{
      width: 28%;
    }
  }
  .content{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 30px;
    line-height: 50px;
    color: #666;
     span{
      font-size: 14px;
      display: block;
      text-align: center;
    }
    img{
      width: 60px;
      height: 50px;
      border: 1px solid #ddd;
      vertical-align: middle;
    }
     .el-col-3{
      width:14%;
    }
    .el-col-6{
      width: 28%;
  }
}
}
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
.tag-margin{
  margin: 8px 5px 5px 10px;
}
/deep/.rejecinput .el-textarea__inner{
  width: 400px ;
  height:110px;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 80px !important;
  height: 80px !important;
}
/deep/.el-upload--picture-card {
  width: 80px !important;
  height: 80px !important;
  line-height: 80px;
}
.el-form--inline .el-form-item{
  margin-top: 10px;
  margin-bottom: 15px;
}
/deep/.el-input.is-disabled .el-input__inner{
  width: 240px;
}
/deep/.el-input__inner{
  width: 240px;
}
</style>