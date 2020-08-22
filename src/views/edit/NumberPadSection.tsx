import React, { useState } from "react"
import Layout from "components/layout/Layout"
import styled from "styled-components"

const NumberPadWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 20px;
  .output {
    width: 100%;
    input {
      text-align: right;
      width: 100%;
      box-sizing: border-box;
      line-height: 3em;
      padding: 0px 10px;
      box-shadow: inset 0px -5px 5px -5px rgba(0, 0, 0, 0.25), inset 0px 5px 5px -5px rgba(0, 0, 0, 0.25);
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .pad {
    min-height: 50px;
    flex-grow: 1;
    box-sizing: border-box;
    .button-wrapper {
      height: 100%;
      button {
        box-sizing: border-box;
        background-color: #eee;
        width: 25%;
        float: left;
        height: 25%;
        &.white-1 {
          background-color: #f2f2f2;
        }
        &.white-2 {
          background-color: #e0e0e0;
        }
        &.white-3 {
          background-color: #d3d3d3;
        }
        &.white-4 {
          background-color: #c1c1c1;
        }
        &.white-5 {
          background-color: #b8b8b8;
        }
        &.white-6 {
          background-color: #a9a9a9;
        }
        &.white-7 {
          background-color: #9a9a9a;
        }
        &.white-8 {
          background-color: #8b8b8b;
        }
        &.dot {
          font-weight: 900;
        }
        &:nth-child(12) {
          height: 50%;
          float: right;
        }
        &:nth-child(13) {
          width: 50%;
        }
      }
    }
  }
`
const NumberPadSection: React.FC = () => {
  const [output, setOutput] = useState("0")
  return (
    <NumberPadWrapper>
      <div className="output">
        <input defaultValue={output} />
      </div>
      <div className="pad">
        <div className="button-wrapper">
          <button className="white-1">1</button>
          <button className="white-2">2</button>
          <button className="white-3">3</button>
          <button className="white-4">删除</button>
          <button className="white-2">4</button>
          <button className="white-3">5</button>
          <button className="white-4">6</button>
          <button className="white-5">清空</button>
          <button className="white-3">7</button>
          <button className="white-4">8</button>
          <button className="white-5">9</button>
          <button className="white-7">OK</button>
          <button className="white-5">0</button>
          <button className="dot white-6">.</button>
        </div>
      </div>
    </NumberPadWrapper>
  )
}

export default NumberPadSection
