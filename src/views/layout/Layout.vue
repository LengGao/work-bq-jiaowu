<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar :work-order-count="workorderCount"></navbar>
      <app-main></app-main>
    </div>
    <Help :url="helpUrl" v-model="helpFullScreen" />
    <BindPhoneDialog :value="showBindPhoneDialog" />
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, Help } from "./components";
import BindPhoneDialog from "./components/BindPhoneDialog.vue";
import ResizeMixin from "./mixin/ResizeHandler";
import { getNoticeData } from "@/api/workbench";
import { mapGetters } from "vuex";
export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Help,
    BindPhoneDialog,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      timerId: null,
      workorderCount: 0,
      helpFullScreen: false,
    };
  },
  computed: {
    ...mapGetters(["menus", "helpUrl", "showBindPhoneDialog"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
        "show-help": !!this.helpUrl,
        "help-full-screen": this.helpFullScreen,
      };
    },
  },
  created() {
    // 获取用户身份
    this.$store.dispatch("setIdentity");
    // 获取通知消息
    this.getNoticeData();
    this.timerId = setInterval(() => {
      this.getNoticeData();
    }, 1000 * 30);
    console.log(this.menus);
  },
  beforeDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  },
  methods: {
    async getNoticeData() {
      const res = await getNoticeData();
      if (res.code === 0) {
        // 发送系统通知
        if (res.data.data && res.data.data.length) {
          res.data.data.forEach((item) => {
            this.showDeskTopNotice(item.keyword, item.tips);
          });
        }
        //设置菜单徽标数量
        // 工单管理
        this.setMenuBadge(
          this.menus,
          "workOrderManage",
          res.data.workorderCount || 0
        );
        this.workorderCount = res.data.workorderCount || 0;
        // 教务开课
        this.setMenuBadge(this.menus, "eduOpenClass", res.data.openCourse || 0);
        // 订单审批
        this.setMenuBadge(this.menus, "approveManage", res.data.orderAuth || 0);
        //回款入账
        this.setMenuBadge(
          this.menus,
          "returnPayment",
          res.data.orderPayAuth || 0
        );
      }
    },
    setMenuBadge(arr, path, value) {
      for (const item of arr) {
        if (item.path === path) {
          item.badge = value;
        }
        if (item.children && item.children.length) {
          this.setMenuBadge(item.children, path, value);
        }
      }
    },
    // 系统通知
    showDeskTopNotice(title, msg) {
      const Notification =
        window.Notification ||
        window.mozNotification ||
        window.webkitNotification;
      if (Notification) {
        Notification.requestPermission(function (status) {
          //status默认值'default'等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
          if ("granted" != status) {
            return;
          } else {
            const tag = "sds" + Math.random();
            const notify = new Notification(title, {
              dir: "auto",
              lang: "zh-CN",
              requireInteraction: true,
              tag, //实例化的notification的id
              // icon: "https://img2.baidu.com/it/u=3666548066,2508071679&fm=26&fmt=auto", //通知的缩略图,//icon 支持ico、png、jpg、jpeg格式
              body: msg, //通知的具体内容
            });
            notify.onclick = () => {
              //如果通知消息被点击,通知窗口将被激活
              window.focus();
              notify.close();
              //打开对应的界面
              // console.log(1111111);
            };
            notify.onerror = () => {
              console.log("HTML5桌面消息出错！！！");
            };
            notify.onclose = () => {
              console.log("HTML5桌面消息关闭！！！");
            };
          }
        });
      } else {
        console.log("您的浏览器不支持桌面消息");
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>