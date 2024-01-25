import { defineComponent, ref, watch, h, createVNode, Fragment } from 'vue'
import { DatePicker } from '@calendar-next/core'
import { subMonths, addMonths, format } from 'date-fns'
import './DatePicker.css'

import ComponentUtil from '../componentUtil'

export default ComponentUtil.withInstall(
  defineComponent({
    name: 'DatePicker',
    setup() {
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

      function isActive(current: number) {
        return Number(format(date.value, 'dd')) === current
      }

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

      return () => {
        return (
          <Fragment>
            <div class="panel">
              <div class="header">
                <div class="current-date">{format(date.value, 'yyyy-MM-dd')}</div>
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
                        return (
                          <div 
                          key={i}
                          class={[
                            'div',
                            item.isPrev ? 'prev': '',
                            item.isNext ? 'next': '',
                            isActive(item.value) && item.isCurrent ? 'current' : ''
                          ].join(' ')} 
                        >{item.value}</div>)
                      })}
                    </div>)
                })}
              </div>
            </div>
          </Fragment>
        )
      }
    }
  })
)