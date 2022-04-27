<template>
  <quill-editor
    :options="questionEditor"
    :style="{ height: height + 'px' }"
    v-bind="$attrs"
    v-on="$listeners"
  ></quill-editor>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { questionEditor } from "@/utils/quill-config";
export default {
  name: "Editor",
  props: {
    height: {
      type: [String, Number],
      default: 140,
    },
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      questionEditor,
      editValue: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
/deep/.ql-toolbar.ql-snow {
  padding: 0 8px;
}
/deep/.ql-container {
  height: calc(100% - 58px);
}
</style>