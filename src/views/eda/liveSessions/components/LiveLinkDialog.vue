<template>
  <!--直播弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="600px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('detailData')"
  >
    <el-form
      label-width="120px"
      :model="detailData"
      ref="detailData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="网页开播链接">
        <div class="link-input">
          <el-input :value="detailData.webUrl" type="text" />
          <a :href="detailData.webUrl" target="_blank">
            <el-button type="success" plain>打开</el-button>
          </a>
        </div>
      </el-form-item>
      <el-form-item label="启动客户端链接">
        <div class="link-input">
          <el-input :value="detailData.clientUrl" type="text" />
          <a :href="detailData.clientUrl" target="_blank">
            <el-button type="success" plain>打开</el-button>
          </a>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <div>
          <span>频道号：{{ detailData.channelId }}</span>
          <span class="m-l">登录密码：{{ detailData.channelPasswd }}</span>
        </div>
      </el-form-item>
      <el-form-item label="助教后台链接">
        <div class="link-input">
          <el-input class="w-100" :value="detailData.teacherUrl" type="text" />
          <a :href="detailData.teacherUrl" target="_blank">
            <el-button type="success" plain>打开</el-button>
          </a>
        </div>
      </el-form-item>
      <el-form-item
        label=" "
        v-for="(item, index) in detailData.channel_account"
        :key="index"
      >
        <div>
          <span>频道号：{{ item.account }}</span>
          <span class="m-l">登录密码：{{ item.passwd }}</span>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { liveLinkdetail } from "@/api/eda";
export default {
  name: "LiveLinkDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    sessionId: {
      type: [String, Number],
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      detailData: {},
      detaiLoading: false,
      classOptions: [],
      teacherOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.liveLinkdetail();
      } else {
        this.detailData = this.datas;
      }
    },
    // 直播详情
    async liveLinkdetail() {
      const data = {
        live_class_id: this.id,
        live_id: this.sessionId || "",
      };
      this.detaiLoading = true;
      const res = await liveLinkdetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        const data = res.data || {};
        this.detailData = {
          webUrl:
            "https://live.polyv.net/web-start/classroom?channelId=" +
            data.channelId,
          clientUrl:
            "https://live.polyv.net/start-client.html?channelId=" +
            data.channelId,
          channelId: data.channelId,
          channelPasswd: data.channelPasswd,
          channel_account: data.channel_accout,
          teacherUrl: "https://live.polyv.net/teacher.html",
        };
      }
    },
    resetForm() {
      this.detailData = {};
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-dialog {
  .w-100 {
    width: 100%;
  }
  .m-l {
    margin-left: 50px;
  }
  .link-input {
    display: flex;
    button {
      margin-left: 10px;
    }
  }
}
</style>