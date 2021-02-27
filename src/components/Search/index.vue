<template>
  <section>
    <div class="searchBox">
      <div class="inline_date_box select_top" v-show="selectItems">
        <!-- <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select"> -->
        <el-select v-model="keytype" slot="prepend" :placeholder="placeholder">
          <el-option
            :label="item.category_name"
            :value="item.category_id"
            v-for="(item,index) in selectList"
            :key="index"
          ></el-option>
        </el-select>
        <!-- <el-button slot="append" icon="el-icon-search" @click="searchSchool"></el-button> -->
        <!-- </el-input> -->
      </div>
      <div class="datepicker" v-if="!hideTime">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px"
        v-model="input2"
        @keypress.native.enter="searchSchool" 
      ></el-input>
      <el-button
        class="time_btn"
        @click="searchSchool"
        :type="searchType"
        style="margin-left:10px;"
      >查询</el-button>
      <el-button type="text" @click="screen" v-if="!hideOtherOption">展开筛选</el-button>
    </div>
    <div class="screenBox" v-show="screenShow">
      <el-select v-model="value" placeholder="课程类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="课程名称">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="所属机构">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="所属老师">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="渠道来源">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="成交状态">
        <el-option
          v-for="item in options"
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
  name: "Search",
  data() {
    return {
      // hideTime: false,
      page: 1,
      value: "",
      value1: "",
      input2: "",
      screenShow: false,
      keytype: '',
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      dataList:[],
    };
  },
  props: {
    searchType: {
      type: String,
      default: "success"
    },
    selectList: {
      default: () =>[ {
        
        category_name:'请选择类型',
        category_id:'12'
      }
      ]
    },
    api: {
      type: String,
    },
    bucket_id:'',
    data: {
      type: String
    },
    hideTime: {
      type: Boolean,
      default: false
    },
    hideOtherOption: {
      type: Boolean,
      default: false
    },
    selectItems: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  methods: {
    searchSchool() {
      this.name = this.input2 == "" ? "" : this.input2
      var datas = {
        name: this.input2 == "" ? "" : this.input2,
        page: this.page
      };
      console.log(datas)
      this.$emit("getTable", "page", 1, datas);
      this.$api[this.api](this, 'dataList', datas);
    },
    screen() {
      console.log(this.screenShow);
      this.screenShow = !this.screenShow;
    }
  },
  watch: {
    dataList(val) {
      //   把数据传递到父组件的 getTable 事件中
      this.$emit("getTable", "data", val);
    }
  }
};
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
