import React, { useContext, useMemo, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useTag } from "@/hooks/useTag"
import styled from "styled-components"
import Layout from "@/components/layout/Layout"
import Button from "@/components/button/Button"
import MHeader from "components/m-header/MHeader"
import { findRecord } from "@/common/ts/records"
import { updateRecord } from "api/records"
import { Context } from "@/common/ts/context"

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
type Params = { recordId: string }

const EditRecord: React.FC<Prop> = (prop) => {
  const history = useHistory()
  const output = useRef<HTMLInputElement>(null)
  const note = useRef<HTMLInputElement>(null)
  const {
    state: { allRecords },
    dispatch,
  } = useContext(Context)
  const { findTagId, updateTag, deleteTag } = useTag()
  const { recordId } = useParams<Params>()
  const record: myTypes.RecordItem = useMemo(() => findRecord(window.parseInt(recordId), allRecords), [allRecords])
  const map = {
    title: "编辑账单",
    value: "删除账单",
    clickHandle: () => {
      deleteTag(window.parseInt(recordId))
    },
  }
  const onOk = () => {
    const newVal: myTypes.RecordItem = { ...record, note: note.current?.value || record.note, output: output.current?.value || record.output }
    dispatch({ type: "updateAll", data: newVal })
    updateRecord(newVal)
    history.goBack()
  }
  const titles = { category: "类型", output: "金额", createAt: "日期", note: "备注" }
  const category: { [key: string]: "收入" | "支出" } = { "+": "收入", "-": "支出" }
  const keys = Object.keys(titles) as (keyof typeof titles)[]
  const Note = (
    <div className="record">
      <ul>
        <li>
          <label>
            <span>{titles.output}：</span>
            <input type="text" defaultValue={record?.output} ref={output} />
          </label>
        </li>
        <li>
          <label>
            <span>{titles.note}：</span>
            <input type="text" defaultValue={record?.note} ref={note} />
          </label>
        </li>
        <li className="no-pointer">
          <label>
            <span>{titles.category}：</span>
            <input type="text" defaultValue={category[record?.category]} />
          </label>
        </li>

        <li className="no-pointer">
          <label>
            <span>{titles.createAt}：</span>
            <input type="text" defaultValue={record?.createAt} />
          </label>
        </li>
      </ul>
    </div>
  )
  return (
    <MyLayout className="tag">
      <MHeader onOk={onOk}>{map.title}</MHeader>
      <main>{!record ? <span>账单不存在或者已删除</span> : Note}</main>
      <div className="button-wrapper">
        <Button title={map.value} onClick={map.clickHandle}></Button>
      </div>
    </MyLayout>
  )
}

export default EditRecord
