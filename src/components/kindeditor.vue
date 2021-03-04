<template>
  <!--
         参数：
        content：传进来的数据
        @kindeditorChange：获取数据的事件 传回一个参数：数据
  -->
  <div class="kindeditor">
    <editor
      :id="id"
      :height="height"
      :width="width"
      :content="content"
      :items="items"
      :resizeType="resizeType"
      pluginsPath="/static/kindeditor/plugins/"
      :loadStyleMode="false"
      :fullscreenMode="fullscreenMode"
      :afterCreate="afterCreate"
      :uploadJson="rootDir + '/oss/uploadImage'"
      @on-content-change="onContentChange"
    ></editor>
  </div>
</template>
<script>
// import url from '@/assets/js/url'
import Vue from 'vue'
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
Vue.use(VueKindEditor)

export default {
  name: 'kindeditor',
  data() {
    return {
      items: [
        'code',
        'fontsize',
        'forecolor',
        'bold',
        'italic',
        'underline',
        'undo',
        'redo',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'justifyfull',
        'wordpaste',
        'selectall',
        'image',
        'link',
        'subscript',
        'superscript',
        'insertorderedlist',
        'insertunorderedlist',
        'fullscreen',
      ],
      resizeType: 0,
      random: Math.random(),
    }
  },
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '400px',
    },
    content: {
      type: String,
    },
    id: {
      type: String,
      default: 'editor_id',
    },
    fullscreenMode: {
      type: Boolean,
      default: false,
    },
    afterCreate: Function,
    isDeletImg: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.isDeletImg) {
      this.items = [
        'fontsize',
        'forecolor',
        'bold',
        'italic',
        'underline',
        'undo',
        'redo',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'justifyfull',
        'wordpaste',
        'selectall',
        'link',
        'subscript',
        'superscript',
        'insertorderedlist',
        'insertunorderedlist',
        'fullscreen',
      ]
    }
  },
  methods: {
    onContentChange(val) {
      this.editorText = val
      this.$emit('kindeditorChange', this.editorText)
    },
  },
}
</script>

<style></style>
