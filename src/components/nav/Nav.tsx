import React from "react"
import Icon from "@/components/icon/Icon"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { theme } from "@/common/ts/variable"

const NavWrapper = styled.nav`
  background-color: #fff;
  ul {
    display: flex;
    margin-bottom: 0;
    li {
      flex: 1;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
      a {
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.3);
        font-size: 12px;
        svg {
          width: 2em;
          height: 2em;
        }
        .icon {
          margin-bottom: 5px;
        }
        &.selected {
          background-color: ${theme.backgroundColor};
          color: ${theme.color};
          font-weight: 600;
          svg {
            fill: ${theme.color};
          }
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
          <NavLink to="/home" activeClassName="selected">
            <Icon name="home"></Icon>首页
          </NavLink>
        </li>
        <li>
          <NavLink to="/detail" activeClassName="selected">
            <Icon name="details"></Icon>明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="add_money"></Icon>记账
          </NavLink>
        </li>
        <li>
          <NavLink to="/tags" activeClassName="selected">
            <Icon name="tag"></Icon>标签
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="statistics"></Icon>图表
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  )
}
export default Nav
