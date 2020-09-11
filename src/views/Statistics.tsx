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
  const [index, setIndex] = useState(0)
  const [title, setTitle] = useState("周")
  const [source, setSource] = useState<myTypes.WeekItem[]>(getDataThisWeek(Record.get()))
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
          source,
        },
        series: [
          {
            name: "支出",
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
  useEffect(() => {
    chart?.setOption(
      {
        dataset: {
          source,
        },
      },
      false,
      true
    )
  }, [source])

  const onChange = (e: any) => {
    const selectIndex = e.nativeEvent.selectedSegmentIndex
    const selectValue = e.nativeEvent.value
    switch (selectIndex) {
      case 0:
        setSource(getDataThisWeek(Record.get()))
        break
      case 1:
        setSource(getDataThisMonth(Record.get()))
        break
      case 2:
        setSource(getDataThisYear(Record.get()))
        break
      default:
        setSource(getDataThisWeek(Record.get()))
        break
    }
    setIndex(selectIndex)
    setTitle(selectValue)
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
