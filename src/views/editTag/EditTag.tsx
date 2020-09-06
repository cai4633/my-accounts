import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useTag } from "@/hooks/useTag"
import styled from "styled-components"
import NoteSection from "views/edit/NoteSection"
import Layout from "@/components/layout/Layout"
import Button from "@/components/button/Button"
import MHeader from "components/m-header/MHeader"

const MyLayout = styled(Layout)`
  font-size: 16px;
  position: relative;
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

type Prop = {
  placeholder?: string
  btnBackground?: string
}
type Params = { tagId: string }

const Tag: React.FC<Prop> = (prop) => {
  const history = useHistory()
  const { tags, findTagId, updateTag, deleteTag } = useTag()
  const { tagId: id } = useParams<Params>()
  const tagid = findTagId(window.parseInt(id))
  const tagMap = {
    title: "编辑标签",
    value: "删除标签",
    clickHandle: () => {
      deleteTag(window.parseInt(id))
    },
  }
  const tagName = tagid >= 0 ? tags[tagid].name : ""
  const changeFn = (tag: string) => {
    updateTag(tagid, tag)
  }
  const Note = <NoteSection note={tagName} onchange={changeFn} title="标签名" placeholder={prop.placeholder || "在这里填写备注"}></NoteSection>
  const onOk = () => {
    history.goBack()
  }
  return (
    <MyLayout className="tag">
      <MHeader onOk={onOk}>编辑标签</MHeader>
      <main>{tagid === -1 ? "标签不存在或者已删除" : Note}</main>
      <div className="button-wrapper">
        <Button title={tagMap.value}  onClick={tagMap.clickHandle}></Button>
      </div>
    </MyLayout>
  )
}

export default Tag
