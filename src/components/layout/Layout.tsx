import React from "react"
import styled from "styled-components"
import Nav from "components/nav/Nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  /* background-color: #e5e5e5; */
  main {
    text-align: left;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 48px);
    overflow: auto;
  }
`

const Main = styled.main`
  flex: 1;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
`

function Layout(prop: any) {
  return (
    <Wrapper>
      <Main className={prop.className}>{prop.children}</Main>
      <Nav></Nav>
    </Wrapper>
  )
}
export default Layout
