<template>
  <!--排课详情弹框-->
  <el-dialog
    title="使用详情"
    :visible.sync="visible"
    width="400px"
    class="course-dialog"
    @close="hanldeCancel"
    @open="handleOpen"
    :close-on-click-modal="false"
  >
    <div>
      <div
        class="detail detail__radius"
        v-for="(item, index) in datas"
        :key="index"
      >
        <p>上课时间：{{ item.period }}</p>
        <div class="classCouse">
          <p>
            上课班级：
          </p>
          <div>
            <p
              v-for="(v, index) in item.classroom_list"
              :key="index"
              v-if="item.classroom_list.length"
            >
              {{ v }}
            </p>
            <p v-else>--</p>
            <!-- <p
              v-for="(v, index) in item.classroom_list"
              :key="index"
              v-if="item.classroom_list.length"
            >
              {{ v }}
            </p> -->
          </div>
        </div>

        <p>授课老师：{{ item.teacher_name || '--' }}</p>
        <p>
          跟班人员：{{
            (item.staff_list && item.staff_list.join('，')) || '--'
          }}
        </p>
      </div>
    </div>
    <!-- <div v-if="id" v-loading="detailLoading">
      <div
        class="detail detail__radius"
        v-for="(item, index) in detailData"
        :key="index"
      >
        <p>上课时间：{{ item.period }}</p>
        <p>上课教室：{{ item.schoolroom_name || '--' }}</p>
        <p>授课老师：{{ item.teacher_name || '--' }}</p>
      </div>
    </div>
    <div class="detail" v-else>
      <p>上课日期：{{ datas.date }}</p>
      <p>上课时间：{{ datas.period && datas.period.substr(11) }}</p>
      <p>授课老师：{{ datas.teacher_name || '--' }}</p>
      <p>授课方式：{{ typeMap[datas.teaching_type] || '--' }}</p>
      <p>上课教室：{{ datas.schoolroom_name || '--' }}</p>
      <p>
        跟班人员：{{
          (datas.staff_list && datas.staff_list.join('，')) || '--'
        }}
      </p>
      <p>备注信息：{{ datas.remark || '--' }}</p>
    </div> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getClassOurList } from '@/api/eda'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Array,
      default: () => [],
    },
    id: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      visible: this.value,
      typeMap: {
        1: '面授',
        2: '直播',
      },
      detailData: [],
      detailLoading: false,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  methods: {
    handleOpen() {
      if (this.id) {
        this.getClassOurList()
      }
    },
    //根据教室id获取课程
    async getClassOurList() {
      const data = {
        arrange_id: this.id,
      }
      this.detailLoading = true
      const res = await getClassOurList(data)
      this.detailLoading = false
      if (res.code === 0) {
        this.detailData = res.data
      }
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.course-dialog {
  .detail {
    margin-left: 10px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    p {
      line-height: 30px;
    }
  }
  /deep/.el-dialog__body {
    padding-bottom: 0;
  }

  .detail__radius {
    position: relative;
    padding-left: 20px;

    &::before {
      position: absolute;
      left: 5px;
      top: 11px;
      content: '';
      width: 8px;
      height: 8px;
      background-color: #199fff;
      border-radius: 50%;
    }
  }
}
.classCouse {
  display: flex;
  p {
  }
}
</style>
