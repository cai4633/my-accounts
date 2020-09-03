import Icon from "@/components/icon/Icon"
import MHeader from "@/components/m-header/MHeader"
import React from "react"
import styled from "styled-components"
import { useTag } from "@/common/ts/useTag"
import Layout from "@/components/layout/Layout"
import { Link } from "react-router-dom"
import { theme } from "@/common/ts/variable"
import TagsContainer from "components/tagsContainer/TagsContainer"

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
`

const AddTags: React.FC = () => {
  const { tags, addTag, allTags } = useTag()
  return (
    <LayoutWrapper>
      <MHeader>添加标签</MHeader>
      <Layout>
        <TagsContainer tags={allTags} addBtn={false}></TagsContainer>
      </Layout>
    </LayoutWrapper>
  )
}

export default AddTags
