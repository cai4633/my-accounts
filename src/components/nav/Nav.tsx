import React from "react"
import Icon from "@/components/icon/Icon"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

const NavWrapper = styled.nav`
  background-color: #fff;
  ul {
    display: flex;
    vertical-align: top;
    li {
      flex: 1;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
      padding: 5px;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.3);
        .icon {
          margin-bottom: 5px;
        }
        &.selected {
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
        }
      }
    }
  }
`

function Nav() {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/tags" activeClassName="selected">
            <Icon name="tag"></Icon>标签
          </NavLink>
        </li>
        <li>
          <NavLink to="/edit" activeClassName="selected">
            <Icon name="money"></Icon>记一笔
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="statistics"></Icon>统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  )
}
export default Nav
