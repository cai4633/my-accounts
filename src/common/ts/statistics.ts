function getTotal(data: myTypes.WeekItem[]): myTypes.AccountType {
  return data.reduce(
    (acc, cur): myTypes.AccountType => {
      return { income: acc.income + cur[1], outcome: acc.outcome + cur[2] }
    },
    { income: 0, outcome: 0 }
  )
}
export {getTotal}
