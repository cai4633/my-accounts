import { Context } from "@/common/ts/context"
import { getDataThisMonth, getDataThisWeek, getDataThisYear } from "@/common/ts/detail"
import { theme } from "@/common/ts/variable"
import Picker from "@/components/picker/Picker"
import Tabs from "@/components/tabs/Tabs"
import { getTotal } from "common/ts/statistics"
import Layout from "components/layout/Layout"
import echarts from "echarts"
import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

const paddingLeft = "20px"
const LayoutWrapper = styled.div`
  height: 100%;
  .header {
    background-color: ${theme.backgroundColor};
    padding-bottom: 15px;
    .am-list-content {
      color: ${theme.color};
    }
  }
  .content {
    .title {
      font-size: 1em;
      padding: 10px 20px;
      margin: 0;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
    p {
      color: ${theme.text_color_grey};
      padding: 2px ${paddingLeft};
      font-size: 12px;
    }
    #chart {
      margin: 0px 5px;
    }
  }
`
const Statistics: React.FC = () => {
  const set = ["本周", "本月", "今年"] as const
  const [index, setIndex] = useState(0) //切换年月周
  const [title, setTitle] = useState("周")
  const {
    state: { allRecords },
  } = useContext(Context)
  const [node, setNode] = useState<HTMLDivElement>()
  const [chart, setChart] = useState<echarts.ECharts>()
  const [total, setTotal] = useState<myTypes.AccountType>(getTotal(getDataThisWeek(allRecords)))
  // 第一次mounted
  useEffect(() => {
    setNode(document.getElementById("chart") as HTMLDivElement)
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
          source: getDataThisWeek(allRecords),
        },
        series: [
          {
            name: "支出",
            type: "line",
            dimensions: ["date", "income", "outcome"],
            encode: {
              x: 0,
              y: 2,
            },
          },
        ],
      })
    }
  }, [node, allRecords])

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
        const source0 = getDataThisWeek(allRecords)
        setTotal(getTotal(source0))
        setOptionSource(source0)
        break
      case 1:
        const source1 = getDataThisMonth(allRecords)
        setTotal(getTotal(source1))
        setOptionSource(source1)
        break
      case 2:
        const source2 = getDataThisYear(allRecords)
        setTotal(getTotal(source2))
        setOptionSource(source2)
        break
      default:
        const source3 = getDataThisWeek(allRecords)
        setTotal(getTotal(source3))
        setOptionSource(source3)
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
    <LayoutWrapper className="statistics">
      <Layout>
        <div className="header">
          <Picker onChange={pickerChange}></Picker>
          <Tabs onChange={onChange} index={index}></Tabs>
        </div>
        <div className="content">
          <h1 className="title">{set[index]}</h1>
          <p>总收入:￥{total.income}</p>
          <p>总支出:￥{total.outcome}</p>
          <div style={{ height: "300px" }} id="chart" className="chart"></div>
        </div>
      </Layout>
    </LayoutWrapper>
  )
}

export default Statistics
