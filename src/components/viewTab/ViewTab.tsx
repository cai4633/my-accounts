import React from "react"
import "./ViewTab.styl"
import { Tabs } from "antd"

const { TabPane } = Tabs
interface PropType {
  items: Array<{ title: string; id: number; content: any; key: string }>
  onchangeItem: Function
  activeKey?: string
}
export default ({ items, onchangeItem, activeKey }: PropType) => {
  return (
    <Tabs onChange={(key) => { onchangeItem(key) }} type="card" centered tabBarGutter={10} tabPosition='top' activeKey={activeKey}>
      {items.map((item) => (
        <TabPane tab={item.title} key={item.key}>
          {item.content}
        </TabPane>
      ))}
    </Tabs>
  )
}
