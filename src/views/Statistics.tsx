import { Record } from "@/common/ts/cache"
import { getDataThisMonth, getDataThisWeek, getDataThisYear, recordsRankByMonth } from "@/common/ts/detail"
import { theme } from "@/common/ts/variable"
import Picker from "@/components/picker/Picker"
import Tabs from "@/components/tabs/Tabs"
import { useTag } from "@/hooks/useTag"
import Layout from "components/layout/Layout"
import echarts from "echarts"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

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
  const [index, setIndex] = useState(0) //切换年月周
  const [title, setTitle] = useState("周")
  const [node, setNode] = useState<HTMLDivElement>()
  const [chart, setChart] = useState<echarts.ECharts>()

  // 第一次mounted
  useEffect(() => {
    setNode(document.getElementById("main") as HTMLDivElement)
    if (node) {
      const myChart = echarts.init(node)
      setChart(myChart)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          show: true,
          trigger: "item",
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: 2,
          containLabel: true,
        },
        xAxis: { type: "category" },
        dataset: {
          source: getDataThisWeek(Record.get()),
        },
        series: [
          {
            name: "收入",
            type: "line",
            dimensions: ["date", "income", "outcome"],
            encode: {
              x: 0,
              y: 1,
            },
          },
        ],
      })
    }
  }, [node])

  const setOptionSource = (data: myTypes.WeekItem[]) => {
    chart?.setOption({
      dataset: {
        source: data,
      },
    })
  }
  const onChange = (e: any) => {
    const selectIndex = e.nativeEvent.selectedSegmentIndex
    const selectValue = e.nativeEvent.value
    switch (selectIndex) {
      case 0:
        setOptionSource(getDataThisWeek(Record.get()))
        break
      case 1:
        setOptionSource(getDataThisMonth(Record.get()))
        break
      case 2:
        setOptionSource(getDataThisYear(Record.get()))
        break
      default:
        setOptionSource(getDataThisWeek(Record.get()))
        break
    }
    setIndex(selectIndex)
    setTitle(selectValue)
  }
  const pickerChange = (data: string) => {
    const map: { [key: string]: number } = { 收入: 1, 支出: 2 }
    chart?.setOption({
      series: [
        {
          name: data,
          encode: { x: 0, y: map[data] },
        },
      ],
    })
  }
  return (
    <LayoutWrapper>
      <Layout className="statistics">
        <div className="header">
          <Picker onChange={pickerChange}></Picker>
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
