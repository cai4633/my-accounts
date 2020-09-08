import React, { useState, useEffect, useRef } from "react"
import NoteSection from "./edit/NoteSection"
import CategorySection from "components/categorySection/CategorySection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { Record } from "@/common/ts/cache"
import dayjs from "dayjs"
import { useTag } from "@/hooks/useTag"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import styled from "styled-components"

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
  const initialState: MyTypes.MoneyState = { selected: [], note: "", category: "+", output: "0" }
  const [state, setState] = useState<MyTypes.MoneyState>(initialState)
  const [showPad, setShowPad] = useState(false)
  const categoryWrapper = useRef<HTMLDivElement>(null)
  const tagsWrapper = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const changeFunc = (obj: Partial<MyTypes.MoneyState>) => {
    setState({ ...state, ...obj })
  }
  const submit = () => {
    Record.set([...Record.get(), { ...state, createAt: dayjs().format("YYYY-MM-DD") }])
    setState(Object.assign({}, initialState)) //reset
  }
  const map: MapType = { "+": "income", "-": "outcome" }
  const { tags, classify } = useTag()
  const selectTag = (selected: number[]) => {
    changeFunc({ selected })
  }
  // 当selected 改变时, showpad跟着改变
  useEffect(() => {
    setShowPad(!!state.selected.length)
  }, [state.selected])

  useEffect(() => {
    // 输入框弹出时，让标签高度自适应
    if (categoryWrapper.current && tagsWrapper.current && bottom.current) {
      const height = document.documentElement.clientHeight - categoryWrapper.current.offsetHeight - bottom.current.offsetHeight
      tagsWrapper.current.style.height = `${height}px`
    }
  }, [showPad])
  return (
    <LayoutWrapper>
      <main>
        <div className="category-wrapper" ref={categoryWrapper}>
          <CategorySection category={state.category} onchange={(category) => changeFunc({ category })}></CategorySection>
        </div>
        <div className="tags-wrapper" ref={tagsWrapper}>
          <TagsContainer tags={classify[map[state.category]]} parent="money" togglePad={selectTag} selected={state.selected}></TagsContainer>
        </div>
      </main>
      {showPad && (
        <section className="bottom" ref={bottom}>
          <NoteSection note={state.note} onchange={(note) => changeFunc({ note })}></NoteSection>
          <NumberPadSection output={state.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
        </section>
      )}
    </LayoutWrapper>
  )
}

export default Money
