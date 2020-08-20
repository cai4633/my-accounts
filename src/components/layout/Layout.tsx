import React from "react"
import styled from "styled-components"
import Nav from "components/nav/Nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
`

const Main = styled.main`
  flex: 1;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
`

function Layout(prop: any) {
  return (
    <Wrapper>
      <Main>{prop.children}</Main>
      <Nav></Nav>
    </Wrapper>
  )
}
export default Layout