<template>
  <div class="home">
    <section>
      <ul class="left-container">
        <li style="color:#909399">试卷名称</li>
        <li>全部题目({{ list }})</li>
        <li v-for="(item, index) of testList" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </section>
    <section class="right-container">
      <header>
        <div class="left-zoom">
          <search
            :hideTime="true"
            :hideOtherOption="true"
            :searchType="info"
          ></search>
          <div>
            <el-select
              v-model="selectList"
              placeholder="添加题目"
              clearable
              filterable
            >
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="primary" style="margin-left:20px"
              >批量录入</el-button
            >
          </div>
        </div>
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="schoolData"
            style="width: 100%"
            class="min_table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="index"
              label="题目序号"
              show-overflow-tooltip
              min-width="70"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="nickname"
              label="题干"
              min-width="210"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="describe"
              label="题目类型"
              min-width="150"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              min-width="130"
              align="center"
            >
              <template slot-scope="scope">
                <div style="display:flex;justify-content:space-around">
                  <el-button
                    type="text"
                    @click="editor(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="transform">转移</el-button>
                  <el-button type="text" @click="delbtn">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </header>
      <main>
        <el-button type="warning" @click="multiDel" style="margin-top:20px"
          >批量移动</el-button
        >
        <el-button type="warning" @click="multiDel" style="margin-top:20px"
          >批量删除</el-button
        >
      </main>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      info: 'info',
      selectList: [
        {
          value: '职称类',
          val: 1,
        },
      ],
      schoolData: [
        {
          index: '1',
          nickname: '明天会更好',
          describe: '世界上没有完全相同的两个人，生活的再平凡，也是限量版。',
          order: '0',
          number: '10',
          status: 0,
        },
        {
          index: '2',
          nickname: '过好每一天',
          describe: '世界上没有完全相同的两个人，生活的再平凡，也是限量版。',
          order: '1',
          number: '10',
          status: 1,
        },
      ],
      multipleSelection: [],
      list: '23',
      testList: [
        {
          name: '2014年历年真题（10）',
        },
        {
          name: '2015年历年真题（10）',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    transform() {},
    multiDel() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
      }
    },
    delbtn() {
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select .el-input__inner:nth-child(1) {
  color: #fff;
  //  background: #199FFF;
  width: 110px;
}
.home {
  display: flex;
  background: #ffffff;
  // margin: 23px 0px 0px 23px;
  // padding: 23px 0px 23px 23px;
  padding: 30px;
  font-size: 14px;
}
.left-container {
  width: 287px;
  min-height: 500px;
  border: 1px solid rgba(215, 215, 215, 1);
  li {
    list-style: none;
    height: 48px;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    line-height: 48px;
    padding-left: 20px;
    color: #7f7f7f;
  }
}

.right-container {
  margin-left: 23px;
  width: 100%;
  margin-right: 35px;
}
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  .left-zoom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
