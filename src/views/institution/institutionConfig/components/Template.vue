<template>
  <div class="mainwrap">
    <div class="header">
      *微信模板消息只支持已认证的服务号，并且模板库所在行业的主营行业必须为“教育”->“培训”，副营行业为“其它”->“其它”。
      <span>请前往配置微信公众号</span>
    </div>
    <div class="main" v-if="!listData.length">
      <img src="../../../../assets/images/u5067.png" />
      <p>
        本机构暂未开通模板消息，开通后学生可定时接收到机构公众号（已关注）发送的上课提醒
      </p>
      <el-button type="primary" @click="activatenow">立即开通</el-button>
    </div>
    <!--表格-->
    <div v-else>
      <el-button type="primary" class="Reset" @click="buildConfig"
        >重置刷新</el-button
      >
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
        row-key="id"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="60"
          align="center"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="标题"
          show-overflow-tooltip
          min-width="120"
          align="center"
          prop="title"
        >
        </el-table-column>
        <el-table-column
          label="场景用途"
          show-overflow-tooltip
          min-width="120"
          align="center"
          prop="scene"
        >
        </el-table-column>
        <el-table-column
          label="模板ID"
          show-overflow-tooltip
          min-width="200"
          align="center"
          prop="template_id"
        >
        </el-table-column>
        <el-table-column
          label="是否启用"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#2798ee"
              inactive-color="#eaeefb"
              :active-value="1"
              :inactive-value="0"
              @change="updateOrgWxTemplateConfigStatus(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="viewPreview(scope.row)"
              >预览</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗 -->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
      >
        <div class="notictitle">
          <p style="font-size: 16px; color: #333">上门课程确认通知</p>
          <p class="titlecontent">{{ detailData.first }}</p>
          <div class="text">
            <span class="label">上课时间：</span>
            <div class="Contentarea">
              {{ detailData.keyword1 }}
            </div>
          </div>
          <div class="text">
            <span class="label">上课地点：</span>
            <div class="Contentarea">
              {{ detailData.keyword2 }}
            </div>
          </div>
          <div class="text">
            <span class="label">上课老师：</span>
            <div class="Contentarea">
              {{ detailData.keyword3 }}
            </div>
          </div>
          <div class="text">
            <span class="label"> 课程名称：</span>
            <div class="Contentarea">
              {{ detailData.keyword4 }}
            </div>
          </div>
          <div class="text">
            <span class="label"> 备注信息：</span>
            <div class="Contentarea">
              {{ detailData.remark }}
            </div>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getOrgWxTemplateConfigData,
  buildOrgWxTemplateConfigData,
  updateOrgWxTemplateConfigStatus,
} from "@/api/institution";
export default {
  name: "Template",
  data() {
    return {
      listData: [],
      detailData: {
        first: "",
        keyword1: "",
      },
      dialogVisible: false,
      dialogTitle: "",
    };
  },
  created() {
    this.getOrgWxTemplateConfigData();
  },
  methods: {
    // 模板消息列表
    async getOrgWxTemplateConfigData() {
      this.listLoading = true;
      const data = {
        org_id: this.$route.query.institution_id,
      };
      const res = await getOrgWxTemplateConfigData(data);
      this.listLoading = false;
      this.listData = res.data;
      this.detailData = res.data[0].content;
    },
    // 构建模板消息列表
    async buildOrgWxTemplateConfigData() {
      const data = {
        org_id: this.$route.query.institution_id,
      };
      const res = await buildOrgWxTemplateConfigData(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.getOrgWxTemplateConfigData();
      } else {
        this.$message.success("出错啦");
      }
    },
    buildConfig() {
      this.buildOrgWxTemplateConfigData();
    },
    viewPreview() {
      this.dialogTitle = "微信消息预览";
      this.dialogVisible = true;
    },
    activatenow() {
      this.buildOrgWxTemplateConfigData();
    },
    // 是否启用
    async updateOrgWxTemplateConfigStatus(row) {
      const data = {
        org_id: this.$route.query.institution_id,
        status: row.status,
        id: row.id,
      };
      const res = await updateOrgWxTemplateConfigStatus(data).catch(() => {
        row.status = row.status === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog__title {
  font-size: 16px;
}
/deep/.el-table th.is-leaf,
.el-table td {
  border-top: 1px solid #ebeef5;
}
.mainwrap {
  margin-left: -20px;
  .header {
    background: #fafafa;
    border: 1px solid rgb(230, 230, 230);
    color: #909399;
    padding: 10px;
    font-size: 15px;
    span {
      color: #199fff;
    }
  }
  .main {
    width: 720px;
    margin: 100px auto 0 auto;
    text-align: center;
    img {
      width: 230px;
    }
    p {
      color: #999;
      font-size: 15px;
      padding: 30px 0;
    }
  }
}
.Reset {
  float: right;
  margin: 20px 0;
}
.notictitle {
  p {
    line-height: 24px;
  }
}
.titlecontent {
  color: #999;
  margin: 12px 0;
}
.text {
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 15px;
  line-height: 26px;
  .label {
    width: 100px;
    color: #999;
  }
  .Contentarea {
    width: 360px;
  }
}
/deep/.el-dialog {
  width: 450px;
}
</style>
