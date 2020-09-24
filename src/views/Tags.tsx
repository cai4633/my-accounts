import CategorySection from "@/components/categorySection/CategorySection"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import Layout from "components/layout/Layout"
import React, { useState } from "react"
import styled from "styled-components"
import { useTag } from "@/hooks/useTag"

interface MapType {
  [key: string]: "income" | "outcome"
}

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
  height: 100%;
  main {
    .tags-wrapper {
      overflow: auto;
    }
  }
`

const Tags = () => {
  const map: MapType = { "+": "income", "-": "outcome" }
  const { tags, addTag, classify } = useTag()
  const [category, setCategory] = useState<myTypes.Categories>("-")
  const onchange = (val: myTypes.Categories) => {
    setCategory(val)
  }
  return (
    <LayoutWrapper>
      <Layout>
        <div className="category-wrapper">
          <CategorySection category={category} onchange={onchange}></CategorySection>
        </div>
        <div className="tags-wrapper">
          <TagsContainer tags={classify[map[category]]}> </TagsContainer>
        </div>
      </Layout>
    </LayoutWrapper>
  )
}

export default Tags
