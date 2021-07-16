<template>
  <!-- 案例题 -->
  <div class="case">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" :height="editorHeight" />
      </el-form-item>

      <el-form-item label="案例题目">
        <p class="warning" v-if="!isAddChild">创建案例题后方可添加子题目</p>
        <div class="item-input" v-for="item in data.child_list" :key="item.id">
          <el-button
            :title="item.topic_description"
            @click="handleQuestionChange(item.topic_child_type, item.id)"
            class="btn-text-content"
            :type="activeId === item.id ? 'primary' : ''"
          >
            【{{ typeName[item.topic_child_type] }}】{{
              item.topic_description
            }}</el-button
          >
          <el-button @click="handleDeleteInput(item.id)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <el-popover
          placement="bottom"
          popper-class="question-type-popover"
          width="100"
          trigger="hover"
        >
          <el-button
            :disabled="!isAddChild"
            slot="reference"
            style="margin-right: 10px"
            >添加题目</el-button
          >
          <ul class="question-type-list">
            <li
              v-for="item in questionOptions"
              :key="item.value"
              @click="handleQuestionChange(item.value)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 案例题 -->
import Editor from "./Editor";
import mixins from "../mixins/index";
export default {
  name: "Case",
  mixins: [mixins],
  components: {
    Editor,
  },
  props: {
    questionOptions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      editorForm: {
        topic_description: "",
      },
      editorRules: {
        topic_description: [
          { required: true, message: "请输入", trigger: "change" },
        ],
      },
      typeName: {
        1: "单选题",
        2: "多选题",
        3: "判断题",
        4: "不定项题",
        5: "填空题",
        6: "简答题",
      },
      activeId: "",
    };
  },
  computed: {
    isAddChild() {
      return !!this.$route.query.pid;
    },
  },
  watch: {
    "data.child_list"() {
      this.activeId = "";
    },
  },
  methods: {
    handleQuestionChange(type, id) {
      this.activeId = id || "";
      this.$emit("on-change", { type, id });
    },
    // 删除子题目
    handleDeleteInput(id) {
      this.$emit("on-case-delete", id);
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        cb(valid, {
          ...this.editorForm,
          type: 7,
        });
      });
    },
    resetFields() {
      for (const k in this.editorForm) {
        this.editorForm[k] = "";
      }
      this.$refs.editorRules.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.case {
  .item-input {
    display: flex;
    margin-bottom: 10px;
    .btn-text-content {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      padding: 12px 4px;
    }
  }
  .warning {
    color: #f66c6c;
  }
}
.question-type-popover {
  .question-type-list {
    li {
      padding: 6px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #ecf5ff;
        color: #199fff;
      }
    }
  }
}
</style>