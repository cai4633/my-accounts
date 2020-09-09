import dayjs from "dayjs"

// 自定义类型保护
const isTotal = (t: MyTypes.TotalType | MyTypes.AccountType): t is MyTypes.TotalType => (t as MyTypes.TotalType).total !== undefined

//降序排列
function recordsOrderByDate<T extends MyTypes.RecordItem>(target: T[]) {
  const orders: { [key: string]: MyTypes.RecordItem[] } = {}
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

function settleAccountsByDay(target: MyTypes.RecordItem[], type = true) {
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
    (acc: MyTypes.AccountType, cur) =>
      cur.category === "+"
        ? { ...acc, income: acc.income += window.parseFloat(cur.output) }
        : { ...acc, outcome: acc.outcome += window.parseFloat(cur.output) },
    { income: 0, outcome: 0 }
  )
}

function recordsRankByMonth(records: [string, MyTypes.RecordItem[]][], date: Date) {
  const YM = dayjs(date).format("YYYY-MM") //仅保留年月
  const startDate = dayjs(YM).unix()
  const endDate = dayjs(YM).add(1, "month").unix()
  const rank = records.filter((value) => {
    const current = dayjs(value[0]).unix()
    return current >= startDate && current < endDate
  })

  const { income, outcome } = rank.reduce(
    (acc: MyTypes.AccountType, cur) => {
      const day = settleAccountsByDay(cur[1], false)
      return isTotal(day) ? acc : {
            income: acc.income + day.income,
            outcome: acc.outcome + day.outcome,
          }
    },
    { income: 0, outcome: 0 }
  )

  return { rank, income, outcome }
}

export { recordsOrderByDate, settleAccountsByDay, recordsRankByMonth, isTotal }
