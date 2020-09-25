import { orderByDate, settleAccountsByDay, recordsRankByMonth, isTotal } from "@/common/ts/detail"
import { theme, mixin } from "@/common/ts/variable"
import { useTag } from "@/hooks/useTag"
import { DatePickerView } from "antd-mobile"
import Layout from "components/layout/Layout"
import dayjs from "dayjs"
import React, { useState, useEffect, memo, useContext, useRef, useMemo } from "react"
import styled from "styled-components"
import Icon from "@/components/icon/Icon"
import { Context } from "@/common/ts/context"
import { NavLink } from "react-router-dom"
import RecordListItem from "@/components/RecordListItem"

const LayoutWrapper = styled.div`
  position: relative;
  height: 100%;
  .category-wrapper {
    color: ${theme.color};
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
        .month > .big {
          font-size: 1.4em;
        }
        &::after {
          position: absolute;
          content: "";
          right: 0;
          display: block;
          width: 2px;
          height: calc(100% - 16px);
          background-color: ${theme.color};
        }
      }
      .income,
      .outcome {
        flex: 2;
      }
    }
    .datePickerWrapper {
      background: #fff;
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      .shade {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100vh;
        top: 0;
      }
    }
  }

  .content-wrapper {
    .content {
      margin-top: 1em;
      &:nth-child(1) {
        margin-top: 0em;
      }
      h2 {
        color: ${theme.text_color_grey};
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
          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            line-height: 22px;
            padding: 9px 0px;
            .tag > .text {
              margin-left: 10px;
            }
            .note {
              flex: 1;
              margin: 0 10px;
              color: ${theme.text_color_darker};
              font-size: 14px;
              text-align: left;
              ${mixin.noWrap}
            }
          }
        }
      }
    }
  }
`

interface RecordsType {
  rank: myTypes.Rank[]
  income: number
  outcome: number
}
const Detail: React.FC = memo(() => {
  const { allRecords, dispatch } = useContext(Context)
  const [date, setDate] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const { findTagId, tags, findTags } = useTag()
  const getRecords = (data: myTypes.RecordItem[], date: Date) => recordsRankByMonth(data, date)
  const [records, setRecords] = useState<RecordsType>(getRecords([], date))
  const [rank, setRank] = useState<ReturnType<typeof orderByDate>>([])
  const [total, setTotal] = useState<Pick<RecordsType, "income" | "outcome">>({ income: 0, outcome: 0 })
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
    const { rank, income, outcome } = getRecords(allRecords, value) //数据随时间选择器改变
    setRecords({ rank, income, outcome })
    setDate(value)
  }
  const getMonth = (date: Date) => {
    const month = date.getMonth() + 1
    return month > 9 ? month.toString() : "0" + month
  }

  const pickerHide = () => {
    setShowPicker(false)
  }

  useEffect(() => {
    const { rank, income, outcome } = records
    setRank(rank)
    setTotal({ income, outcome })
  }, [records])

  useEffect(() => {
    setRecords(getRecords(allRecords, date))
  }, [allRecords])

  return (
    <LayoutWrapper>
      <Layout className="statistics">
        <div className="category-wrapper">
          <h1>天天记账</h1>
          <div className="content">
            <div className="date content-item" onClick={() => setShowPicker(true)}>
              <span className="year">{date.getFullYear()}年</span>
              <span className="month">
                <span className="big">{getMonth(date)}</span>月<Icon name="dropdown"></Icon>
              </span>
            </div>
            <div className="income content-item">
              <span className="title">收入</span>
              <span className="text">{total.income}</span>
            </div>
            <div className="outcome content-item">
              <span className="title">支出</span>
              <span className="text">{total.outcome}</span>
            </div>
          </div>
          {showPicker && (
            <div className="datePickerWrapper">
              <div
                className="shade"
                onClick={() => {
                  pickerHide()
                }}></div>
              <DatePickerView mode="month" value={date} onChange={onChange}></DatePickerView>
            </div>
          )}
        </div>
        <div className="content-wrapper">
          {rank.map((item: myTypes.Rank) => {
            const showData = settleAccountsByDay(item[1])
            return (
              <div className="content" key={item[0]}>
                <h2>
                  <span className="date">{getDay(item[0])}</span>
                  <div className="total">
                    <span className="title">{isTotal(showData) && showData.title}</span>
                    <span className="number">{isTotal(showData) && showData.total}</span>
                  </div>
                </h2>
                <ul className="detail">
                  {item[1].map((item: myTypes.RecordItem, index) => {
                    return (
                      <li key={item.id}>
                        <NavLink to={`/editRecord/${item.id}`}>
                          {item.selected.map((id) => (
                            <RecordListItem id={id} key={`${item.id}${id}`}></RecordListItem>
                          ))}
                          <span className="note no-wrap">{item.note}</span>
                          <span className="amount">
                            {item.category}
                            {item.output}
                          </span>
                        </NavLink>
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
})
export default Detail
