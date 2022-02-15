<template>
  <div class="work-order-detail" v-loading="detailLoading">
    <div class="work-order-detail-header">
      <div class="header-left">
        <h4>{{ detailData.title }}</h4>
        <span :class="`status status-${detailData.status}`">{{
          detailData.status_name
        }}</span>
      </div>
      <div class="header-right">
        <el-button>转交工单</el-button>
      </div>
    </div>
    <div class="work-order-detail-container">
      <div class="container-left">
        <div class="container-info panel">
          <div class="panel-title">基本信息</div>
          <div class="info-content">
            <div class="info-content-item">
              <span class="info-content-item-name">工单编号</span>
              <span class="info-content-item-value">{{ detailData.id }}</span>
            </div>
            <div class="info-content-item">
              <span class="info-content-item-name">提交时间</span>
              <span class="info-content-item-value">{{
                detailData.submit_time
              }}</span>
            </div>
            <div class="info-content-item">
              <span class="info-content-item-name">提交人员</span>
              <span class="info-content-item-value">{{
                detailData.submitter_name
              }}</span>
            </div>
            <template v-for="(item, index) in detailData.uid_order">
              <div class="info-content-item" :key="index">
                <span class="info-content-item-name">关联学生</span>
                <span
                  class="info-content-item-value link"
                  @click="toStudentDetail(item.uid)"
                >
                  {{ item.user_realname }}
                </span>
              </div>
              <div class="info-content-item" :key="item.uid">
                <span class="info-content-item-name">关联订单</span>
                <span class="info-content-item-value link">
                  <p
                    type="text"
                    v-for="order in item.order"
                    :key="order.order_id"
                    @click="toOrderDetail(order.order_id)"
                  >
                    {{ order.order_name }}
                  </p>
                </span>
              </div>
            </template>
          </div>
        </div>
        <div class="container-desc panel">
          <div class="panel-title">问题描述</div>
          <div class="desc-content">
            <p>{{ detailData.description }}</p>
            <img
              :src="url"
              @click="handlePreview(url)"
              v-for="(url, index) in detailData.images"
              :key="index"
              title="查看大图"
            />
          </div>
        </div>
      </div>
      <div class="container-record panel">
        <div class="panel-title">处理记录</div>
        <div class="record-content">
          <div class="record-item">
            <div class="record-item-avatar">头像</div>
            <div class="record-item-body">
              <div class="user-info">
                <span class="user-info-name">傻乎乎</span>
                <span class="user-info-other">2021-20-20</span>
              </div>
              <div class="user-msg" @click="handleMsgClick">
                <p>文峰街道卡萨丽枫酒店撒狂蜂浪蝶交三方都第十卡逻辑</p>
                <img
                  src="https://img2.baidu.com/it/u=2927586094,212838758&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="record-item">
            <div class="record-item-avatar">头像</div>
            <div class="record-item-body">
              <div class="user-info">
                <span class="user-info-name">傻乎乎</span>
                <span class="user-info-other">2021-20-20</span>
              </div>
              <div class="user-msg" @click="handleMsgClick">
                <p>文峰街道卡萨丽枫酒店撒狂蜂浪蝶交三方都第十卡逻辑</p>
                <img
                  src="https://img2.baidu.com/it/u=2927586094,212838758&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="record-edit">
          <quill-editor
            placeholder="fdsaklfjdslkf "
            ref="treatyEditor"
            v-model="msgValue"
            :options="editorOption"
          >
          </quill-editor>
        </div>
      </div>
    </div>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import baisicOption from "@/utils/quill-config";
import { getWorkorderDetail } from "@/api/set";
export default {
  name: "workOrderDetail",
  components: {
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        placeholder: "请输入...（按enter发送，shift+enter换行）",
        modules: {
          ...baisicOption.modules,
          keyboard: {
            bindings: {
              enter: {
                key: 13,
                handler: this.onEnter,
              },
            },
          },
        },
      },
      msgValue: "",
      detailLoading: false,
      detailData: {},
    };
  },
  created() {
    this.getWorkorderDetail();
  },
  methods: {
    handlePreview(url) {
      this.$refs.view.show(url);
    },
    async getWorkorderDetail() {
      const data = {
        id: this.$route.query.id,
      };
      this.detailLoading = true;
      const res = await getWorkorderDetail(data);
      this.detailLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
    onEnter() {
      console.log(this.msgValue);
      this.msgValue = "";
    },
    handleMsgClick(e) {
      console.log(e.srcElement.currentSrc);
    },
  },
};
</script>

<style lang="less" scoped>
.work-order-detail {
  padding: 16px;
  .panel {
    border: 1px solid #ddd;
    &-title {
      color: #199fff;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    .header-left {
      display: flex;
      .status {
        margin-left: 10px;
        &::before {
          display: inline-block;
          vertical-align: middle;
          margin-right: 4px;
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        &-1 {
          color: #c0c4cc;
          &::before {
            background-color: #c0c4cc;
          }
        }
        &-2 {
          color: #fdc400;
          &::before {
            background-color: #fdc400;
          }
        }
        &-3 {
          color: #fd6500;
          &::before {
            background-color: #fd6500;
          }
        }
        &-4 {
          color: #43d100;
          &::before {
            background-color: #43d100;
          }
        }
      }
    }
  }
  &-container {
    display: flex;
    height: calc(100vh - 139px);
    .container-left {
      width: 400px;
      .container-info {
        width: 100%;
        height: 500px;
        margin-bottom: 20px;
        overflow-y: auto;
        .info-content {
          padding: 10px;
          .info-content-item {
            padding: 10px 0;
            display: flex;
            &-name {
              flex-shrink: 0;
              width: 80px;
            }
            &-value {
              align-self: flex-end;
              &.link {
                color: #199fff;
                cursor: pointer;
                p {
                  margin-bottom: 16px;
                }
              }
            }
          }
        }
      }
      .container-desc {
        .desc-content {
          padding: 10px;
          height: calc(100vh - 703px);
          min-height: 150px;
          overflow-y: auto;
          p {
            line-height: 1.5;
          }
          img {
            height: 60px;
            width: 60px;
            vertical-align: top;
            margin: 16px 16px 0 0;
            cursor: pointer;
          }
        }
      }
    }
    .container-record {
      flex: 1;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      .record-content {
        padding: 10px 20px;

        .record-item {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
          display: flex;
          &-avatar {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 50%;
            text-align: center;
            color: #fff;
            font-size: 12px;
            background-color: gray;
            flex-shrink: 0;
            margin-right: 10px;
          }
          &-body {
            .user-info {
              font-size: 14px;
              &-name {
                color: #199fff;
                margin-right: 16px;
              }
              &-other {
                color: #999;
              }
            }
            .user-msg {
              line-height: 1.5;
              img {
                width: 60px;
                cursor: pointer;
              }
            }
          }
        }
      }
      .record-edit {
        margin-top: auto;
        /deep/.quill-editor {
          .ql-toolbar.ql-snow {
            border-left: none;
            border-right: none;
          }
          .ql-container {
            height: 160px;
            &.ql-snow {
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>