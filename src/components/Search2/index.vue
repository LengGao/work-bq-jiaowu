<template>
  <section>
    <div class="searchBox">
      <!-- <template v-if="selectGroup"> -->
      <el-select
        v-if="organShow"
        v-model="ruleForm.organization_id"
        style="width:130px;margin-right:10px"
        slot="prepend"
        filterable
        placeholder="所属机构"
        clearable
        @change="getCampus"
      >
        <el-option
          :label="item.institution_name"
          :value="item.institution_id"
          v-for="(item, index) in organList"
          :key="index"
        ></el-option>
      </el-select>
      <el-select
        filterable
        v-if="campusShow"
        style="width:130px;margin-right:10px"
        v-model="ruleForm.institution_id"
        slot="prepend"
        placeholder="所属校区"
        clearable
      >
        <el-option
          :label="item.institution_name"
          :value="item.institution_id"
          v-for="(item, index) in campusData.list"
          :key="index"
        ></el-option>
      </el-select>
      <el-select
        filterable
        v-if="classShow"
        v-model="ruleForm.classroom_id"
        slot="prepend"
        placeholder="班级名称"
        clearable
      >
        <el-option
          :label="item.classroom_name"
          :value="item.classroom_id"
          v-for="(item, index) in classList"
          :key="index"
        ></el-option>
      </el-select>
      <!-- </template> -->
      <div class="datepicker" v-if="hideTime">
        <el-date-picker
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-select
        filterable
        v-if="courseTypeShow"
        v-model="keytype"
        slot="prepend"
        :placeholder="selectText"
        clearable
        style="margin-left:10px"
      >
        <el-option
          :label="item.category_name"
          :value="item.category_id"
          v-for="(item, index) in selectList"
          :key="index"
        ></el-option>
      </el-select>
      <el-select
        filterable
        v-if="classTypeShow"
        v-model="course_type"
        slot="prepend"
        placeholder="课程班型"
        clearable
        style="margin-left:10px"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in classTypeList"
          :key="index"
        ></el-option>
      </el-select>
      <el-input
        v-if="contentShow"
        :placeholder="inputText"
        prefix-icon="el-icon-search"
        style="width:200px"
        v-model="input2"
        clearable
        @keypress.native.enter="searchSchool"
      ></el-input>
      <el-button
        class="time_btn"
        @click="searchSchool"
        style="margin-left:10px;"
        >查询</el-button
      >
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      // hideTime: false,
      page: 1,
      value: '',
      dataTime: '',
      input2: '',
      screenShow: false,
      keytype: '',
      course_type: '',
      ruleForm: {
        organization_id: '',
        classroom_id: '',
        institution_id: '',
      },
      campusData: [],
      options: [
        {
          value: '选项1',
          label: '111',
        },
      ],

      dataList: [],
    }
  },
  props: {
    searchType: {
      type: String,
      default: 'success',
    },
    operation_type: {
      type: Number,
      default: 0,
    },
    problem_chapter_id: {
      type: Number,
      default: 0,
    },
    //是否上下关联
    isRelation: {
      type: Boolean,
      default: true,
    },
    selectList: {
      default: () => [
        {
          category_name: '请选择类型',
          category_id: '12',
        },
      ],
    },

    //所属机构
    organList: {
      default: () => [
        {
          institution_name: '请选择类型',
          institution_id: '12',
        },
      ],
    },
    //班级名称
    classList: {
      default: () => [
        {
          classroom_name: '请选择类型',
          classroom_id: '12',
        },
      ],
    },
    //课程班型
    classTypeList: {
      default: () => [
        {
          value: 1,
          label: '单科班',
        },
        {
          value: 2,
          label: '套餐班',
        },
      ],
    },
    //所属校区
    campusList: {
      default: () => [
        {
          institution_name: '请选择类型',
          institution_id: '12',
        },
      ],
    },
    api: {
      type: String,
    },
    bucket_id: '',
    data: {
      type: String,
    },
    organShow: {
      type: Boolean,
      default: false,
    },
    campusShow: {
      type: Boolean,
      default: false,
    },
    classShow: {
      type: Boolean,
      default: false,
    },
    hideTime: {
      type: Boolean,
      default: false,
    },
    contentShow: {
      type: Boolean,
      default: false,
    },
    courseTypeShow: {
      type: Boolean,
      default: false,
    },
    classTypeShow: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    inputText: {
      type: String,
      default: '请选择',
    },
    selectText: {
      type: String,
      default: '课程类型',
    },
    typeTx: {
      type: String,
      default: '',
    },
  },
  created() {},
  methods: {
    getCampus() {
      if (this.isRelation) {
        this.$api.getSubBlock(this, 'campusData')
      }
    },
    searchSchool() {
      let start_time = ''
      let end_time = ''
      if (this.dataTime) {
        start_time = this.dataTime[0]
        end_time = this.dataTime[1]
      } else {
        start_time = ''
        end_time = ''
      }
      console.log(start_time, end_time)
      this.name = this.input2 == '' ? '' : this.input2
      var datas = {
        name: this.input2 == '' ? '' : this.input2,
        page: this.page,
        id: this.keytype,
        operation_type: this.operation_type,
        problem_chapter_id: this.problem_chapter_id,
        course_type: this.course_type,
        organization_id: parseInt(this.ruleForm.organization_id),
        institution_id: parseInt(this.ruleForm.institution_id),
        classroom_id: parseInt(this.ruleForm.classroom_id),
        start_time: start_time,
        end_time: end_time,
        type: this.typeTx,
      }
      console.log(datas)
      this.$emit('getTable', 'page', 1, datas)
      this.$api[this.api](this, 'dataList', datas)
    },
    screen() {
      console.log(this.screenShow)
      this.screenShow = !this.screenShow
    },
  },
  watch: {
    dataList(val) {
      //   把数据传递到父组件的 getTable 事件中
      this.$emit('getTable', 'data', val)
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
