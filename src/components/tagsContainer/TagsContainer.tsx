import React from "react"
import { Link } from "react-router-dom"
import Icon from "../icon/Icon"
import styled from "styled-components"
import { theme } from "@/common/ts/variable"

interface Props {
  tags: any[]
  addBtn?: boolean
}

const TagsWrapper = styled.div`
  background-color: #fff;
  & > ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      font-size: 12px;
      margin: 10px 15px;
      /* box-shadow: inset 0px -0.5px 0px #bcbbc1; */
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        word-break: keep-all;
        svg.icon {
          padding: 4px;
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          margin-bottom: 4px;
          background-color: ${theme.iconBackground};
        }
      }
    }
  }
`
const TagsContainer: React.FC<Props> = (props) => {
  const { tags, addBtn } = props
  return (
    <div>
      <TagsWrapper>
        <ol>
          {tags.map((tag: MyTypes.TagItem) => {
            return (
              <li key={tag.id}>
                <Link to={"/tags/" + tag.id}>
                  <Icon name={tag.icon}></Icon>
                  <span className="name">{tag.name}</span>
                </Link>
              </li>
            )
          })}
          {addBtn && (
            <li>
              <Link to="/addTags">
                <Icon name="add"></Icon>
                <span className="name">添加</span>
              </Link>
            </li>
          )}
        </ol>
      </TagsWrapper>
    </div>
  )
}

TagsContainer.defaultProps = {
  addBtn: true,
}
export default TagsContainer
