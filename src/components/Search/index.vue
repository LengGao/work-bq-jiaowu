<template>
  <section>
    <breadcrumb style="display:flex;justify-content:flex-start"></breadcrumb>
    <div class="searchBox">
      <div class="datepicker"
           v-show="!hideTime">
        <el-date-picker v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <el-input placeholder="请输入内容"
                prefix-icon="el-icon-search"
                style="width:200px"
                v-model="input2">
      </el-input>
      <el-button class="time_btn"
                 @click="searchSchool"
                 type="success"
                 style="margin-left:10px;"
                 v-show="!hideTime">查询</el-button>
      <el-button type="text"
                 @click="screen">展开筛选</el-button>
    </div>
    <div class="screenBox"
         v-show="screenShow">
      <el-select v-model="value"
                 placeholder="课程类型">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value"
                 placeholder="课程名称">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value"
                 placeholder="所属机构">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value"
                 placeholder="所属老师">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value"
                 placeholder="渠道来源">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value"
                 placeholder="成交状态">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      // hideTime: false,
      value: '',
      value1: '',
      input2: '',
      screenShow: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ]
    }
  },
  props: {
    // navList: Array,
    // api: {
    //   type: String,
    //   required: true
    // },
    // selectList: {
    //   type: Array,
    //   default: () => [
    //     {
    //       name: '关键词',
    //       val: 1
    //     }
    //   ]
    // },
    hideTime: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    searchSchool() {
      //   this.$emit("getTable", "page", 1);
      // this.$api[this.api](this, "schoolData");
    },
    screen() {
      console.log(this.screenShow)
      this.screenShow = !this.screenShow
    }
  },
  watch: {
    schoolData(val) {
      //   把数据传递到父组件的 getTable 事件中
      // this.$emit("getTable", "data", val);
    }
  }
}
</script>

<style lang='scss' scoped>
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
</style>