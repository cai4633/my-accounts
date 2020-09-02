import { Record } from "@/common/ts/cache"
import Layout from "components/layout/Layout"
import React, { useState } from "react"
import styled from "styled-components"
import CategorySection from "./edit/CategorySection"
import { useTag } from "@/common/ts/useTag"

const LayoutWrapper = styled.div`
  .category-wrapper {
    button {
      font-size: 24px;
      line-height: 2.7em;
      background-color: #fff;
    }
  }

  .content-wrapper {
    overflow: auto;
    .content {
      .date {
        background-color: #fff;
        background-color: #e5e5e5;
        font-size: 17px;
        line-height: 22px;
        padding: 9px 10px;
      }
      .detail {
        padding: 0 10px;
        li {
          display: flex;
          justify-content: space-between;
          font-size: 17px;
          line-height: 22px;
          padding: 9px 0px;
          .note {
            flex: 1;
            margin: 0 10px;
            color: #999;
            text-align: left;
          }
        }
      }
    }
  }
`

const Statistics = () => {
  const [category, setCategory] = useState<MyTypes.Categories>("+")
  const getRecords = recordsOrderByDate(Record.get())
  const [records, setRecords] = useState<[string, MyTypes.RecordItem[]][]>(getRecords("+"))
  const { findTag, tags } = useTag()
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
      Object.entries(orders[category]).sort((a: [string, MyTypes.RecordItem[]], b: [string, MyTypes.RecordItem[]]) => {
        if (a[0] < b[0]) {
          return -1
        }
        if (a[0] > b[0]) {
          return 1
        }
        return 0
      })
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
                <div className="date">{record[0]}</div>
                <ul className="detail">
                  {record[1].map((item, index) => {
                    return (
                      <li key={index + 10000}>
                        {item.selected.map((id) => {
                          return (
                            <span className="tag" key={id}>
                              {tags[findTag(id)].name}
                            </span>
                          )
                        })}
                        <span className="note">{item.note}</span>
                        <span className="amount">￥{item.output}</span>
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

export default Statistics
