<script setup>
import { ref, computed, watch } from 'vue'
import { DatePicker } from '@calendar-next/core'
import { subMonths, startOfMonth, addMonths, format, addYears, subYears } from 'date-fns'

const date = ref(new Date()) 
const picker = new DatePicker({
  value: date.value,
  startWeek: 1,
  weekRow: 6
})
 
const header = picker.weekHead

const panel = ref(picker.getRowWeek())

watch(date, () => {
  panel.value = picker.getRowWeek()
})

const isActive = computed(() => {
  return current => {
    return format(date.value, 'dd') == current
  }
  
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
<div class="panel">
  <div class="header">
    <div class="current-date">{{ format(date, 'yyyy-MM-dd') }}</div>
    <div class="month-btns">
      <button @click="prevMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button @click="nextMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </div>
  </div>
  <div class="week-header">
    <div class="div" v-for="week of header" :key="week.value">{{ week.label }}</div>
  </div>
  <div class="body">
    <div class="row" v-for="(row, index) in panel" :key="index">
      <div 
        v-for="(item, i) in row" 
        :key="i"
        :class="[
          'div',
          item.isPrev ? 'prev': '',
          item.isNext ? 'next': '',
          isActive(item.value) && item.isCurrent ? 'current' : ''
        ]" 
      >{{ item.value }}</div>
    </div>
  </div>
</div>
</template>
<style scoped>
.header {
  display: flex;
  margin: 0 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}
.week-header {
  display: flex;
  justify-content: center;
  padding: 0 18px;
}
.row {
  display: flex;
  justify-content: center;
}
.div {
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  margin: 4px;
}
.body {
  padding: 0 18px;
}
.row .div {
  cursor: pointer;
  border-radius: 4px;
}
.row .div:hover {
  background: rgba(64, 158, 255, 0.05);
  color: rgba(0, 0, 0, 0.88);
}
.panel {
  width: max-content;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.prev, .next {
  color: rgba(0, 0, 0, 0.25);
}
.month-btns {
  display: flex;
  align-items: center;
  justify-content: center;
}
.month-btns button {
  width: 24px;
  height: 24px;
  text-align: center;
  margin-left: 4px;
  background: transparent;
  border: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
}
.month-btns button:hover, .current-date:hover {
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
  border-radius: 4px;
}
.current-date {
  padding: 2px 8px;
}

.current {
  background: rgba(64, 158, 255, 1) !important;
  color: #fff !important;
}
</style>
