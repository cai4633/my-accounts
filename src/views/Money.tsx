import { Record } from "@/common/ts/cache"
import { Context } from "@/common/ts/context"
import { theme } from "@/common/ts/variable"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import { useTag } from "@/hooks/useTag"
import { addRecords } from "api/records"
import CategorySection from "components/categorySection/CategorySection"
import dayjs from "dayjs"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import NoteSection from "./edit/NoteSection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { Toast } from "antd-mobile"
import { createRecordId } from "common/ts/util"
interface MapType {
  [key: string]: "income" | "outcome"
}

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
  height: 100vh;
  overflow: auto;
  main {
    height: 100%;
    overflow: auto;

    .category-wrapper {
      min-height: 40px;
    }
    .tags-wrapper {
      overflow: auto;
      height: calc(100vh - 40px);
    }
  }
  section.bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    max-width: ${theme.maxWidth};
  }
`

const Money: React.FC = () => {
  const { state: { allRecords } } = useContext(Context)
  const initState: myTypes.MoneyState = { selected: [], note: "", category: "-", output: "0", id: 0 }
  const [data, setData] = useState<myTypes.MoneyState>(initState)
  const [showPad, setShowPad] = useState(false)
  const categoryWrapper = useRef<HTMLDivElement>(null)
  const tagsWrapper = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const { dispatch } = useContext(Context)
  const history = useHistory()
  const changeFunc = (obj: Partial<myTypes.MoneyState>) => {
    setData({ ...data, ...obj })
  }

  // ok 按钮提交功能
  const submit = () => {
    if (parseFloat(data.output) === 0) {
      Toast.info("您还未输入金额", 2)
      return
    }
    const result = { ...data, createAt: dayjs().format("YYYY-MM-DD"), id: createRecordId(allRecords) }
    Record.set([...Record.get(), result])
    addRecords([result])
    dispatch({ type: "addNew", data: result })
    setData(Object.assign({}, initState)) //reset
    history.goBack()
  }
  const map: MapType = { "+": "income", "-": "outcome" }
  let { classify } = useTag()
  const selectTag = (selected: number[]) => {
    changeFunc({ selected })
  }

  // 当selected 改变时, showpad跟着改变
  useEffect(() => {
    setShowPad(!!data.selected.length)
  }, [data.selected])

  useEffect(() => {
    // 输入框弹出时，让标签高度自适应
    if (categoryWrapper.current && tagsWrapper.current) {
      const height = document.documentElement.clientHeight - categoryWrapper.current.offsetHeight - (bottom.current ? bottom.current.offsetHeight : 0)
      tagsWrapper.current.style.height = `${height}px`
    }
  }, [showPad])
  return (
    <LayoutWrapper>
      <CSSTransition appear in classNames="fade" timeout={200}>
        <main>
          <div className="category-wrapper" ref={categoryWrapper}>
            <CategorySection category={data.category} onchange={(category) => changeFunc({ category })}></CategorySection>
          </div>
          <div className="tags-wrapper" ref={tagsWrapper}>
            <TagsContainer tags={classify[map[data.category]]} parent="money" togglePad={selectTag} selected={data.selected}></TagsContainer>
          </div>
        </main>
      </CSSTransition>

      {showPad && (
        <section className="bottom" ref={bottom}>
          <NoteSection note={data.note} onchange={(note) => changeFunc({ note })}></NoteSection>
          <NumberPadSection output={data.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
        </section>
      )}
    </LayoutWrapper>
  )
}

export default Money
