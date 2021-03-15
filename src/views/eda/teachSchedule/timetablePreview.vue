<template>
  <section class="mainwrap">
    <el-calendar :first-day-of-week="7" v-model="value">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <div
          slot="reference"
          class="div-Calendar"
          @click="calendarOnClick(data)"
        >
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{
              data.day
                .split('-')
                .slice(1)
                .join('-')
            }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </div>
      </template>
    </el-calendar>
  </section>
</template>

<script>
export default {
  name: 'timetablePreview',
  data() {
    return {
      value: '',
    }
  },
  methods: {
    calendarOnClick(e) {
      console.log(e)
    },
  },
}
</script>

<style></style>
