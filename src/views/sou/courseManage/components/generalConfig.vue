<template>
  <div class="general-config">
    <div class="conifg-item">
      <span class="conifg-item-title">课时解锁</span>
      <el-radio-group v-model="formData.radio" class="conifg-item-radio">
        <el-radio :label="0">不开启</el-radio>
        <el-radio :label="1">开启</el-radio>
      </el-radio-group>
      <div v-if="formData.radio">
        <span>课时要求学习达到</span>
        <el-input
          class="conifg-item-number"
          type="number"
          @mousewheel.native.prevent
          size="mini"
          v-model="formData.number"
        ></el-input>
        <span> % 才能开启下一个课时的学习。</span>
      </div>
    </div>
    <div class="conifg-item">
      <span class="conifg-item-title">视频快进</span>
      <el-radio-group v-model="formData.radio1" class="conifg-item-radio">
        <el-radio :label="0">不允许</el-radio>
        <el-radio :label="1">允许</el-radio>
      </el-radio-group>
    </div>
    <div class="conifg-item">
      <span class="conifg-item-title">评论审核</span>
      <el-radio-group v-model="formData.radio2" class="conifg-item-radio">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </div>
    <div class="conifg-item">
      <span class="conifg-item-title">是否开启点播视频的跑马灯设置</span>
      <el-radio-group v-model="formData.radio3" class="conifg-item-radio">
        <el-radio :label="0"> 否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
      <span class="conifg-item-desc"
        >开启后，前台播放页面就会出来跑马灯（防录屏）</span
      >
    </div>
    <div class="conifg-item" v-if="formData.radio3">
      <span class="conifg-item-title remark-title">跑马灯内容</span>
      <el-input
        class="conifg-item-remark"
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="formData.remark"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
import { editvideocollection, modifyvideocollection } from "@/api/sou";
export default {
  data() {
    return {
      formData: {
        radio: 0,
        radio1: 0,
        radio2: 0,
        radio3: 0,
        number: "90",
        remark: "",
      },
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.general-config {
  .conifg-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    &-title {
      flex-shrink: 0;
    }
    &-remark {
      margin-left: 10px;
      width: 600px;
    }
    &-desc {
      font-size: 12px;
      color: #c0c4cc;
    }
    &-radio {
      padding-top: 3px;
      margin: 0 10px;
    }
    &-number {
      width: 70px;
      margin: 0 10px;
    }
    .remark-title {
      align-self: flex-start;
    }
  }
}
</style>
