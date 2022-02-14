<template>
  <div class="work-order-detail">
    <div class="work-order-detail-header">
      <div class="header-left">
        <h4>工单标题</h4>
        <span class="status status-success">状态</span>
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
              <span>工单编号</span>
              <span class="info-content-item-value">6454545454</span>
            </div>
          </div>
        </div>
        <div class="container-desc panel">
          <div class="panel-title">问题描述</div>
          <div class="desc-content"></div>
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
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import baisicOption from "@/utils/quill-config";
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
    };
  },
  methods: {
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
        &-info {
          color: #c0c4cc;
          &::before {
            background-color: #c0c4cc;
          }
        }
        &-wait {
          color: #fdc400;
          &::before {
            background-color: #fdc400;
          }
        }
        &-danger {
          color: #fd6500;
          &::before {
            background-color: #fd6500;
          }
        }
        &-success {
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
        height: 400px;
        margin-bottom: 20px;
        .info-content {
          padding: 10px;
          .info-content-item {
            padding: 10px 0;
          }
        }
      }
      .container-desc {
        .desc-content {
          padding: 10px;
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