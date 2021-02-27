<template>
  <!-- 
  总数   data
  当前页数  curpage
  父组件接收页数  @pageChange
  单页个数  pageSize
   -->
  <section>
    <el-pagination background
                   layout="prev, pager, next, jumper, slot"
                   :total="data"
                   :page-size="pageSize"
                   prev-text="上一页"
                   next-text="下一页"
                   :current-page="curpage"
                   @current-change="doPageChange"
                   class="hidden-xs-only">
      <el-button class="page_btn"
                 type="success"
                 plain>跳转</el-button>
    </el-pagination>

  </section>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {}
  },
  props: {
    data: Number,
    curpage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },

  mounted() {
    console.log(this.curpage)
  },
  methods: {
    doPageChange(page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style lang="scss">
</style>
