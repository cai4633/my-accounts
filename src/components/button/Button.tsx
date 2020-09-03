import React from "react"
import styled from "styled-components"

type Prop = { backgroundColor?: string } & React.HTMLAttributes<HTMLDivElement>

const Container = styled.div`
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
  const { title, backgroundColor } = prop
  return (
    <Container onClick={prop.onClick}>
      <span style={{ backgroundColor }}>{title}</span>
    </Container>
  )
}

export default Button
