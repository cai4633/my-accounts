import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useTag } from "@/common/ts/useTag"
import styled from "styled-components"
import Icon from "@/components/icon/Icon"
import NoteSection from "views/edit/NoteSection"
import Layout from "@/components/layout/Layout"
import Button from "@/components/button/Button"

const TagMap = {
  edit: {
    title: "编辑标签",
    value: "删除标签",
  },
  add: {
    title: "添加标签",
    value: "添加标签",
  },
}

type TagType = keyof typeof TagMap
type Prop = {
  placeholder?: string
  type: TagType
  btnBackground?: string
}
const MyLayout = styled(Layout)`
  font-size: 16px;
  position: relative;
  header {
    text-align: center;
    position: relative;
    line-height: 3em;
    background-color: #fff;
    svg {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  main {
    margin-top: 8px;
    section {
      padding: 6px 18px;
      background-color: #fff;
      input {
        font-size: 16px;
      }
    }
  }
  .button-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 34px;
    span {
      white-space: nowrap;
      background-color: #ff4d4f;
    }
  }
`
const Tag: React.FC<Prop> = (prop) => {
  type Params = { tagId: string }
  const { tags, setTags } = useTag()
  const { tagId } = useParams<Params>()
  const history = useHistory()
  const tagName = tagId ? tags[window.parseInt(tagId)].name : ""
  const goback = () => {
    history.goBack()
  }
  return (
    <MyLayout className="tag">
      <header>
        <Icon name="left" onClick={goback}></Icon>
        {TagMap[prop.type].title}
      </header>
      <main>
        <NoteSection note={tagName} onchange={() => {}} title="标签名" placeholder={prop.placeholder || "在这里填写备注"}></NoteSection>
      </main>
      <div className="button-wrapper">
        <Button title={TagMap[prop.type].value} backgroundColor={prop.btnBackground}></Button>
      </div>
    </MyLayout>
  )
}

export default Tag
