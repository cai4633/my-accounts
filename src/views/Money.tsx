import React, { useState, useEffect } from "react"
import Layout from "components/layout/Layout"
import TagSection from "./edit/tagWrapper/TagSection"
import NoteSection from "./edit/NoteSection"
import CategorySection from "components/categorySection/CategorySection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { Record } from "@/common/ts/cache"
import dayjs from "dayjs"
import { useTag } from "@/common/ts/useTag"
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
      height: 40px;
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
  const changeFunc = (obj: Partial<MyTypes.MoneyState>) => {
    setState({ ...state, ...obj })
  }
  const submit = () => {
    Record.set([...Record.get(), { ...state, createAt: dayjs().format("YYYY-MM-DD") }])
    setState(Object.assign({}, initialState))   //reset
  }

  const map: MapType = { "+": "income", "-": "outcome" }
  const { tags, addTag, classify } = useTag()
  const selectTag = (selected: number[]) => {
    changeFunc({ selected })
  }
  // 当selected 改变时, showpad跟着改变
  useEffect(() => {
    setShowPad(!!state.selected.length)
  }, [state.selected])

  return (
    <LayoutWrapper>
      <main>
        <div className="category-wrapper">
          <CategorySection category={state.category} onchange={(category) => changeFunc({ category })}></CategorySection>
        </div>
        <div className="tags-wrapper">
          <TagsContainer tags={classify[map[state.category]]} parent="money" togglePad={selectTag} selected={state.selected}></TagsContainer>
        </div>
      </main>
      {showPad && (
        <section className="bottom">
          <NoteSection note={state.note} onchange={(note) => changeFunc({ note })}></NoteSection>
          <NumberPadSection output={state.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
        </section>
      )}
    </LayoutWrapper>
  )
}

export default Money
