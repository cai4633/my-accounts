import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import Icon from "../icon/Icon"
import styled from "styled-components"
import { theme } from "@/common/ts/variable.ts"
import classnames from "classnames"

interface Props {
  tags: any[]
  checkTags?: number[]
  selected?: number[]
  addBtn?: boolean
  parent?: string
  onchange?: (val: number) => void
  togglePad?: (selected: number[]) => void
}

const TagsWrapper = styled.div`
  background-color: #fff;
  & > ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      font-size: 12px;
      margin: 10px 15px;
      border: 1px solid transparent;
      &.empty {
        width: 3rem;
        height: 0;
        margin: 0 16px;
        border: none;
        
      }
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
      .selected {
        svg.icon {
          background-color: ${theme.backgroundColor};
        }
      }
    }
  }
`

const TagsContainer: React.FC<Props> = (props) => {
  const { tags, addBtn, checkTags, onchange, parent, togglePad, selected } = props
  const getClass = (id: number) => {
    if (checkTags) {
      return checkTags.includes(id) ? "checked" : ""
    }
    if (selected) {
      return selected.includes(id) ? "selected" : ""
    }
    return ""
  }
  const toggleTag = (tagid: number) => {
    if (onchange) {
      onchange(tagid)
    } else if (togglePad) {
      togglePad([tagid])
    }
  }
  const Item = (tag: myTypes.TagItem) => {
    return (
      <React.Fragment>
        <Icon name={tag.icon}></Icon>
        <span className="name">{tag.name}</span>
      </React.Fragment>
    )
  }
  //路由部分
  const navLink = (tag: myTypes.TagItem) => {
    return (
      <li
        key={tag.id}
        onClick={() => {
          toggleTag(tag.id)
        }}>
        {parent !== "money" ? (
          <NavLink to={"/tags/" + tag.id}>{Item(tag)}</NavLink>
        ) : (
          <div className={classnames("item", getClass(tag.id))}>{Item(tag)}</div>
        )}
      </li>
    )
  }

  // addTag部分
  const add = (tag: myTypes.TagItem) => {
    return (
      <li
        key={tag.id}
        onClick={() => {
          toggleTag(tag.id)
        }}>
        <div className={classnames("item", getClass(tag.id))}>{Item(tag)}</div>
      </li>
    )
  }
  const empty: number[] = []
  for (let i = 1; i <= 8; i++) {
    empty.push(i)
  }

  return (
    <div>
      <TagsWrapper className="tags-container">
        <ol>
          {/* 各种标签 */}
          {tags &&
            tags.map((tag: myTypes.TagItem) => {
              return addBtn ? navLink(tag) : add(tag)
            })}
          {/* 添加按钮 */}
          {addBtn && (
            <li>
              <NavLink to="/addTags">
                <Icon name="add"></Icon>
                <span className="name">添加</span>
              </NavLink>
            </li>
          )}
          {/* 妥协布局，添加空元素 */}
          {empty.map((item) => (
            <li className="empty" key={item}></li>
          ))}
        </ol>
      </TagsWrapper>
    </div>
  )
}

TagsContainer.defaultProps = {
  addBtn: true,
}
export default TagsContainer
