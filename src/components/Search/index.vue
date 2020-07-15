<template>
  <section>
    <div>
      <div class="inline_date_box"
           v-show="!hideTime">
        开始时间：
        <el-date-picker v-model="startDay"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"></el-date-picker>
      </div>
      <div class="inline_date_box"
           v-show="!hideTime">
        结束时间：
        <el-date-picker v-model="endDay"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"></el-date-picker>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      hideTime: true,
      startDay: '',
      endDay: ''
    }
  }
}
</script>

<style>
</style>