<template>
  <!--录入成绩弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="900px"
    class="add-class"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-row>
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p>学生姓名</p>
            <span>{{ userOptions.user_realname }}</span>
          </div>
        </el-col>
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p>手机号码</p>
            <span>{{ userOptions.telphone }}</span>
          </div>
        </el-col>
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p>考试计划</p>
            <span>{{ userOptions.plan_name }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in subject_item" :key="index">
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p class="subject_name">{{ item.subject_name }}:</p>
            <el-input
              type="number"
              @mousewheel.native.prevent
              style="width: 97px"
              placeholder="请输入分数"
              :max="item.total_score"
              v-model="item.score"
              @input="subjectInput(subject_item)"
            ></el-input>
          </div>
        </el-col>
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p>总分</p>
            <span>
              {{ item.total_score }}
            </span>
          </div>
        </el-col>
        <el-col :lg="8" :xs="8" :sm="8" :xl="8">
          <div class="subject_box">
            <p>考试状态</p>
            <span
              :class="
                item.score >= item.pass_score ? 'qualified' : 'unqualified'
              "
            >
              {{ item.score >= item.pass_score ? "合格" : "不合格" }}
            </span>
          </div>
        </el-col>
        <div style="">
          <el-col
            :lg="8"
            :xs="8"
            :sm="8"
            :xl="8"
            v-show="item.children && item.children.length"
            v-for="(v, i) in item.children"
            :key="i"
          >
            <div class="subject_sub_box">
              <p>
                {{ v.subject_name }}
              </p>

              <el-input
                type="number"
                @mousewheel.native.prevent
                style="width: 97px"
                placeholder="请输入分数"
                v-model="v.score"
                @input="subjectChildInput(item)"
              ></el-input>
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="合计总分">
            {{ totalScore + "/" + userOptions.total_score }}</el-form-item
          >
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="成绩状态" prop="">
            <el-select
              v-model="userOptions.grade_status"
              placeholder="请选择所属项目"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="handleConfirm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getPlanGradeDetail, saveGrade } from "@/api/exa";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },

    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addLoading: false,
      grade_status: "",
      totalScore: 0,
      subject_item: [],
      userOptions: {},
      formData: {},
      visible: this.value,
      rules: {
        classroom_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        category_id: [{ required: true, message: "请选择", trigger: "change" }],
        master_teacher_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    subject_item(newVal, oldVal) {
      console.log(newVal);
    },
  },
  methods: {
    handleConfirm(formName) {
      console.log(this.subject_item);
      //对题型格式进行处理
      var formData = {};
      this.subject_item.forEach((i) => {
        formData[i.parameter_name] = i.score;
        if (i.children && i.children.length) {
          i.children.forEach((vi) => {
            formData[vi.parameter_name] = vi.score;
          });
        }
      });
      this.formData = formData;
      console.log(formData);
      this.saveGrade();
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert('submit!');
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    async saveGrade() {
      const data = {
        ...this.formData,
        id: this.userOptions.id,
        grade_status: this.userOptions.grade_status,
      };

      this.addLoading = true;
      const res = await saveGrade(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    subjectChildInput(data) {
      console.log(data);
      var totalScore = 0;
      data.children.forEach((i) => {
        console.log(i);
        totalScore += parseFloat(i.score);
      });
      if (data.score < totalScore) {
        this.$message.warning(
          "当前所有题型总分不能大于" +
            data.subject_name +
            "" +
            data.score +
            "总分"
        );
      }
      console.log(totalScore);
    },
    subjectInput(data) {
      console.log(data);
      var totalScore = 0;
      data.forEach((i) => {
        console.log(i);
        totalScore += parseFloat(i.score);
      });
      this.totalScore = totalScore;
      console.log(totalScore);
    },
    async getPlanGradeDetail() {
      const data = {
        id: this.id,
      };
      const res = await getPlanGradeDetail(data);
      if (res.code === 0) {
        this.userOptions = res.data;
        this.subject_item = res.data.subject_item;
        console.log(res.data);
        var totalScore = 0;
        res.data.subject_item.forEach((i) => {
          totalScore += parseFloat(i.score - 0);
        });
        this.totalScore = totalScore;
      }
    },
    handleOpen() {
      this.getPlanGradeDetail();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // for (const k in this.formData) {
      //   this.formData[k] = ''
      // }
      this.userOptions = {};
      this.subject_item = [];
      this.grade_status = "";
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.qualified {
  color: #43d100;
}
.unqualified {
  color: #fd6500;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.subject_box {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  p {
    margin-right: 20px;
  }
}
.subject_name {
  font-family: "Microsoft YaHei UI Bold", "Microsoft YaHei UI Regular",
    "Microsoft YaHei UI", sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #606266;
  font-size: 14px;
}
.subject_sub_box {
  background-color: rgba(242, 246, 252, 1);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  // height: 40px;
  margin-bottom: 20px;
  p {
    margin-right: 20px;
  }
}
</style>
