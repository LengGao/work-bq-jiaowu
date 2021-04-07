<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="视频快进">
        <el-radio-group v-model="videoFastForward" @change="isVideoFast">
          <el-radio :label="2">不允许</el-radio>
          <el-radio :label="1">允许</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editvideocollection, modifyvideocollection } from '@/api/sou'
export default {
  data() {
    return {
      videoFastForward: '',
    }
  },
  created() {
    this.editvideocollection()
  },
  methods: {
    // 获取关联视屏
    async editvideocollection() {
      const data = {
        video_collection_id: this.$route.query.video_collection_id,
      }
      const res = await editvideocollection(data)
      if (res.code === 0) {
        // this.videoData = res.data.data
        this.videoFastForward = res.data.is_fast
        console.log(this.videoFastForward)
      }
    },
    async modifyvideocollection(is_fast) {
      const data = {
        video_collection_id: this.$route.query.video_collection_id,
        is_fast,
      }
      const res = await modifyvideocollection(data)
      if (res.code === 0) {
        this.$message.success(res.message)
        this.editvideocollection()
      }
    },
    isVideoFast(val) {
      console.log(val)
      this.modifyvideocollection(val)
    },
  },
}
</script>

<style></style>
