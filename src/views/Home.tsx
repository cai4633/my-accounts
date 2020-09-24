import React, { FC, useContext, useEffect } from "react"
import styled from "styled-components"
import Layout from "@/components/layout/Layout"
import dayjs from "dayjs"
import { theme, mixin } from "common/ts/variable"
import Icon from "components/icon/Icon"
import { getDataToday } from "common/ts/detail"
import { useTag } from "@/hooks/useTag"
import { Context } from "@/common/ts/context"
const Wrapper = styled.div`
  background-color: ${theme.backgroundWhite};
  .layout {
    header {
      color: ${theme.color};
      background-color: ${theme.backgroundColor};
      text-align: center;
      font-size: 1.5rem;
      line-height: 2.5em;
      border-bottom: 1px solid #ccc;
    }
    .date {
      color: ${theme.color};
      background-color: ${theme.backgroundColor};
      padding: 1em;
      p {
        line-height: 2em;
        &.text {
          font-size: 1.5rem;
          text-align: center;
        }
      }
    }
    .current {
      padding: 1.5em 0;
      flex: 1;
      overflow: auto;
      h2 {
        padding: 0 1em;
        font-size: 1rem;
        display: flex;
        align-items: center;
        font-weight: 600;
        svg {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 6px;
        }
      }
      .content {
        margin-top: 1em;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          line-height: 22px;
          background-color: #fff;
          padding: 5px 0px;
          border-radius: 5px;
          margin: 5px 0;
          .tag {
            margin: 0 1em;
            .text {
              margin-left: 10px;
            }
          }
          .note {
            flex: 1;
            margin: 0 10px;
            color: #aaa;
            font-size: 14px;
            text-align: left;
            ${mixin.noWrap}
          }
          .amount {
            margin: 0 1em;
          }
        }
      }
    }
  }
`
interface Props {}
const Home: FC = (props: Props) => {
  const { allRecords } = useContext(Context)
  const today = dayjs().format("YYYY年MM月DD日")
  const { findTagId, tags } = useTag()
  const data = getDataToday(allRecords)

  return (
    <Wrapper className="home">
      <Layout className="layout">
        <header>天天记账</header>
        <section className="date">
          <p>今天是</p>
          <p className="text">{today}</p>
        </section>
        <section className="current">
          <h2>
            <Icon name="current"></Icon>今天
          </h2>
          <div className="content">
            <ul className="today">
              {data.records.map((item, index) => {
                return (
                  <li key={index}>
                    {item.selected.map((id) => {
                      return (
                        <span className="tag" key={id}>
                          <Icon name={tags[findTagId(id)]?.icon}></Icon>
                          <span className="text">{tags[findTagId(id)]?.name}</span>
                        </span>
                      )
                    })}
                    <span className="note no-wrap">{item.note}</span>
                    <span className="amount">
                      {item.category}
                      {item.output}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </Layout>
    </Wrapper>
  )
}

export default Home
