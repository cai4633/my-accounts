import React from "react"
import Layout from "components/layout/Layout"
import { useTag } from "common/ts/useTag"
import styled from "styled-components"
import Icon from "@/components/icon/Icon"
import TagsContainer from "@/components/tagsContainer/TagsContainer"

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
`

const Tags = () => {
  const { tags, addTag } = useTag()
  return (
    <LayoutWrapper>
      <Layout>
        <TagsContainer tags={tags}> </TagsContainer>
      </Layout>
    </LayoutWrapper>
  )
}

export default Tags
