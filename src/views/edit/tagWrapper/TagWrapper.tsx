import styled from "styled-components"

export const TagWrapper = styled.section`
  text-align: left;
  padding: 0px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  .tag-wrapper {
    span {
      display: inline-block;
      background-color: rgb(217, 217, 217);
      margin: 5px;
      padding: 5px 1.3em;
      line-height: 1.5em;
      border-radius: 2em;
      font-size: 14px;
      &.selected {
        background-color: #f60;
      }
    }
  }
  button {
    flex: 0;
    margin: 20px 5px 5px 5px;
    font-size: 14px;
    color: #999;
    padding: 0px 5px;
    text-align: left;
    border-bottom: 1px solid #000;
  }
`
