import React from "react"
import logo from "./logo.svg"
import "./App.styl"
import PriceList from "components/priceList/PriceList.tsx"
import ViewTab from "components/viewTab/ViewTab.tsx"

const list = [
  {
    id: 1,
    title: "去云南旅游",
    price: 100,
    date: "2019-10-20",
    category: {
      id: 1,
      name: "旅行",
      type: "outcome",
    },
  },
  {
    id: 3,
    title: "去丽江旅游",
    price: 300,
    date: "2019-10-25",
    category: {
      id: 1,
      name: "旅行",
      type: "outcome",
    },
  },

  {
    id: 2,
    title: "去云南旅游",
    price: 300,
    date: "2019-12-20",
    category: {
      id: 1,
      name: "旅行",
      type: "income",
    },
  },
]

const tabLists = [
  {
    id: 1,
    key: 'list',
    title: "列表模式",
    content: "列表模式",
  },
  {
    id: 2,
    key: 'chart',
    title: "图表模式",
    content: "图表模式",
  },
]
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>welcome to react!</p>
      </header>
      <PriceList items={list} onModifyItem={onModifyItem} onDeleteItem={onDeleteItem} />
      <ViewTab onchangeItem={onchangeItem} items={tabLists} ></ViewTab>
    </div>
  )
}

function onModifyItem() {
  console.log("It is modifying")
}
function onDeleteItem() {
  console.log("It is delete")
}
function onchangeItem(key:string) {
  console.log(key)
}

export default App
