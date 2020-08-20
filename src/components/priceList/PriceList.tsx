import React from "react"
import "./PriceList.less"
import { Row, Col, Button, Typography } from "antd"
import { IconFont }  from '@/index'

const { Text } = Typography
interface PropType {
  items: Price.Item[]
  onModifyItem: Function
  onDeleteItem: Function
}

export default ({ items, onModifyItem, onDeleteItem }: PropType) => {
  return (
    
    <div className="price-list">
      {items.map((item) => (
        <Row key={item.id} align="middle">
          <Col span={2}>{item.category.name}</Col>
          <Col span={10}>{item.title}</Col>
          <Col span={4}>
            <Text strong>
              {item.category.type === "income" ? "+" : "-"} {item.price}元{" "}
            </Text>
          </Col>
          <Col span={4}>{item.date}</Col>
          <Col span={2}>
            <Button  onClick={() => { onModifyItem(item) }} shape='circle' className='edit'>
              <IconFont type="icon-edit"/>
            </Button>
          </Col>
          <Col span={2}>
            <Button onClick={() => { onDeleteItem(item) }} shape='circle' className='delete'>
              <IconFont type="icon-delete"/>
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  )
}
