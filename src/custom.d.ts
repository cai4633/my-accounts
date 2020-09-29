declare namespace myTypes {
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

  type RecordItem = { selected: number[]; note: string; category: Categories; output: string; createAt: string; id: number }

  interface RecordOrdersItem {
    [key: string]: myTypes.RecordItem[]
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
  type Rank = [string, myTypes.RecordItem[]]
  type WeekItem = [string, number, number]
  type Store = {
    newRecords: RecordItem[]
    allRecords: RecordItem[]
  }

  interface ActionType {
    type: "addNew" | "updateAll" | "addAll" | 'deleteOne'
    data: myTypes.RecordItem | myTypes.RecordItem[]
  }
}

//  declare type CascaderOneValue = string | number;
//  declare type CascaderValue = CascaderOneValue[];
