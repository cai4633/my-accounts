import React from "react"
import styled from "styled-components"
import Nav from "components/nav/Nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-bottom: 75px;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .container {
    height: 100%;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    main {
      box-sizing: border-box;
      min-height: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
      &::after {
        content: "";
        display: block;
        padding-bottom: 70px;
      }
    }
    .nav-wrapper {
      position: fixed;
      z-index: 1000;
      width: 100%;
      bottom: 0px;
    }
  }
`

function Layout(prop: any) {
  return (
    <Wrapper className="layout">
      <div className="container">
        <main className={prop.className}>{prop.children}</main>
        <div className="nav-wrapper">
          <Nav></Nav>
        </div>
      </div>
    </Wrapper>
  )
}
export default Layout
