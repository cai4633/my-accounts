import dayjs from "dayjs"

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

interface Total {
  title: "收入" | "支出"
  total: number
}
function settleAccountsByDay(target: MyTypes.RecordItem[]): Total {
  const total = target.reduce((acc, cur) => (cur.category === "+" ? acc + window.parseFloat(cur.output) : acc - window.parseFloat(cur.output)), 0)
  return {
    title: total >= 0 ? "收入" : "支出",
    total: Math.abs(total),
  }
}

function recordsRankByMonth<T extends [string, MyTypes.RecordItem[]]>(records: T[], date: Date) {
  const YM = dayjs(date).format('YYYY-MM')  //仅保留年月
  const startDate = dayjs(YM).unix()
  const endDate = dayjs(YM).add(1, "month").unix()
  return records.filter((value) => {
    const current = dayjs(value[0]).unix()
    return current >= startDate && current < endDate
  })
}

export { recordsOrderByDate, settleAccountsByDay, recordsRankByMonth }
