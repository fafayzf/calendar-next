<script setup>
import { ref, computed, watch } from 'vue'
import { DatePicker } from '@calendar-next/core'
import { subMonths, startOfMonth, addMonths, format } from 'date-fns'

const date = ref(new Date()) 
const picker = new DatePicker({
  date: date.value,
  week: 1,
  weekRow: 6
})
 
const header = picker.weekHead

const panel = ref(picker.getRowWeek())

watch(date, () => {
  panel.value = picker.getRowWeek()
})

function prevMonth() {
  const prevMonth = subMonths(date.value, 1)
  date.value = prevMonth
  picker.setDate(date.value)
}
function nextMonth() {
  const nextMonth = addMonths(date.value, 1)
  date.value = nextMonth
  picker.setDate(date.value)
}
</script>
<template>
<div>
  {{ format(date, 'yyyy-MM-dd') }}
  <div class="header">
    <div class="div" v-for="item of header" :key="item.value">{{ item.label }}</div>
  </div>
  <div class="body">
    <div class="row" v-for="(item, index) in panel" :key="index">
      <div class="div" v-for="(v, i) in item" :key="i">{{ v }}</div>
    </div>
  </div>
  <button @click="prevMonth">prev month</button>
  <button @click="nextMonth">next month</button>
</div>
</template>
<style scoped>
.header {
  display: flex;
}
.row {
  display: flex;
}
.div {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
</style>
