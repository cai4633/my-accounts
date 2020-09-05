import Icon from "@/components/icon/Icon"
import MHeader from "@/components/m-header/MHeader"
import React, { useState } from "react"
import styled from "styled-components"
import { useTag } from "@/common/ts/useTag"
import Layout from "@/components/layout/Layout"
import TagsContainer from "components/tagsContainer/TagsContainer"
const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
`

const AddTags: React.FC = () => {
  const { tags, addTag, allTags } = useTag()
  const [checktags, setChecktags] = useState<number[]>([])
  const onchangeFn = (val: number) => {
    const copy = checktags.slice()
    const index = copy.indexOf(val)
    if (index === -1) {
      copy.push(val)
    } else {
      copy.splice(index, 1)
    }
    setChecktags(copy)
    console.log(checktags)
  }
  return (
    <LayoutWrapper>
      <MHeader>添加标签</MHeader>
      <Layout>
        <TagsContainer tags={allTags} addBtn={false} checkTags={checktags} onchange={onchangeFn}></TagsContainer>
      </Layout>
    </LayoutWrapper>
  )
}

export default AddTags
