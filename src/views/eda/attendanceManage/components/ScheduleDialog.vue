<template>
  <section>
    <el-dialog
      title="排课详情"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="40%"
      @open="handleOpen"
      @closed="resetForm('ruleForm')"
    >
      <!-- <span>这是一段信息</span> -->
      <el-table
        ref="multipleTable"
        :data="classhourData"
        tooltip-effect="light"
        stripe
        style="width: 100%;"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="序号" show-overflow-tooltip min-width="90">
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="上课日期"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="period"
          label="上课时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="状态" min-width="110" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.sign_state | sign_state }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="{ row }">
            <div class="operation_btn">
              <!-- <el-button type="text" @click="dialoShow">排班详情</el-button> -->
              <div>
                <el-button type="text" @click="callinClass(row)"
                  >上课点名</el-button
                >
                <el-button type="text" @click="toSinCode(row)"
                  >签到码</el-button
                >
                <el-button type="text" @click="toStatistics(row)"
                  >考勤统计</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" style="display:flex;justify-content:center">
        <el-button @click="hanldeCancel" type="primary">关 闭</el-button>
        <!-- <el-button type="primary" @click="detailVisible = false"
            >确 定</el-button
          > -->
      </span>
    </el-dialog>
    <SignCode
      v-model="signVisible"
      :arrange_id="arrange_id"
      :class_hour_id="class_hour_id"
    />
  </section>
</template>

<script>
import SignCode from './SignCode'
import { getClassOurList } from '@/api/eda'
export default {
  components: {
    SignCode,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    classInfoData: {
      type: Object,
      default: function() {
        return {}
      },
    },
    arrange_id: {
      type: [Number, String],
      default: 0,
    },
    classDate: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      class_hour_id: '',
      signVisible: false,
      classhourData: [],
      visible: this.value,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  filters: {
    sign_state(val) {
      switch (val) {
        case 0:
          return '未上课'
          break
        case 1:
          return '已上课'
          break
        default:
          return '未知'
      }
    },
  },
  methods: {
    toStatistics(row) {
      this.$router.push({
        path: '/eda/attendanceStatistics',
        query: {
          class_hour_id: row.id,
          arrange_id: row.arrange_id,
        },
      })
    },
    toSinCode(row) {
      this.signVisible = true
      // this.id = row.id
      this.class_hour_id = row.id
    },
    callinClass(row) {
      this.$router.push({
        path: '/eda/callinClass',
        query: {
          class_hour_id: row.id,
          arrange_id: row.arrange_id,
          param: JSON.stringify(this.classInfoData),
        },
      })
    },
    //课时列表
    async getClassOurList() {
      const data = {
        arrange_id: this.arrange_id,
      }
      const res = await getClassOurList(data)
      if (res.code === 0) {
        res.data.forEach((i) => {
          i.date = this.classDate
        })
        this.classhourData = res.data
      }
    },
    handleOpen() {
      this.getClassOurList()
    },
    resetForm() {
      // for (const k in this.formData) {
      //   this.formData[k] = ''
      // }
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style></style>
