import React from "react"
import Layout from "components/layout/Layout"
import { useTag, TagItem } from "common/ts/useTag"
import styled from "styled-components"
import Icon from "@/components/icon/Icon"
import Button from "@/components/button/Button"
import { Link } from "react-router-dom"

const TagsContainer = styled.div`
  background-color: #fff;
  & > ol {
    li {
      font-size: 16px;
      margin: 0 15px;
      box-shadow: inset 0px -0.5px 0px #bcbbc1;
      a {
        padding: 12px 0;
        display: inline-block;
        width: 100%;
        svg {
          float: right;
        }
      }
    }
  }
`

const Tags = () => {
  const { tags, setTags } = useTag()
  console.log(tags)

  return (
    <Layout>
      <TagsContainer>
        <ol>
          {tags.map((tag: TagItem) => {
            return (
              <li key={tag.id} className="clearfix">
                <Link to={"/tags/" + tag.id}>
                  {tag.name}
                  <Icon name="right"></Icon>
                </Link>
              </li>
            )
          })}
        </ol>
      </TagsContainer>
      <Button title="新建标签"> </Button>
    </Layout>
  )
}

export default Tags
