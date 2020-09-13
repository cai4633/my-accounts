import React from "react"
import styled from "styled-components"
import Layout from "@/components/layout/Layout"
import dayjs from "dayjs"
import { theme } from "common/ts/variable"
const Wrapper = styled.div`
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
  }
`
interface Props {}
const Home = (props: Props) => {
  const today = dayjs().format("YYYY年MM月DD日")
  return (
    <Wrapper className="home">
      <Layout className="layout">
        <header>天天记账</header>
        <section className="date">
          <p>今天是</p>
          <p className="text">{today}</p>
        </section>
        <section className="current">最近记账</section>
      </Layout>
    </Wrapper>
  )
}

export default Home
