import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import Icon from "../icon/Icon"
import styled from "styled-components"
import { theme } from "@/common/ts/variable"
import classnames from "classnames"

interface Props {
  tags: any[]
  checkTags?: number[]
  addBtn?: boolean
  onchange?: (val: number) => void
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
      border: 1px solid transparent;
      a,
      .item {
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
          border: 1px solid transparent;
        }
      }
      .checked {
        svg.icon {
          border: 1px solid red;
        }
      }
    }
  }
`

const TagsContainer: React.FC<Props> = (props) => {
  const { tags, addBtn, checkTags, onchange } = props
  const getClass = (id: number) => {
    return checkTags && checkTags.includes(id) ? "checked" : ""
  }
  const toggleTag = (tagid: number) => {
    if (onchange) {
      onchange(tagid)
    }
  }

  //路由部分
  const navLink = (tag: MyTypes.TagItem) => {
    return (
      <li key={tag.id}>
        <NavLink to={"/tags/" + tag.id}>
          <Icon name={tag.icon}></Icon>
          <span className="name">{tag.name}</span>
        </NavLink>
      </li>
    )
  }

  // addTag部分
  const add = (tag: MyTypes.TagItem) => {
    return (
      <li
        key={tag.id}
        onClick={() => {
          toggleTag(tag.id)
        }}>
        <div className={classnames("item", getClass(tag.id))}>
          <Icon name={tag.icon}></Icon>
          <span className="name">{tag.name}</span>
        </div>
      </li>
    )
  }

  // 标签页部分
  return (
    <div>
      <TagsWrapper>
        <ol>
          {tags.map((tag: MyTypes.TagItem) => {
            return addBtn ? navLink(tag) : add(tag)
          })}

          {addBtn && (
            <li>
              <NavLink to="/addTags">
                <Icon name="add"></Icon>
                <span className="name">添加</span>
              </NavLink>
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
