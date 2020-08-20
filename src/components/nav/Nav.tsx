import React from "react"
import Icon from "components/icon/Icon"
import styled from "styled-components"
import { Link } from "react-router-dom"

const MyNav = styled.nav`
  ul {
    display: flex;
    vertical-align: top;
    li {
      flex: 1;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      a {
        margin-top: 5px;
      }
    }
  }
`
function Nav() {
  return (
    <MyNav>
      <ul>
        <li>
          <Icon name="tag" fill="green"></Icon>
          <Link to="/tag">标签</Link>
        </li>
        <li>
          <Icon name="money"></Icon>
          <Link to="/edit">记一笔</Link>
        </li>
        <li>
          <Icon name="statistics"></Icon>
          <Link to="/statistics">统计</Link>
        </li>
      </ul>
    </MyNav>
  )
}
export default Nav
