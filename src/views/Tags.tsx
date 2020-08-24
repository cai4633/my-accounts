import React from "react"
import Layout from "components/layout/Layout"
import { useTag } from "common/ts/useTag"
import styled from "styled-components"
import Icon from "@/components/icon/Icon"
import Button from "@/components/button/Button"

const TagsContainer = styled.div`
  background-color: #fff;
  & > ol {
    li {
      font-size: 16px;
      padding: 12px 0;
      margin: 0 15px;
      box-shadow: inset 0px -0.5px 0px #bcbbc1;
      svg {
        float: right;
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
          {tags.map((tag: string) => {
            return (
              <li key={tag} className="clearfix">
                {tag}
                <Icon name="right"></Icon>
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
