import { Fragment, useState } from 'react'
import { DatePicker } from '@calendar-next/core'
import { addMonths, format, isSameDay, subMonths } from 'date-fns'
import './DatePicker.css'

export default () => {
  const [date, setDate] = useState(new Date())
  const [normalDate, setNormalDate] = useState(new Date())
  const picker = new DatePicker({
    value: date,
    startWeek: 1,
    weekRow: 6,
  })

  const header = picker.weekHead

  const [panel, setPanel] = useState(picker.getRowWeek())

  // useEffect(() => {
  //   setPanel(picker.getRowWeek())
  // }, [normalDate])

  function isActive(current: Date) {
    return isSameDay(date, current)
  }

  function prevMonth() {
    const prevMonth = subMonths(normalDate, 1)
    setNormalDate(prevMonth)
    picker.setDate(prevMonth)
    setPanel(picker.getRowWeek())
  }

  function nextMonth() {
    const nextMonth = addMonths(normalDate, 1)
    setNormalDate(nextMonth)
    picker.setDate(nextMonth)
    setPanel(picker.getRowWeek())
  }

  function chooseDate(item: any) {
    setNormalDate(item.value)
    setDate(item.value)
    picker.setDate(item.value)
    setPanel(picker.getRowWeek())
  }

  function resetDate() {
    const now = new Date()
    setNormalDate(now)
    setDate(now)
    picker.setDate(date)
  }

  return (
    <Fragment>
      <div className="panel">
        <div className="header">
          <div className="current-date">{format(normalDate, 'yyyy-MM-dd')}</div>
          <div className="month-btns">
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
        <div className="week-header">
          {header.map(({ value, label }) => {
            return <div className="div" key={value}>{label}</div>
          })}
        </div>
        <div className="body">
          {panel.map((row: any, index: number) => {
            return (
              <div className="row" key={index}>
                {row.map((item: any, i: number) => {
                  return (
                    <div
                      onClick={() => chooseDate(item)}
                      key={i}
                      className={[
                        'div',
                        item.isPrev ? 'prev' : '',
                        item.isNext ? 'next' : '',
                        isActive(item.value) && item.isCurrent ? 'current' : '',
                      ].join(' ')}
                    >
                      {format(item.value, 'dd')}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="footer">
          <button onClick={resetDate}>今天</button>
        </div>
      </div>
    </Fragment>
  )
}
