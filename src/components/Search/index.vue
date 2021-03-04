<template>
  <section>
    <div class="searchBox">
      <div class="inline_date_box select_top" v-show="selectItems">
        <!-- <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select"> -->
        <el-select
          v-model="keytype"
          slot="prepend"
          :placeholder="placeholder"
          clearable
          @change="searchSchool"
        >
          <el-option
            :label="item.category_name"
            :value="item.category_id"
            v-for="(item, index) in selectList"
            :key="index"
          ></el-option>
        </el-select>
        <!-- <el-button slot="append" icon="el-icon-search" @click="searchSchool"></el-button> -->
        <!-- </el-input> -->
      </div>
      <div class="datepicker" v-if="!hideTime">
        <el-date-picker
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          clearable
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-select v-model="value" placeholder="课程类型" v-if="courseTypeShow">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px"
        clearable
        v-model="input2"
        @keypress.native.enter="searchSchool"
      ></el-input>
      <el-button
        class="time_btn"
        @click="searchSchool"
        style="margin-left:10px;"
        type="success"
        >查询</el-button
      >
      <el-button
        v-if="!hideOtherOption"
        class="time_btn"
        @click="reset"
        type="primary"
        style="margin-left:10px;"
        >重置</el-button
      >
      <el-button type="text" @click="expandFilter" v-if="!hideOtherOption">{{
        screenText
      }}</el-button>
    </div>
    <div
      class="screenBox"
      :class="statusNum == 3 ? 'screenWidth' : ''"
      v-show="screenShow"
    >
      <el-select
        v-model="ruleForm.category_id"
        placeholder="课程类型"
        @change="getCourName"
      >
        <el-option
          v-for="item in classifiData.list"
          :key="item.category_id"
          :label="item.category_name"
          :value="item.category_id"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.course_id"
        placeholder="课程名称"
        @change="searchSchool"
      >
        <el-option
          v-for="item in courseData.list"
          :key="item.course_id"
          :label="item.course_name"
          :value="item.course_id"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.organization_id"
        placeholder="所属机构"
        @change="getCampus"
        v-if="organHide"
      >
        <el-option
          v-for="item in organData.list"
          :key="item.institution_id"
          :label="item.institution_name"
          :value="item.institution_id"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.campus_id"
        placeholder="所属校区"
        v-if="schoolHide"
        @change="searchSchool"
      >
        <el-option
          v-for="item in campusData.list"
          :key="item.institution_id"
          :label="item.institution_name"
          :value="item.institution_id"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.teacher_id"
        placeholder="所属老师"
        v-if="teacherHide"
        @change="searchSchool"
      >
        <el-option
          v-for="item in teacherData"
          :key="item.teacher_id"
          :label="item.teacher_name"
          :value="item.teacher_id"
        ></el-option>
      </el-select>
      <el-select
        @change="searchSchool"
        v-model="ruleForm.classroom_id"
        placeholder="班级名称"
        v-if="classNameHide"
      >
        <el-option
          v-for="item in classData.list"
          :key="item.classroom_id"
          :label="item.classroom_name"
          :value="item.classroom_id"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.channel_id"
        placeholder="渠道来源"
        v-if="channelHide"
        @change="searchSchool"
      >
        <el-option
          v-for="item in channelData.field_content"
          :key="item.field_id"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select
        v-model="ruleForm.dealType"
        placeholder="成交状态"
        v-if="dealStatusHide"
        @change="searchSchool"
      >
        <el-option
          v-for="item in dealData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  model: {
    prop: 'selecteValue',
    event: 'update',
  },
  data() {
    return {
      // hideTime: false,
      page: 1,
      value: '',
      dataTime: '',
      input2: '',
      ruleForm: {
        category_id: '',
        course_id: '',
        organization_id: '',
        campus_id: '',
        teacher_id: '',
        dealType: '',
        classroom_id: '',
        channel_id: '',
      },
      screenText: '展开筛选',
      screenShow: false,
      classifiData: [],
      courseData: [],
      organData: [],
      campusData: [],
      teacherData: [],
      classData: [],
      channelData: [],
      keytype: '',
      dealData: [
        {
          value: 1,
          label: '未成交',
        },
        {
          value: 2,
          label: '已成交',
        },
        {
          value: 3,
          label: '已退费',
        },
      ],
      dataList: [],
    }
  },
  selecteValue: {
    type: Object,
  },
  props: {
    searchType: {
      type: String,
      default: 'success',
    },
    selectList: {
      default: () => [
        {
          category_name: '',
          category_id: '',
        },
      ],
    },
    statusNum: {
      type: Number,
    },
    //题库管理下需要的参数
    problem_chapter_id: {
      type: String,
    },
    api: {
      type: String,
    },
    bucket_id: '',
    data: {
      type: String,
      default: 'dataList',
    },
    hideTime: {
      type: Boolean,
      default: false,
    },
    hideOtherOption: {
      type: Boolean,
      default: false,
    },
    selectItems: {
      type: Boolean,
      default: false,
    },
    courseTypeShow: {
      type: Boolean,
      default: false,
    },
    //班级名称
    classNameHide: {
      type: Boolean,
      default: true,
    },
    //所属老师
    teacherHide: {
      type: Boolean,
      default: true,
    },
    //所属机构
    organHide: {
      type: Boolean,
      default: true,
    },
    //所属校区
    schoolHide: {
      type: Boolean,
      default: true,
    },
    //渠道来源
    channelHide: {
      type: Boolean,
      default: true,
    },
    //成交状态
    dealStatusHide: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  created() {},
  mounted() {},
  computed: {
    searchData() {
      let start_time = ''
      let end_time = ''
      if (this.dataTime) {
        start_time = this.dataTime[0]
        end_time = this.dataTime[1]
      } else {
        start_time = ''
        end_time = ''
      }
      console.log(this.input2)
      this.name = this.input2 == '' ? '' : this.input2
      let datas = {
        name: this.input2 == '' ? '' : this.input2,
        page: this.page,
        start_time: start_time,
        end_time: end_time,
        statusNum: this.statusNum,
        id: this.keytype,
        dealType: this.ruleForm.dealType,
        course_id: this.ruleForm.course_id,
        category_id: this.ruleForm.category_id,
        organization_id: this.ruleForm.organization_id,
        campus_id: this.ruleForm.campus_id,
        teacher_id: this.ruleForm.teacher_id,
        classroom_id: this.ruleForm.classroom_id,
        channel_id: this.ruleForm.channel_id,
      }
      return datas
    },
  },
  methods: {
    reset() {
      this.ruleForm = {
        category_id: '',
        course_id: '',
        organization_id: '',
        campus_id: '',
        teacher_id: '',
        dealType: '',
        classroom_id: '',
        channel_id: '',
      }
      this.keytype = ''
      this.dataTime = ''
      this.input2 = ''
      this.dataTime = ''
    },
    getCampus() {
      if (this.ruleForm.organization_id != '') {
        this.ruleForm.campus_id = ''
        this.$api.getSubBlock(this, 'campusData')
        this.searchSchool()
      }
    },
    getCourName() {
      // console.log(this.ruleForm.category_id)
      if (this.ruleForm.category_id != '') {
        this.ruleForm.course_id = ''
        this.$api.getCourseManage(this, 'courseData')
        this.searchSchool()
      }
    },
    searchSchool() {
      console.log(this.dataTime)
      let start_time = ''
      let end_time = ''
      if (this.dataTime) {
        start_time = this.dataTime[0]
        end_time = this.dataTime[1]
      } else {
        start_time = ''
        end_time = ''
      }
      console.log(this.input2)
      this.name = this.input2 == '' ? '' : this.input2
      let datas = {
        name: this.input2 == '' ? '' : this.input2,
        page: this.page,
        start_time: start_time,
        end_time: end_time,
        statusNum: this.statusNum,
        id: this.keytype,
        dealType: this.ruleForm.dealType,
        course_id: this.ruleForm.course_id,
        category_id: this.ruleForm.category_id,
        organization_id: this.ruleForm.organization_id,
        campus_id: this.ruleForm.campus_id,
        teacher_id: this.ruleForm.teacher_id,
        classroom_id: this.ruleForm.classroom_id,
        channel_id: this.ruleForm.channel_id,
      }
      this.$emit('getTable', 'page', 1, datas)
      this.$api[this.api](this, 'dataList', datas)
      this.selecteValue = datas
    },
    expandFilter() {
      this.screenShow = !this.screenShow
      console.log(this.hideOtherOption)
      if (this.screenShow) {
        this.screenText = '收起筛选'
        //课程分类
        this.$api.getCategoryList(this, 'classifiData')
        if (this.organHide == true) {
          //推荐机构列表
          this.$api.getRecommender(this, 'organData')
        }
        if (this.teacherHide == true) {
          //授课老师列表
          // this.$api.getTeacherList(this, 'teacherData')
          this.$api.getTeacherDrop(this, 'teacherData')
        }
        if (this.classNameHide == true) {
          //班级名称
          this.$api.getClassroomList(this, 'classData')
        }
        if (this.channelHide == true) {
          //渠道来源
          let field_text = '渠道来源'
          this.$api.getfieldinfo(this, 'channelData', field_text)
        }
      } else {
        this.screenText = '展开筛选'
      }
    },
  },
  watch: {
    dataList(val) {
      //   把数据传递到父组件的 getTable 事件中
      console.log()
      this.$emit('getTable', 'data', val)
    },
    searchData(val) {
      // console.log(val,"监听 searchData 执行");
      this.$emit('update', val)
    },
  },
}
</script>

<style lang="scss" scoped>
.searchBox {
  display: flex;
  .el-input {
    margin-left: 10px;
  }
}
.screenWidth {
  max-width: 500px !important;
}
.screenBox {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  .el-select {
    margin-right: 10px;
  }
}
// .inline_date_box {
//   margin-left: 16px;
//   margin-bottom: 10px;
//   display: inline-block;
// }
</style>
