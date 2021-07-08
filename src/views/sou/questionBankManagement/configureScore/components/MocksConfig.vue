

<template>
  <div class="mocks-config">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="考试方式" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">随机抽题</el-radio>
          <el-radio :label="1">指定章节</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="type-1" v-if="formData.type === 0">
        <el-form-item label="单选题" prop="score1">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number1"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score1"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="多选题" prop="score2">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number2"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score2"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="判断题" prop="score3">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number3"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score3"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="不定项题" prop="score4">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number4"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score4"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="填空题" prop="score5">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number5"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score5"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="简答题" prop="score6">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number6"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score6"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="案例题" prop="score7">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.number7"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.score7"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="多选题场景" prop="option_score_status">
          <el-radio-group v-model="formData.option_score_status">
            <el-radio :label="0">少选不得分</el-radio>
            <el-radio :label="1"
              >少选每个选项<el-input
                class="input-number"
                type="number"
                v-model="formData.option_score"
                placeholder="请输入"
                maxlength="10"
              />
              <span>分</span></el-radio
            >
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="type-2 chapter-list" v-else>
        <div class="list-item">
          <el-form-item label="单选题" prop="c_score1">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score1"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="多选题" prop="c_score2">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score2"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="判断题" prop="c_score3">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score3"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="不定项题" prop="c_score4">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score4"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="填空题" prop="c_score5">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score5"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="简答题" prop="c_score6">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score6"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="案例题" prop="c_score7">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.c_score7"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item
            label="多选题场景"
            prop="c_option_score_status"
            class="list-item-large"
          >
            <el-radio-group v-model="formData.c_option_score_status">
              <el-radio :label="0">少选不得分</el-radio>
              <el-radio :label="1"
                >少选每个选项<el-input
                  class="input-number"
                  type="number"
                  v-model="formData.c_option_score"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>分</span></el-radio
              >
            </el-radio-group>
          </el-form-item>
        </div>
        <div
          class="list-item"
          v-for="(item, index) in chpaterList"
          :key="index"
        >
          <div class="list-item-top">
            <span class="title">章节名称</span>
            <el-input
              class="input"
              readonly
              :value="item.chapter_name"
            ></el-input>
            <span class="desc">（{{ item.description }}）</span>
          </div>
          <div class="list-item-bottom">
            <span class="title">题目数量</span>
            <div class="container">
              <el-form-item label="单选">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[0].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="多选">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[1].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="判断" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[2].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="不定项">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[3].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="填空">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[4].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="简答">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[5].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="案例">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="item.chapter_config[6].topic_num"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>

      <el-form-item class="form-item-submit">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button
          type="primary"
          :loading="addLoading"
          @click="submitForm('formData')"
          >确 定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setDetailConfig, getDetailConfig } from "@/api/sou";
export default {
  name: "MocksConfig",
  props: {
    configId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        type: 0,
        // 随机
        number1: 0,
        number2: 0,
        number3: 0,
        number4: 0,
        number5: 0,
        number6: 0,
        number7: 0,
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0,
        score6: 0,
        score7: 0,
        option_score_status: 0,
        option_score: 0,
        // 指定章节
        c_score1: 0,
        c_score2: 0,
        c_score3: 0,
        c_score4: 0,
        c_score5: 0,
        c_score6: 0,
        c_score7: 0,
        c_option_score_status: 0,
        c_option_score: 0,
      },
      rules: {
        type: [{ required: true, message: "请选择", trigger: "change" }],
        score1: [{ required: true, message: "请输入", trigger: "blur" }],
        score2: [{ required: true, message: "请输入", trigger: "blur" }],
        score3: [{ required: true, message: "请输入", trigger: "blur" }],
        score4: [{ required: true, message: "请输入", trigger: "blur" }],
        score5: [{ required: true, message: "请输入", trigger: "blur" }],
        score6: [{ required: true, message: "请输入", trigger: "blur" }],
        score7: [{ required: true, message: "请输入", trigger: "blur" }],
        option_score_status: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        c_score1: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score2: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score3: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score4: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score5: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score6: [{ required: true, message: "请输入", trigger: "blur" }],
        c_score7: [{ required: true, message: "请输入", trigger: "blur" }],
        c_option_score_status: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      chpaterList: [],
      addLoading: false,
      detaiLoading: false,
      detailData: {},
    };
  },
  created() {
    this.getDetailConfig();
  },
  methods: {
    async getDetailConfig() {
      const data = {
        test_config_id: this.configId,
        type: 4,
      };
      this.detaiLoading = true;
      const res = await getDetailConfig(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
        // status 为1的是选中的
        this.formData.type = res.data[0].status === 1 ? 0 : 1;

        // 随机
        const detail = this.detailData[0].detail;
        detail.config.forEach((item, index) => {
          this.formData[`score${index + 1}`] = item.score;
          this.formData[`number${index + 1}`] = item.topic_num;
        });
        this.formData.option_score_status =
          +detail.multiple_special.option_score_status;
        this.formData.option_score = detail.multiple_special.option_score;
        // 指定章节
        const chapterDetail = this.detailData[1].detail;
        chapterDetail.config.forEach((item, index) => {
          this.formData[`c_score${index + 1}`] = item.score;
          this.formData[`c_number${index + 1}`] = item.topic_num;
        });
        this.formData.c_option_score_status =
          +chapterDetail.multiple_special.option_score_status;
        this.formData.c_option_score =
          chapterDetail.multiple_special.option_score;
        this.chpaterList = chapterDetail.chapter || [];
      }
    },
    async submit() {
      const data = this.detailData[this.formData.type];
      if (this.formData.type === 0) {
        // 随机
        data.detail.config.forEach((item, index) => {
          item.score = this.formData[`score${index + 1}`];
          item.topic_num = this.formData[`number${index + 1}`];
        });
        data.detail.multiple_special.option_score_status =
          this.formData.option_score_status;
        data.detail.multiple_special.option_score = this.formData.option_score;
      } else {
        // 指定章节
        data.detail.config.forEach((item, index) => {
          item.score = this.formData[`c_score${index + 1}`];
          item.topic_num = this.formData[`c_number${index + 1}`];
        });
        data.detail.multiple_special.option_score_status =
          this.formData.c_option_score_status;
        data.detail.multiple_special.option_score =
          this.formData.c_option_score;
      }
      data.status = 1;
      this.addLoading = true;
      const res = await setDetailConfig(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    hanldeCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.mocks-config {
  color: #606266;
  font-size: 14px;
  .mocks-header {
    font-size: 14px;
    padding: 0 0 4 0px 26px;
    .radio-title {
      margin-right: 20px;
    }
  }
  .el-form-item {
    width: 500px;
    /deep/.el-form-item__label {
      padding-right: 20px;
    }
    .m-r-30 {
      margin-right: 30px;
    }
    .input-number {
      margin: 0 10px;
      width: 90px;
    }
  }
  .chapter-list {
    margin-bottom: 20px;
    .list-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 16px;
      border-bottom: 1px solid #dcdfe6;
      /deep/.el-form-item {
        width: 260px;
        .input-number {
          margin: 0 10px;
          width: 80px;
        }
      }
      /deep/.el-form-item.list-item-large {
        width: 460px;
      }
      .list-item-top {
        margin-bottom: 30px;
        .title {
          margin-right: 20px;
        }
        .input {
          width: 200px;
        }
        .desc {
          margin-left: 10px;
        }
      }
      .list-item-bottom {
        display: flex;
        .title {
          width: 100px;
          line-height: 40px;
          margin-right: -32px;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          /deep/.el-form-item {
            width: 215px;
          }
          /deep/.el-form-item__label {
            padding-right: 0;
          }
        }
      }
    }
  }
}
</style>