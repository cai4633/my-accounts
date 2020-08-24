import React from "react"
import styled from "styled-components"

type Prop = { title: string }

const _Button = styled.div`
  text-align: center;
  padding: 44px;
  span {
    vertical-align: top;
    display: inline-block;
    color: #fff;
    font-size: 17px;
    line-height: 22px;
    padding: 9px 15px;
    border-radius: 4px;
    background-color: #767676;
  }
`

 const Button: React.FC<Prop> = (prop) => {
  return (
    <_Button>
      <span>{prop.title}</span>
    </_Button>
  )
}

export default Button