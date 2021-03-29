<template>
  <viewer :images="images" ref="viewer" style="display: none">
    <img v-for="(src, index) in images" :key="index" :src="src" />
  </viewer>
</template>

<script>
export default {
  name: "PreviewImg",

  data() {
    return {
      images: [],
    };
  },
  methods: {
    show(images) {
      this.images = Array.isArray(images) ? images : [images];
      const viewer = this.$refs.viewer.$viewer;
      viewer.show();
    },
  },
};
</script>

<style>
</style>