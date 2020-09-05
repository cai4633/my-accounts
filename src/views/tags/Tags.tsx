import React, { useState } from "react"
import Layout from "components/layout/Layout"
import { useTag } from "common/ts/useTag"
import styled from "styled-components"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import CategorySection from "@/components/categorySection/CategorySection"

interface MapType {
  [key: string]: "income" | "outcome"
}

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
  main {
    .category-wrapper {
      border: 1px solid transparent;
    }
  }
`

const Tags = () => {
  const map: MapType = { "+": "income", "-": "outcome" }
  const { tags, addTag, classify } = useTag()
  const [category, setCategory] = useState<MyTypes.Categories>("-")
  const onchange = (val: MyTypes.Categories) => {
    setCategory(val)
  }
  return (
    <LayoutWrapper>
      <Layout>
        <div className="category-wrapper">
          <CategorySection category={category} onchange={onchange}></CategorySection>
        </div>
        <TagsContainer tags={classify[map[category]]}> </TagsContainer>
      </Layout>
    </LayoutWrapper>
  )
}

export default Tags
