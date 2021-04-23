<template>
  <!-- 
  总数   data
  当前页数  curpage
  父组件接收页数  @pageChange
  单页个数  pageSize
   -->
  <section>
    <!-- <el-pagination
      background
      layout="prev, pager, next, jumper, slot"
      :total="data"
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
      :current-page="curpage"
      @current-change="doPageChange"
      class="hidden-xs-only"
    >
      <el-button class="page_btn" type="success" plain>跳转</el-button>
    </el-pagination> -->

    <!-- sizes 有些接口不支持 暂时去掉 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="doPageChange"
      :current-page="curpage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="data"
      class="hidden-xs-only"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  name: "page",
  data() {
    return {};
  },
  props: {
    data: Number,
    curpage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },

  mounted() {
    document.getElementsByClassName(
      "el-pagination__jump"
    )[0].childNodes[0].nodeValue = "跳至";

    console.log(this.curpage);
  },
  methods: {
    doPageChange(page) {
      console.log(page);
      this.$emit("pageChange", page);
    },
    handleSizeChange(pageSizeNum) {
      this.$emit("pageSizeChange", pageSizeNum);
    },
  },
};
</script>

<style lang="scss"></style>
