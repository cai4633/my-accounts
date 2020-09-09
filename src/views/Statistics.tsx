import { Record } from "@/common/ts/cache"
import Layout from "components/layout/Layout"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import CategorySection from "components/categorySection/CategorySection"
import echarts from "echarts"
import dayjs from "dayjs"
import { theme } from "@/common/ts/variable"
import { useTag } from "@/hooks/useTag"
import  Dropdown  from "@/components/dropDown/Picker"

const LayoutWrapper = styled.div`
  .category-wrapper {
  }

  .content-wrapper {
  }
`

const Detail: React.FC = () => {
  const [category, setCategory] = useState<MyTypes.Categories>("+")
  const getRecords = recordsOrderByDate(Record.get())
  const [records, setRecords] = useState<[string, MyTypes.RecordItem[]][]>(getRecords("+"))
  const { findTagId, tags } = useTag()

  // useEffect(() => {
  //   // 基于准备好的dom，初始化echarts实例
  //   const node = document.getElementById("main") as HTMLDivElement
  //   if (node) {
  //     var myChart = echarts.init(node)
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: "ECharts 入门示例",
  //       },
  //       tooltip: {},
  //       xAxis: {
  //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  //       },
  //       yAxis: {
  //         type: "category",
  //       },
  //       series: [
  //         {
  //           name: "销量",
  //           type: "line",
  //           data: [0, 0, 0, 0, 0],
  //         },
  //       ],
  //     })
  //   }
  // })

  const changeFunc = (obj: { category: MyTypes.Categories }) => {
    setCategory(obj.category)
    setRecords(getRecords(obj.category))
  }

  function recordsOrderByDate(records: MyTypes.RecordItem[]) {
    const orders: MyTypes.RecordOrders = { "+": {}, "-": {} }
    records.forEach((item) => {
      if (!item.createAt) {
        return
      }
      if (!(item.createAt in orders[item.category])) {
        orders[item.category][item.createAt] = []
      }
      orders[item.category][item.createAt].push(item)
    })
    return (category: MyTypes.Categories) =>
      Object.entries(orders[category]).sort((a, b) => {
        if (a[0] < b[0]) {
          return 1
        }
        if (a[0] > b[0]) {
          return -1
        }
        return 0
      })
  }
  const getDay = (day: string) => {
    const today = dayjs().format("YYYY-MM-DD")
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")
    //利用object/hash的key值唯一
    const map = {
      [day]: day,
      [today]: "今天",
      [yesterday]: "昨天",
    }
    return map[day]
  }

  return (
    <LayoutWrapper>
      <Layout className="statistics">
        {/* <div id="main" style={{ width: "400px", height: "400px" }}></div> */}
        <div className="header">
          <Dropdown></Dropdown>
        </div>
      </Layout>
    </LayoutWrapper>
  )
}

export default Detail
