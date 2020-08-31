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

  type RecordItem = { selected: number[]; note: string; category: Categories; output: string }

  type Categories = "+" | "-"

  type TagItem = { id: number; name: string }

  interface PropType {
    items: PriceItem[]
    onModifyItem: Function
    onDeleteItem: Function
  }

  type Prop = {
    selected: number[]
    onchange: (tags: number[]) => void
  }
}
