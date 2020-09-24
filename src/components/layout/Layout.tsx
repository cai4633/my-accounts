import React, { useEffect } from "react"
import styled from "styled-components"
import Nav from "components/nav/Nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;
  position: relative;
  .container {
    height: 100%;
    main {
      min-height: 100%;
      padding-bottom: 55px;
      text-align: left;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
    }
    .nav-wrapper {
      position: absolute;
      z-index: 1000;
      width: 100%;
      bottom: 0px;
    }
  }
`

function Layout(prop: any) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
