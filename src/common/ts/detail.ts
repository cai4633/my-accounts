import dayjs from "dayjs"

// 自定义类型保护
const isTotal = (t: myTypes.TotalType | myTypes.AccountType): t is myTypes.TotalType => (t as myTypes.TotalType).total !== undefined

//将原始数据按照日期降序排列
function orderByDate<T extends myTypes.RecordItem>(target: T[]) {
  const orders: { [key: string]: myTypes.RecordItem[] } = {}
  target.forEach((item) => {
    if (!item.createAt) {
      return
    }
    if (!(item.createAt in orders)) {
      orders[item.createAt] = []
    }
    orders[item.createAt].push(item)
  })
  return Object.entries(orders).sort((a, b) => {
    if (a[0] < b[0]) {
      return 1
    }
    if (a[0] > b[0]) {
      return -1
    }
    return 0
  })
}

// 返回每天的支出总和以及收入总和
function settleAccountsByDay(target: myTypes.RecordItem[], type = true) {
  // TODO how to confirm return type by generic
  if (type) {
    const total = target.reduce((acc, cur) => (cur.category === "+" ? acc + window.parseFloat(cur.output) : acc - window.parseFloat(cur.output)), 0)
    return {
      title: total >= 0 ? "收入" : "支出",
      total: Math.abs(total),
    }
  }
  // type = false
  return target.reduce(
    (acc: myTypes.AccountType, cur) =>
      cur.category === "+"
        ? { ...acc, income: acc.income += window.parseFloat(cur.output) }
        : { ...acc, outcome: acc.outcome += window.parseFloat(cur.output) },
    { income: 0, outcome: 0 }
  )
}

// 将原始数据按照月份分类排列
function recordsRankByMonth(data: myTypes.RecordItem[], date: Date) {
  const records = orderByDate(data)
  const YM = dayjs(date).format("YYYY-MM") //仅保留年月
  const startDate = dayjs(YM).unix()
  const endDate = dayjs(YM).add(1, "month").unix()
  const rank = records.filter((value) => {
    const current = dayjs(value[0]).unix()
    return current >= startDate && current < endDate
  })

  const { income, outcome } = rank.reduce(
    (acc: myTypes.AccountType, cur) => {
      const day = settleAccountsByDay(cur[1], false)
      return isTotal(day)
        ? acc
        : {
            income: acc.income + day.income,
            outcome: acc.outcome + day.outcome,
          }
    },
    { income: 0, outcome: 0 }
  )

  return { rank, income, outcome }
}
function getDataThisWeek(data: myTypes.RecordItem[]) {
  const sortData = orderByDate(data)
  const thisWeek: myTypes.WeekItem[] = [] //[date,income,outcome]
  const xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  for (let i = 1; i <= 7; i++) {
    //获取本周七天的日期
    thisWeek.push([dayjs().day(i).format("YYYY-MM-DD"), 0, 0])
  }
  sortData.forEach((item) => {
    for (let i = 0; i < 7; i++) {
      if (item[0] === thisWeek[i][0]) {
        const total = settleAccountsByDay(item[1], false)
        if (!isTotal(total)) {
          thisWeek[i] = [item[0], total.income, total.outcome]
        }
        break
      }
    }
  })

  return thisWeek.map((item, index): myTypes.WeekItem => [xData[index], item[1], item[2]])
}
function getDataThisMonth(data: myTypes.RecordItem[]) {
  const sortData = orderByDate(data)
  const thisMonth: myTypes.WeekItem[] = [] //[date,income,outcome]
  const xData: string[] = []
  for (let i = 1; i <= 31; i++) {
    xData.push(i + "")
    thisMonth.push([dayjs().day(i).format("YYYY-MM-DD"), 0, 0])
  }
  sortData.forEach((item) => {
    for (let i = 0; i < 31; i++) {
      if (item[0] === thisMonth[i][0]) {
        const total = settleAccountsByDay(item[1], false)
        if (!isTotal(total)) {
          thisMonth[i] = [item[0], total.income, total.outcome]
        }
        break
      }
    }
  })
  return thisMonth.map((item, index): myTypes.WeekItem => [xData[index], item[1], item[2]])
}

function getDataThisYear(data: myTypes.RecordItem[]) {
  const sortData = orderByDate(data)
  const thisYear: myTypes.WeekItem[] = [] //[date,income,outcome]
  const xData: string[] = []
  for (let i = 1; i <= 12; i++) {
    xData.push(i + "")
    //获取今年的月份
    const date = dayjs()
      .month(i - 1)
      .format("YYYY-MM")
    const total = recordsRankByMonth(data, new Date(Date.parse(date)))
    thisYear.push([date, total.income, total.outcome])
  }
  return thisYear.map((item, index): myTypes.WeekItem => [xData[index], item[1], item[2]])
}

export { orderByDate, settleAccountsByDay, recordsRankByMonth, isTotal, getDataThisWeek, getDataThisMonth, getDataThisYear }
