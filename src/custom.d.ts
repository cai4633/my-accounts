declare namespace MyTypes {
  interface PriceItem {
    id: number
    title: string
    price: number
    date: string
    category: {
      id: number
      name: string
      type: string
    }
  }

  type MoneyState = Omit<RecordItem, "createAt">

  type Categories = "+" | "-"

  type TagItem = {
    id: number
    name: string
    category: Categories
    icon: string
  }

  interface PropType {
    items: PriceItem[]
    onModifyItem: Function
    onDeleteItem: Function
  }

  type Prop = {
    selected: number[]
    onchange: (tags: number[]) => void
  }

  type RecordItem = { selected: number[]; note: string; category: Categories; output: string; createAt: string }

  interface RecordOrdersItem {
    [key: string]: MyTypes.RecordItem[]
  }

  interface RecordOrders<T = RecordOrdersItem> {
    "+": T
    "-": T
  }
  interface TotalType {
    title: string
    total: number
  }
  interface AccountType {
    income: number
    outcome: number
  }
}
