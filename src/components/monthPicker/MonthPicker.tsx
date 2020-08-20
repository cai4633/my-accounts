import React from "react"
import "./MonthPicker.less"
import { Menu, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="1">2018</Menu.Item>
    <Menu.Item key="2">2019</Menu.Item>
    <Menu.Item key="3">2020</Menu.Item>
  </Menu>
)

export class MonthPicker extends React.Component {
  render() {
    return (
      <div className="month-picker">
        <Dropdown overlay={menu} trigger={["click"]} overlayClassName='dropdown-wrap'>
          <div className="inner"><span className="text">选择日期</span><DownOutlined></DownOutlined></div>
        </Dropdown>
      </div>
    )
  }
}
