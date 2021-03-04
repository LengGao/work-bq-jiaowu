<template>
  <section class="virtualTestSeting">
    <!-- <el-card class="form-container" shadow="never"> -->
    <el-form
      :model="option.info"
      :rules="rules"
      ref="option.infoFrom"
      label-width="150px"
    >
      <el-form-item label="考试方式: ">
        <el-radio-group v-model="check_value" @change="changeLabel">
          <el-radio :label="1">随机抽题</el-radio>
          <el-radio :label="2">指定章节</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="check_value == 1 ? true : false">
        <el-form-item label="单选题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.single.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>

          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.single.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="多选题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.multiple.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>
          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.multiple.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="判断题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.judge.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>

          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.judge.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="填空题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.fill_vacancy.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>

          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.fill_vacancy.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="简答题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.brief.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>

          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.brief.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="案例题: ">
          <el-col class="line" :span="1">共</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.scene.topics_num"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">题</el-col>

          <el-col class="line" :span="2">每题</el-col>
          <el-col :span="4">
            <el-input
              v-model="option.info.scene.topics_score"
              size="small"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="1">分</el-col>
        </el-form-item>
        <el-form-item label="多选题: ">
          <el-col :span="10">
            <el-radio-group
              v-model="option.info.multiple_choice_scenario.state"
            >
              <el-radio :label="1">少选不得分</el-radio>
              <el-radio :label="2">少选每个选项扣</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="4" class="line">
            <el-input
              v-model="option.info.multiple_choice_scenario.deduct_points"
              size="mini"
              type="number"
            ></el-input>
          </el-col>
          <el-col class="line" :span="2">分</el-col>
        </el-form-item>
      </div>
      <div v-show="check_value == 1 ? false : true" style="margin-left:90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="单选题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.single.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="多选题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.multiple.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="判断题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.judge.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="填空题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.fill_vacancy.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简答题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.brief.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案例题: ">
              <el-col :span="3">每题</el-col>
              <el-col :span="3.8">
                <el-input
                  v-model="appointOption.info.scene.topics_score"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="1">分</el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="多选题场景: ">
              <el-col :span="7">
                <el-radio-group
                  v-model="appointOption.info.multiple_choice_scenario.state"
                >
                  <el-radio :label="1">少选不得分</el-radio>
                  <el-radio :label="2">少选每个选项扣</el-radio>
                </el-radio-group>
              </el-col>
              <el-col :span="3.6" class="line">
                <el-input
                  v-model="
                    appointOption.info.multiple_choice_scenario.deduct_points
                  "
                  size="mini"
                  type="number"
                ></el-input>
              </el-col>
              <el-col class="line" :span="2">分</el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <ul class="wrapper-list">
          <li
            v-for="(item, index) in appointOption.info.chapter_config"
            :key="index"
            class="list-data"
          >
            <el-form-item label="章节名称：" class="el_input100">
              <el-input
                v-model="item.problem_chapter_name"
                disabled
                style="max-width:280px"
              ></el-input>
              {{ item.message }}
            </el-form-item>
            <el-form-item label="题目数量：" class="el_input100">
              <el-col :span="4" class="line">
                单选
                <el-input
                  v-model="item.single_num"
                  size="mini"
                  style="max-width:70px"
                ></el-input
                >题
              </el-col>
              <el-col :span="4" class="line">
                多选
                <el-input
                  v-model="item.multiple_num"
                  size="mini"
                  style="max-width:70px"
                ></el-input
                >题
              </el-col>
              <el-col :span="4" class="line">
                判断
                <el-input
                  v-model="item.judge_num"
                  size="mini"
                  style="max-width:70px"
                ></el-input
                >题
              </el-col>
              <el-col :span="4" class="line">
                填空
                <el-input
                  v-model="item.fill_vacancy_num"
                  style="max-width:70px"
                  size="mini"
                ></el-input
                >题
              </el-col>
              <el-col :span="4" class="line">
                简答
                <el-input
                  v-model="item.brief_num"
                  size="mini"
                  style="max-width:70px"
                ></el-input
                >题
              </el-col>
              <el-col :span="4" class="line">
                案例
                <el-input
                  v-model="item.scene_num"
                  size="mini"
                  style="max-width:70px"
                ></el-input
                >题
              </el-col>
            </el-form-item>
          </li>
          <span> 单选题一共有{{ countTotal }} </span>
        </ul>
      </div>

      <el-form-item>
        <el-button v-if="!isEdit" @click="goback()">返回</el-button>
        <el-button type="primary" @click="onSubmit('option.infoFrom')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </section>
</template>
<script>
const defaultOption = {
  info: {
    single: null,
    multiple: null,
    judge: null,
    fill_vacancy: null,
    scene: null,
    multiple_choice_scenario: null,
    check_value: 1,
  },
}
export default {
  name: 'virtualTestSeting',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      option: Object.assign({}, defaultOption),
      appointOption: Object.assign({}, defaultOption),
      icon: '',
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur',
          },
        ],
        logo: [{ required: true, message: '请输入分类logo', trigger: 'blur' }],
        sort: [{ required: true, message: '排序必须为数字' }],
        countTotal: '',
      },
      id: '',
      check_value: 1,
    }
  },
  //   computed: {
  //     countTotal: function () {
  //         let total = 0;
  //         this.appointOption.info.chapter_config.forEach(function (item) {
  //             total += item.single_num
  //         })
  //         console.log(total)
  //         return total
  //     }
  // },
  created() {
    this.$api.getExamVirtualExtendsInfo(this)
  },
  methods: {
    onInput() {
      this.$forceUpdate()
    },
    changeLabel(data) {
      console.log(this.check_value)
      this.appointOption.check_value = this.check_value
    },
    goback(res, file) {
      this.$router.go(-1)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            if (this.check_value == 1) {
              this.$api.updateExamExtends(this, 'option')
            } else {
              this.$api.updateExamExtends(this, 'appointOption')
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.option.info = Object.assign({}, {})
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  width: 100px;
}
.virtualTestSeting {
  margin-top: 40px;
}
.wrapper-list {
  display: flex;
  flex-direction: column;
  list-style: none;
}
.list-data {
  padding-top: 20px;
  border-top: 1px solid #dcdfe6;
}
.form-container {
  width: 1080px !important;
}
/deep/ .el-input--mini > input {
  width: 70px;
}
.el_input100 {
  width: 100%;
  .el-form-item__content {
    width: calc(100% - 100px);
  }
}
/deep/ .is-disabled > .el-input__inner {
  width: 240px !important;
}
/deep/.el_input100 > .el-form-item__label {
  width: auto !important;
}
/deep/.list-data > .el_input100 > .el-form-item__content {
  margin: 0 !important;
}
/deep/ .el-col-8 > .el-form-item > .el-form-item__label {
  width: auto !important;
}
/deep/ .el-col-8 > .el-form-item > .el-form-item__content {
  margin: 0 !important;
}
/deep/ .el-col-24 > .el-form-item > .el-form-item__label {
  width: auto !important;
}
/deep/ .el-col-24 > .el-form-item > .el-form-item__content {
  margin: 0 !important;
}
/deep/ .el-col-4 {
  width: 14.6% !important;
}
.wrapper-list > li:last-child {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
</style>
