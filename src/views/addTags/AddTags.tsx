import Icon from "@/components/icon/Icon"
import MHeader from "@/components/m-header/MHeader"
import React, { useState } from "react"
import styled from "styled-components"
import { useTag } from "@/hooks/useTag"
import Layout from "@/components/layout/Layout"
import TagsContainer from "components/tagsContainer/TagsContainer"
import { useHistory } from "react-router-dom"

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
`
const AddTags: React.FC = () => {
  const { tags, addTag, allTags, checktags, setChecktags, restTags } = useTag()
  const history = useHistory()

  // 添加标签页面的toggle事件
  const onchangeFn = (val: number) => {
    const copy = checktags.slice()
    const index = copy.indexOf(val)
    if (index === -1) {
      copy.push(val)
    } else {
      copy.splice(index, 1)
    }
    setChecktags(copy)
  }

  // 完成按钮点击事件
  const onOk = () => {
    addTag(checktags)
    history.goBack()
  }

  return (
    <LayoutWrapper>
      <MHeader onOk={onOk}>添加标签</MHeader>
      <Layout>
        <TagsContainer tags={restTags} addBtn={false} checkTags={checktags} onchange={onchangeFn}></TagsContainer>
      </Layout>
    </LayoutWrapper>
  )
}

export default AddTags
