import { Record } from "@/common/ts/cache.ts"
import Layout from "components/layout/Layout"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useTag } from "@/hooks/useTag"
import echarts from "echarts"
import dayjs from "dayjs"
import { theme } from "@/common/ts/variable"
import { recordsOrderByDate, settleAccountsByDay } from "@/common/ts/detail"
import { DatePickerView } from "antd-mobile"
const LayoutWrapper = styled.div`
  .category-wrapper {
    text-align: center;
    background-color: ${theme.backgroundColor};
    button {
      font-size: 24px;
      line-height: 2em;
    }
    h1 {
      font-size: 20px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .content-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .date {
        flex: 1.5;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          right: 0;
          display: block;
          width: 2px;
          height: calc(100% - 10px);
          background-color: #000;
        }
      }
      .income,
      .outcome {
        flex: 2;
      }
    }
    .datePickerWrapper {
      background: #fff;
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
    }
  }

  .content-wrapper {
    overflow: auto;
    .content {
      h2 {
        color: ${theme.dateColor};
        border-bottom: 1px solid ${theme.borderColor};
        font-size: 12px;
        line-height: 1.8;
        padding: 4px 10px;
        display: flex;
        justify-content: space-between;
        .total > .title {
          margin-right: 6px;
        }
      }
      .detail {
        padding: 0 18px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 17px;
          line-height: 22px;
          padding: 9px 0px;
          .note {
            flex: 1;
            margin: 0 10px;
            color: #999;
            font-size: 14px;
            text-align: left;
          }
        }
      }
    }
  }
`

const Detail: React.FC = () => {
  const [category, setCategory] = useState<MyTypes.Categories>("+")
  const [date, setDate] = useState<Date>(new Date())
  const { findTagId, tags } = useTag()
  const getRecords = () => recordsOrderByDate(Record.get())
  const [records, setRecords] = useState<[string, MyTypes.RecordItem[]][]>(getRecords())
  const changeFunc = (obj: { category: MyTypes.Categories }) => {
    setCategory(obj.category)
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
  const onChange = (value: Date) => {
    console.log(dayjs(value).date())
  }
  const getMonth = (date: Date) => {
    const month = date.getMonth() + 1
    return month > 9 ? month.toString() : "0" + month
  }

  return (
    <LayoutWrapper>
      <Layout className="statistics">
        <div className="category-wrapper">
          <h1>天天记账</h1>
          <div className="content">
            <div className="date content-item">
              <span className="year">{date.getFullYear()}年</span>
              <span className="month">{getMonth(date)}月</span>
            </div>
            <div className="income content-item">
              <span className="title">收入</span>
              <span className="text">200.00</span>
            </div>
            <div className="outcome content-item">
              <span className="title">支出</span>
              <span className="text">200</span>
            </div>
          </div>
          <div className="datePickerWrapper">
            <DatePickerView mode="month" value={date} onChange={onChange}></DatePickerView>
          </div>
        </div>
        <div className="content-wrapper">
          {records.map((record, index) => {
            return (
              <div className="content" key={record[0]}>
                <h2>
                  <span className="date">{getDay(record[0])}</span>
                  <div className="total">
                    <span className="title">{settleAccountsByDay(record[1]).title}:</span>
                    <span className="number">{settleAccountsByDay(record[1]).total}</span>
                  </div>
                </h2>
                <ul className="detail">
                  {record[1].map((item, index) => {
                    return (
                      <li key={index + 10000}>
                        {item.selected.map((id) => {
                          return (
                            <span className="tag" key={id}>
                              {tags[findTagId(id)].name}
                            </span>
                          )
                        })}
                        <span className="note">{item.note}</span>
                        <span className="amount">
                          {item.category}
                          {item.output}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </Layout>
    </LayoutWrapper>
  )
}

export default Detail
