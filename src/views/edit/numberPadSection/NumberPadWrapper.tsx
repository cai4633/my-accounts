import styled from "styled-components"

const NumberPadWrapper = styled.section`
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  .output {
    width: 100%;
    input {
      font-size: 26px;
      text-align: right;
      width: 100%;
      box-sizing: border-box;
      line-height: 1.5em;
      padding: 0px 10px;
      box-shadow: inset 0px -5px 5px -5px rgba(0, 0, 0, 0.25), inset 0px 5px 5px -5px rgba(0, 0, 0, 0.25);
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .pad {
    width: 100%;
    flex-grow: 1;
    min-height: 100px;
    display: flex;
    box-sizing: border-box;
    .button-wrapper {
      width: 100%;
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

export { NumberPadWrapper }
