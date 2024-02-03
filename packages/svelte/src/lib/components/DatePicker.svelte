<script lang="ts">
import { DatePicker } from '@calendar-next/core'
import { subMonths, addMonths, format, isSameDay } from 'date-fns'
import './DatePicker.css'

let date = new Date()
let normalDate = new Date()

export const picker = new DatePicker({
  value: date,
  startWeek: 1,
  weekRow: 6
})

let header = picker.weekHead

let panel = picker.getRowWeek()

function isActive(current: Date) {
    return isSameDay(date, current)
  }

  function prevMonth() {
    const prevMonth = subMonths(normalDate, 1)
    normalDate = prevMonth
    picker.setDate(prevMonth)
    panel = picker.getRowWeek()
  }

  function nextMonth() {
    const nextMonth = addMonths(normalDate, 1)
    normalDate = nextMonth
    picker.setDate(nextMonth)
    panel = picker.getRowWeek()    
  }

  function chooseDate(item: any) {
    normalDate = item.value
    date = item.value   
    picker.setDate(item.value)
    panel = picker.getRowWeek()
  }

  function resetDate() {
    const now = new Date()
    normalDate = now
    date = now
    picker.setDate(date)
  }


</script>

<!-- 组件模板 -->
<div class="panel">
  <div class="header">
    <div class="current-date">{format(normalDate, 'yyyy-MM-dd')}</div>
    <div class="month-btns">
      <button on:click={prevMonth}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button on:click={nextMonth}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </div>
  </div>
  <div class="week-header">
    {#each header as { label }}
    <div class="div">{label}</div>
    {/each}
  </div>
  <div class="body">
    {#each panel as row}
      <div class="row">
        {#each row as item}
          <button
            class="div"
            class:prev={item.isPrev}
            class:next={item.isNext}
            class:current={isActive(item.value) && item.isCurrent}
            on:click={() => chooseDate(item)}
          >{format(item.value, 'dd')}</button>
        {/each}
      </div>
    {/each}
  </div>
</div>