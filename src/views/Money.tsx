import { Record } from "@/common/ts/cache"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import { useTag } from "@/hooks/useTag"
import CategorySection from "components/categorySection/CategorySection"
import dayjs from "dayjs"
import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import NoteSection from "./edit/NoteSection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { addRecords, getAllRecords } from "api/records"
import { useRecord } from "@/hooks/useRecord"
import { Context } from "@/common/ts/context"
interface MapType {
  [key: string]: "income" | "outcome"
}

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
  /* position: relative; */
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
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const Money: React.FC = () => {
  const initState: myTypes.MoneyState = { selected: [], note: "", category: "-", output: "0", id: 0 }
  const [data, setData] = useState<myTypes.MoneyState>(initState)
  const [showPad, setShowPad] = useState(false)
  const categoryWrapper = useRef<HTMLDivElement>(null)
  const tagsWrapper = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useContext(Context)
  const changeFunc = (obj: Partial<myTypes.MoneyState>) => {
    setData({ ...data, ...obj })
  }
  const submit = () => {
    const result = { ...data, createAt: dayjs().format("YYYY-MM-DD") }
    Record.set([...Record.get(), result])
    addRecords([result])
    dispatch({ type: "add", data: result })
    setData(Object.assign({}, initState)) //reset
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
        <section className="bottom" ref={bottom} id="111">
          <NoteSection note={data.note} onchange={(note) => changeFunc({ note })}></NoteSection>
          <NumberPadSection output={data.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
        </section>
      )}
    </LayoutWrapper>
  )
}

export default Money
