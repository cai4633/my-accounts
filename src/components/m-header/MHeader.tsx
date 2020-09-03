import React, { ReactChild } from "react"
import styled from "styled-components"
import Icon from "../icon/Icon"
import { useHistory } from "react-router-dom"

interface Props {}

const Header = styled.header`
  text-align: center;
  position: relative;
  background-color: #fff;
  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  h1 {
    line-height: 3em;
    font-size: 16px;
    font-weight: normal;
  }
`
const MHeader: React.FC<Props> = (props) => {
  const history = useHistory()
  const goback = () => {
    history.goBack()
  }
  return (
    <Header>
      <Icon name="left" onClick={goback}></Icon>
      <h1>{props.children}</h1>
    </Header>
  )
}

export default MHeader
