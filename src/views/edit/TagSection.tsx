import React from "react"
import Layout from "components/layout/Layout"
import styled from "styled-components"

const TagWrapper = styled.section`
  text-align: left;
  padding: 0px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  .tag-wrapper {
    span {
      background-color: rgb(217, 217, 217);
      margin: 5px;
      padding: 5px 1.3em;
      line-height: 1.5em;
      border-radius: 2em;
      font-size: 14px;
    }
  }
  button {
    min-width: 5em;
    flex: 0;
    margin: 15px 5px 5px 5px;
    font-size: 14px;
    color: rgb(217, 217, 217);
    padding: 0px 5px;
    text-align: left;
    border-bottom: 1px solid #000;
  }
`
const tags = ["衣", "食", "住", "行"]
const TagSection: React.FC = () => {
  return (
    <TagWrapper>
      <div className="tag-wrapper">
        {tags.map((tag: string) => {
          return <span key={tag}>{tag}</span>
        })}
      </div>
      <button>新增标签</button>
    </TagWrapper>
  )
}

export default TagSection
