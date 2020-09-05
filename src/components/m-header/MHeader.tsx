import React, { ReactChild } from "react"
import styled from "styled-components"
import Icon from "../icon/Icon"
import { useHistory } from "react-router-dom"
import { theme } from "@/common/ts/variable"
import "common/less/mixin.less"

interface Props {}

const Header = styled.header`
  text-align: center;
  background-color: ${theme.backgroundColor};
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: normal;
    padding: 0 20px;
    .title {
      line-height: 3em;
    }
  }
`
const MHeader: React.FC<Props> = (props) => {
  const history = useHistory()
  const goback = () => {
    history.goBack()
  }
  return (
    <Header>
      <h1>
        <Icon name="left" onClick={goback} className="extend-click"></Icon>
        <span className="title">{props.children}</span>
        <span className="btn extend-click">完成</span>
      </h1>
    </Header>
  )
}

export default MHeader
