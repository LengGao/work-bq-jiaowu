<template>
  <!-- 阅读情况弹窗 -->
  <section>
    <el-dialog title="提示" :visible.sync="dialogVisible4" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible4 = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
  
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    name: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<<style lang="scss" scoped>
    
</style>