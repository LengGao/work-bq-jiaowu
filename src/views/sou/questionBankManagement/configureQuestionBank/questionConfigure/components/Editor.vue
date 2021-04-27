<template>
  <quill-editor
    :options="questionEditor"
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
  props: {},
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

<style>
</style>