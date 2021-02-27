<template>
  <div>
    <el-upload
      :action="rootDir + url.uploadImage"
      name="image"
      ref="upload"
      list-type="picture"
      :multiple="false"
      :data="ruleForm"
      :file-list="fileList"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"

    >
      <el-button size="small" slot="trigger" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      <div v-if="icons">qweweqewqeqwe</div>
    </el-upload>
  </div>
</template>
<script>
// import {policy} from '@/api/oss'
import url from "@/assets/js/url";
let defaultfileList = {
    name:'',
    url: ''
}
export default {
  name: "singleUpload",
  props: {
    value: String,
    ruleForm:Object,
    icon:''
  },
  data() {
    return {
      url,
      icons:false,
      dialogVisible: false,
      fileList: []
    };
  },
  mounted(){
    if(this.icon != undefined)
      setTimeout(() => {
         this.change()
      }, 1000);

  },
  methods: {
    change(){
      let that = this
       that.fileList.push({
          name:'图标',
          url:that.icon })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(res,file) {
      console.log(res,file)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 " + 10 + "MB!");
      }
      return isLt2M;
    },
    handleUploadSuccess(res, file) {
      this.fileList.pop();
      this.$emit('imgSuccess',res, file)     
    }
  }
};
</script>
<style>
</style>


