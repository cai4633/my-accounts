import { Record } from "@/common/ts/cache"
import Layout from "components/layout/Layout"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import echarts from "echarts"
import dayjs from "dayjs"
import { theme } from "@/common/ts/variable"
import { useTag } from "@/hooks/useTag"
import Picker from "@/components/picker/Picker"
import Tabs from "@/components/tabs/Tabs"

const LayoutWrapper = styled.div`
  .header {
    background-color: ${theme.backgroundColor};
    padding-bottom: 15px;
  }
  .chart {
    .title {
      font-size: 1em;
      padding: 10px 20px;
      margin: 0;
      border-bottom: 1px solid #ccc;
    }
  }

  .content-wrapper {
  }
`
const Detail: React.FC = () => {
  const set = ["本周", "本月", "今年"] as const
  const [category, setCategory] = useState<MyTypes.Categories>("+")
  const [index, setIndex] = useState(0)
  const [title, setTitle] = useState("周")
  const getRecords = recordsOrderByDate(Record.get())
  const [records, setRecords] = useState<[string, MyTypes.RecordItem[]][]>(getRecords("+"))
  const { findTagId, tags } = useTag()

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const node = document.getElementById("main") as HTMLDivElement
    if (node) {
      var myChart = echarts.init(node)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          show: true,
          trigger: "item",
        },
        yAxis: {
          type: "value",
        },
        xAxis: { type: "category" },
        dataset: {
          source: [
            ["周一", 0],
            ["周2", 10],
            ["周3", 30],
            ["周4", 50],
            ["周5", 80],
            ["周6", 90],
            ["周7", 10],
          ],
        },
        series: [
          {
            name: "支出",
            type: "line",
            encode: { x: 0, y: 1 },
          },
        ],
      })
    }
  })

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

  const onChange = (e: any) => {
    setIndex(e.nativeEvent.selectedSegmentIndex)
    setTitle(e.nativeEvent.value)
  }
  return (
    <LayoutWrapper>
      <Layout className="statistics">
        <div className="header">
          <Picker></Picker>
          <Tabs onChange={onChange} index={index}></Tabs>
        </div>
        <div className="chart">
          <h1 className="title">{set[index]}</h1>
        </div>
        <div style={{ height: "250px" }} id="main"></div>
      </Layout>
    </LayoutWrapper>
  )
}

export default Detail
