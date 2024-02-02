import { defineComponent, ref, watch, h, createVNode, Fragment } from 'vue'
import { DatePicker } from '@calendar-next/core'
import { subMonths, addMonths, format, isSameDay } from 'date-fns'
import './DatePicker.css'

import ComponentUtil from '../componentUtil'

export default ComponentUtil.withInstall(
  defineComponent({
    name: 'DatePicker',
    setup() {
      const date = ref(new Date())
      const normalDate = ref(new Date())
      const picker = new DatePicker({
        value: date.value,
        startWeek: 1,
        weekRow: 6
      })
      
      const header = picker.weekHead

      const panel = ref(picker.getRowWeek())

      watch([date, normalDate], () => {
        panel.value = picker.getRowWeek()
      })

      function isActive(current: Date) {        
        return isSameDay(date.value, current)
      }

      function prevMonth() {
        const prevMonth = subMonths(normalDate.value, 1)
        normalDate.value = prevMonth
        picker.setDate(normalDate.value)
      }

      function nextMonth() {
        const nextMonth = addMonths(normalDate.value, 1)
        normalDate.value = nextMonth
        picker.setDate(normalDate.value)
      }

      function chooseDate(item: any) {
        normalDate.value = item.value
        date.value = item.value
        picker.setDate(item.value)
      }

      function resetDate() {
        const now = new Date()
        normalDate.value = now
        date.value = now
        picker.setDate(date.value)
      }
      return () => {
        return (
          <Fragment>
            <div class="panel">
              <div class="header">
                <div class="current-date">{format(normalDate.value, 'yyyy-MM-dd')}</div>
                <div class="month-btns">
                  <button onClick={prevMonth}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button onClick={nextMonth}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="week-header">
                {header.map(({ value, label }) => {
                  return <div class="div" key={value}>{label}</div>
                })}
              </div>
              <div class="body">
                {panel.value.map((row: any, index: number) => {
                  return (
                    <div class="row" key={index}>
                      {row.map((item: any, i: number) => {
                        return (<div
                          onClick={() => chooseDate(item)}
                          key={i}
                          class={[
                            'div',
                            item.isPrev ? 'prev': '',
                            item.isNext ? 'next': '',
                            isActive(item.value) && item.isCurrent ? 'current' : ''
                          ].join(' ')} 
                        >{format(item.value, 'dd')}</div>)
                      })}
                    </div>)
                })}
              </div>
              <div class="footer">
                <button onClick={resetDate}>今天</button>
              </div>
            </div>
          </Fragment>
        )
      }
    }
  })
)