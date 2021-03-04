<template>
  <div
    style="
      width: 100%;
      background: #ffffff;
      position: fixed;
      top: 50px;
      bottom: 0;
    "
  >
    <div style="width: 48%; margin-top: 20px">
      <el-form
        :model="reasonForm"
        ref="reasonForm"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="直播名称:" prop="livingName">
          <el-input
            class="input-width"
            value="直播名称"
            v-model="reasonForm.livingName"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="任课老师:" prop="teachers">
          <el-select v-model="reasonForm.teachers" placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.teacher_id"
              :label="item.teacher_name"
              :value="{ value: item.teacher_id, label: item.teacher_name }"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :sm="24">
            <el-form-item label="直播封面:" prop="url">
              <div v-show="!haschoose">
                <div class="headPortrait el-icon-plus" @click="addIcon"></div>
                <div style="color: #aaa; ling-height: 20px">
                  <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
                  <p><span> 2. 推荐尺寸750*420px或者1:1</span></p>
                </div>
              </div>
              <div v-show="haschoose" class="imageBox">
                <i class="iconjia el-icon-plus" @click="addIcon"></i>
                <img
                  v-if="reasonForm.url"
                  style="width: 100%; height: 100%; border-radius: 3px"
                  :src="reasonForm.url"
                  alt=""
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上课时间:">
          <el-row>
            <el-col :sm="8">
              <el-date-picker
                v-model="reasonForm.value1"
                type="date"
                placeholder="选择日期"
                @change="timeChange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-col>
            <el-col :sm="8"> <p style="width: 10px"></p></el-col>
            <el-col :sm="8">
              <el-time-picker
                is-range
                arrow-control
                v-model="reasonForm.value2"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="dateChange"
                format="HH 时 mm 分 ss 秒"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="直播简介:" prop="textarea">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="reasonForm.textarea"
            maxlength="100"
            rows="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="图文详情:" prop="introduction">
          <kindeditor
            @kindeditorChange="changeParentTitle"
            :content="reasonForm.introduction"
            height="200px"
            id="caseAnalyse"
          />
        </el-form-item>
      </el-form>
      <imgDialog
        v-if="pictureVisible"
        @closeImg="closeImg"
        @clearUrl="clearUrl"
      ></imgDialog>
      <div style="margin-left: 151px; margin-top: 15px">
        <el-button @click="goback" style="width: 100px">取 消</el-button>
        <el-button v-if="$route.query.live_class_id" type="primary" @click="UpdateConfirm" style="width: 100px"
          >保存</el-button
        >
        <el-button v-else type="primary" @click="AddhandleConfirm" style="width: 100px"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reasonForm: {
        livingName: '',
        teachers: {},
        value1: '',
        value2:'',
        textarea: '',
        introduction: '',
        url: '',

      },
      copyForm: {},
      teacherList: [],
      addclass: '',
      pictureVisible: false,
      haschoose: false,
      rules: {
        livingName: [
          { required: true, message: '请填写直播名称', trigger: 'blur' },
        ],
        teachers: [
          { required: true, message: '请选择任课老师', trigger: 'blur' },
        ],
        url: [{ required: true, message: '请上传直播封面', trigger: 'blur' }],
        value1: [
          { required: true, message: '请选择上课时间', trigger: 'blur' },
        ],
        textarea: [
          { required: true, message: '请填写直播简介', trigger: 'blur' },
        ],
        introduction: [
          { required: true, message: '请完善图文详情', trigger: 'blur' },
        ],
      },
      editorDetail:{}
    }
  },
  watch:{
    copyForm(newVal,oldVal) {
      const {
         live_class_common,
         live_class_detail,
         live_class_icon,
         live_class_name,
         live_end_time,
         live_start_time,
         live_steam_time,
         teacher_id,
      } = newVal;
      this.reasonForm.livingName = live_class_name;
      this.reasonForm.teachers = { value: teacher_id};
      this.reasonForm.value1 = new Date(+live_steam_time);
      this.reasonForm.value2 = [new Date(+live_start_time),new Date(+live_end_time)];
      this.reasonForm.textarea = live_class_detail;
      this.reasonForm.introduction =live_class_common; 
      this.reasonForm.url = live_class_icon;
      this.haschoose = true
    }
  },
  created(){
  },
   mounted() {
    this.$api.getTeacherDrop(this, 'teacherList');
    this.$nextTick(()=> {
       if(this.$route.query.live_class_id) {
          this.$api.editOpenCourse(this,'copyForm');
       };
    })
  },
  methods: {
    timeChange(value) {
      console.log(value)
    },
    dateChange(value) {
      console.log(value)
    },
    UpdateConfirm() {
      this.$refs['reasonForm'].validate((valid) => {
        if (valid) {
          console.log('have submit!!!')
          this.$api.modifyOpenCourse(this,)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    AddhandleConfirm() {
      this.$refs['reasonForm'].validate((valid) => {
        if (valid) {
          console.log('have submit!!!')
          this.$api.createLiveForopenLive(this)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clearUrl() {
      this.pictureVisible = false
    },
    addIcon() {
      this.pictureVisible = true
    },
    closeImg(radioUrl) {
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.reasonForm.url = radioUrl
        this.reasonForm.cover_img = radioUrl
      } else {
        this.reasonForm.url = ''
        this.haschoose = false
        this.reasonForm.cover_img = ''
      }
    },
    changeParentTitle(txt) {
      console.log(txt)
      this.reasonForm.introduction = txt
    },
    goback() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.headPortrait {
  width: 240px;
  height: 135px;
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
.imageBox {
  width: 240px;
  height: 135px;
  position: relative;
}
.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 240px;
  height: 135px;
  line-height: 135px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
  cursor: pointer;
}
</style>
