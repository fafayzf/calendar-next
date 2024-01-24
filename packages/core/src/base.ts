import {
  endOfMonth, 
  format as fnsFormat,
  getDay,
  getDaysInMonth,
  startOfMonth, 
  sub 
} from 'date-fns'

type WeekValue = { 
  value: number
  label: string 
}

export type WeekMap = { 
  [key: number]: WeekValue
}

/**
 * 每个日期的数据类型
 */
type DayInfo = {
  /**
   * 当前为几号
   */
  value: number,
  /**
   * 是否为当月日期
   */
  isCurrent: boolean,
  /**
   * 是否为上个月的日期
   */
  isPrev: boolean,
  /**
   * 是否为下个月的日期
   */
  isNext: boolean
}

// 星期几的映射
export const weekMap: WeekMap  = {
  0: {
    value: 0,
    label: '日'
  },
  1: {
    value: 1,
    label: '一'
  },
  2: {
    value: 2,
    label: '二'
  },
  3: {
    value: 3,
    label: '三'
  },
  4: {
    value: 4,
    label: '四'
  },
  5: {
    value: 5,
    label: '五'
  },
  6: {
    value: 6,
    label: '六'
  },
  
}

export default class DatePicker {
  /**
   * 当前日期
   */
  date: Date
  /**
   * 日历表头第一个日期是星期几
   */
  week: number = 0
  /**
   * 当前月面板显示多少个星期，最少显示当前月日期的最少周期，若weekRow小于当前月最小周期，则默认显示最小周期，否则按weekRow设置的来
   */
  weekRow: number = 6
  days: number[] = []
  weekHead: WeekValue[] = []
  constructor(option: {
    date: Date | string,
    week: number,
    weekRow: number,
    weekHead: WeekMap
  }) {
    const { date, week, weekRow } = option
    this.date = new Date(date)
    this.week = week
    this.weekRow = weekRow
    this.weekHead = this.getHeader()

    this.changeCalendar()
  }
  /**
   * 获取年月日
   * @param format 指定格式 （YYYY-MM-DD等），不传则返回this.date原始值 
   */
  getDate(format: string) {
    return fnsFormat(this.date, format)
  }
  /**
   * 设置时间
   * @param date 
   */
  setDate(date: string | Date) {
    this.date = new Date(date)
    this.changeCalendar()
  }
  /**
   * 获取当前月第一天是周几
   * @returns 周几
   */
  getFirstWeekDay() {
    const firstDay = startOfMonth(this.date)

    return getDay(firstDay)
  }
  /**
   * 获取当前月最后一天是周几
   * @returns 
   */
  getLastWeekDay() {
    const lastDay = endOfMonth(this.date)
    return getDay(lastDay)
  }
  /**
   * 插入当前月的所有天数
   */
  setDaysInMonth() {
    const inMonthdays = getDaysInMonth(this.date)
    for (let i = 1; i <= inMonthdays; i++) {
      this.days.push(i)
    }
  }
  /**
   * 获取上个月补多少天到当月开始的这周
   */
  get prevDiffDay() {
    return this.weekHead.findIndex(item => item.value === this.getFirstWeekDay())
  }
  /**
   * 补当月开头与上个月结尾的日期
   */
  diffLastDay() {
    let diffDay = this.prevDiffDay

    if (diffDay > 0) {
      let monthLastDay = getDaysInMonth(sub(this.date, { months: 1 }))
      
      while (diffDay) {
        this.days.unshift(monthLastDay)

        diffDay--
        monthLastDay--
      }
    }

  }
  /**
   * 获取下个月补多少天到当月结束的这周
   */
  get nextDiffDay() {
    return 6 - this.weekHead.findIndex(item => item.value === this.getLastWeekDay())
  }
  // 补当月结尾与下个月开头的日期
  diffNextDay() {
    let diffDay = this.nextDiffDay
    
    if (diffDay > 0) {
      for (let i = 1; i <= diffDay; i++) {
        this.days.push(i)
      }
    }
  }
  /**
   * 根据当前指定星期的行数确认日历显示多少星期
   */
  diffWeek() {
    const weeks = Math.floor(this.days.length / 7)
    
    if (this.weekRow > weeks) {
      // 若最后一天正好为当前星期的最后一天，则lastDay为0
      const lastDay = this.nextDiffDay ? this.days[this.days.length - 1] : 0
      
      for (let i = lastDay + 1; i <= lastDay + (this.weekRow - weeks) * 7; i++) {
        this.days.push(i)
      }
    }
    
  }
  /**
   * 每周的排列
   */
  getRowWeek() {
    const rows: any = []
    for (let i = 0; i < this.weekRow; i++) {
      const week = this.days.slice(i * 7, (i + 1) * 7)
      rows.push(week)
    }
    return rows
  }
  /**
   * 获取顶部信息
   */
  getHeader() {
    if (!weekMap.hasOwnProperty(this.week)) {
      throw new Error(`Invalid first key: ${this.week}`)
    }

    const values = Object.values(weekMap)

    if (this.week !== 0) {
      let currentWeek = this.week
    
      while(currentWeek) {
        values.push(values.shift() as WeekValue)
        currentWeek--
      }
    }
    
    return values
  }
  /**
   * 改变当月日历
   */
  changeCalendar() {
    this.days = []
    this.setDaysInMonth()
    this.diffLastDay()
    this.diffNextDay()
    this.diffWeek()
  }
}
