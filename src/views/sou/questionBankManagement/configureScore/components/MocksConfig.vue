

<template>
  <div class="mocks-config">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="考试方式" prop="video_chapter_name">
        <el-radio-group v-model="formData.type">
          <el-radio label="1">随机抽题</el-radio>
          <el-radio label="2">指定章节</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="type-1" v-if="formData.type === '1'">
        <el-form-item label="单选题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="多选题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="判断题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="填空题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="简答题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="案例题" prop="video_chapter_name">
          <span>共</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span class="m-r-30">题</span>
          <span>每题</span>
          <el-input
            class="input-number"
            type="number"
            v-model="formData.video_chapter_name"
            placeholder="请输入"
            maxlength="10"
          />
          <span>分</span>
        </el-form-item>
        <el-form-item label="多选题场景" prop="video_chapter_name">
          <el-radio-group v-model="formData.resource">
            <el-radio label="1">少选不得分</el-radio>
            <el-radio label="2"
              >少选每个选项<el-input
                class="input-number"
                type="number"
                v-model="formData.video_chapter_name"
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
          <el-form-item label="单选题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="多选题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="判断题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="填空题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="简答题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item label="案例题" prop="video_chapter_name">
            <span>每题</span>
            <el-input
              class="input-number"
              type="number"
              v-model="formData.video_chapter_name"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span>
          </el-form-item>
          <el-form-item
            label="多选题场景"
            prop="video_chapter_name"
            class="list-item-large"
          >
            {{ formData.resource }}
            <el-radio-group v-model="formData.resource">
              <el-radio label="1">少选不得分</el-radio>
              <el-radio label="2"
                >少选每个选项<el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>分</span></el-radio
              >
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="list-item">
          <div class="list-item-top">
            <span class="title">章节名称</span>
            <el-input class="input" disabled></el-input>
            <span class="desc"
              >（此章节现有 单选题50道；多选题10道；判断题 0 道；填空题 0
              道；简答题 0 道；案例题 0 道；）</span
            >
          </div>
          <div class="list-item-bottom">
            <span class="title">题目数量</span>
            <div class="container">
              <el-form-item label="单选" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="多选" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="判单" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="填空" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="简答" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
                  placeholder="请输入"
                  maxlength="10"
                />
                <span>题</span>
              </el-form-item>
              <el-form-item label="案例" prop="video_chapter_name">
                <el-input
                  class="input-number"
                  type="number"
                  v-model="formData.video_chapter_name"
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
import {
  editvideochapter,
  addvideochapter,
  getVideochapterDetail,
} from "@/api/sou";
export default {
  name: "OverTheYearConfig",
  props: {
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        type: "1",
        video_chapter_name: "",
        video_chapter_profile: "",
        video_chapter_sort: "",
      },
      rules: {
        video_chapter_name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        video_chapter_sort: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },

  methods: {
    async getVideochapterDetail() {
      const data = {
        video_chapter_id: this.id,
      };
      this.detaiLoading = true;
      const res = await getVideochapterDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.video_chapter_id = this.id;
      } else {
        data.video_collection_id = this.$route.query?.video_collection_id || "";
      }
      const api = this.id ? editvideochapter : addvideochapter;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
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
        }
      }
    }
  }
}
</style>