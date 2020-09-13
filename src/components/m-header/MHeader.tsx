import React from "react"
import styled from "styled-components"
import Icon from "../icon/Icon"
import { useHistory } from "react-router-dom"
import { theme } from "@/common/ts/variable"
import "common/less/mixin.less"

interface Props {
  onOk?: () => void
}

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
    margin: 0;
    .title {
      line-height: 3em;
    }
  }
`
const MHeader: React.FC<Props> = (props) => {
  const { onOk } = props
  const history = useHistory()
  const goback = () => {
    history.goBack()
  }
  return (
    <Header>
      <h1>
        <Icon name="left" onClick={goback} className="extend-click"></Icon>
        <span className="title">{props.children}</span>
        <span
          className="btn extend-click"
          onClick={() => {
            onOk!()
          }}>
          完成
        </span>
      </h1>
    </Header>
  )
}

MHeader.defaultProps = {
  onOk: () => {
    console.log("ok")
  },
}
export default MHeader
