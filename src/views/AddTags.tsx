import MHeader from "@/components/m-header/MHeader"
import React from "react"
import styled from "styled-components"
import { useTag } from "@/hooks/useTag"
import Layout from "@/components/layout/Layout"
import TagsContainer from "components/tagsContainer/TagsContainer"
import { useHistory } from "react-router-dom"
import { theme } from "@/common/ts/variable"

const LayoutWrapper = styled.div`
  background-color: ${theme.dateBackground};
  min-height: 100%;
  h2.title {
    font-size: 14px;
    padding: 10px 20px;
  }
`
const AddTags: React.FC = () => {
  const { addTag, checktags, setChecktags, restTags } = useTag()
  const history = useHistory()
  const title = "暂无可添加的标签"
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
        {restTags.length ? (
          <TagsContainer tags={restTags} addBtn={false} checkTags={checktags} onchange={onchangeFn}></TagsContainer>
        ) : (
          <h2 className="title">{title}</h2>
        )}
      </Layout>
    </LayoutWrapper>
  )
}

export default AddTags
