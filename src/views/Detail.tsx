import { Record } from "@/common/ts/cache.ts"
import Layout from "components/layout/Layout"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import CategorySection from "components/categorySection/CategorySection"
import { useTag } from "@/hooks/useTag"
import echarts from "echarts"
import dayjs from "dayjs"
import { theme } from "@/common/ts/variable"
import { recordsOrderByDate, settleAccountsByDay } from "@/common/ts/detail"

const LayoutWrapper = styled.div`
  .category-wrapper {
    button {
      font-size: 24px;
      line-height: 2em;
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
  const getRecords = () => {
    return recordsOrderByDate(Record.get())
  }
  const [records, setRecords] = useState<[string, MyTypes.RecordItem[]][]>(getRecords())
  const { findTagId, tags } = useTag()

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

  return (
    <LayoutWrapper>
      <Layout className="statistics">
        <div className="category-wrapper">
          <CategorySection category={category} onchange={(category) => changeFunc({ category })}></CategorySection>
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
