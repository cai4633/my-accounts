declare namespace Price {
  interface Item {
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
}
