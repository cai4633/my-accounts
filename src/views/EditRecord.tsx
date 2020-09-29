import React, { useContext, useMemo, useRef, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components"
import Layout from "@/components/layout/Layout"
import Button from "@/components/button/Button"
import MHeader from "components/m-header/MHeader"
import { findRecord, updateRecords } from "@/common/ts/records"
import { Context } from "@/common/ts/context"
import { Toast, Modal } from "antd-mobile"
import { theme } from "@/common/ts/variable"

const MyLayout = styled(Layout)`
  font-size: 16px;
  position: relative;
  main {
    margin-top: 8px;
    & > span {
      padding-left: 20px;
    }
    .record {
      ul > li {
        margin: 0 20px;
        padding-left: 20px;
        font-size: 14px;
        line-height: 4;
        border-bottom: 1px solid #ccc;
        label {
          span {
            color: ${theme.text_color_grey};
          }
          input {
          }
        }
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

const EditRecord: React.FC<Prop> = React.memo((prop) => {
  const history = useHistory()
  const output = useRef<HTMLInputElement>(null)
  const note = useRef<HTMLInputElement>(null)
  const { recordId } = useParams<Params>()
  const [btnVisible, setBtnVisible] = useState(true)
  const {
    state: { allRecords },
    dispatch,
  } = useContext(Context)
  const record: myTypes.RecordItem = useMemo(() => findRecord(window.parseInt(recordId), allRecords), [allRecords])
  const map = {
    title: "编辑账单",
    value: "删除账单",
    onclick: () => {
      Modal.alert(
        "警告",
        "你确定要删除吗?",
        [
          { text: "取消" },
          {
            text: "确定",
            onPress: () => {
              dispatch({ type: "deleteOne", data: record })
              setBtnVisible(false)
            },
          },
        ],
        "ios"
      )
    },
    onOk() {
      if (record) {
        // TODO 当数据没变化时，不提交，直接返回
        const newVal: myTypes.RecordItem = { ...record, note: note.current?.value || record.note, output: output.current?.value || record.output }
        dispatch({ type: "updateAll", data: newVal })
      }
      history.goBack()
    },
  }
  const titles = { category: "类型", output: "金额", createAt: "日期", note: "备注" }
  const category: { [key: string]: "收入" | "支出" } = { "+": "收入", "-": "支出" }
  // const keys = Object.keys(titles) as (keyof typeof titles)[]
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
      <MHeader onOk={map.onOk}>{map.title}</MHeader>
      <main>{!record ? <span>账单不存在或者已删除</span> : Note}</main>
      <div className="button-wrapper">
        {btnVisible && (
          <Button
            title={map.value}
            onClick={() => {
              map.onclick()
            }}></Button>
        )}
      </div>
    </MyLayout>
  )
})

export default EditRecord
