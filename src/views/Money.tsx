import { Record } from "@/common/ts/cache"
import TagsContainer from "@/components/tagsContainer/TagsContainer"
import { useTag } from "@/hooks/useTag"
import CategorySection from "components/categorySection/CategorySection"
import dayjs from "dayjs"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import NoteSection from "./edit/NoteSection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface MapType {
  [key: string]: "income" | "outcome"
}

const LayoutWrapper = styled.div`
  background-color: #e5e5e5;
  /* position: relative; */
  height: 100vh;
  overflow: auto;
  .slide-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
  .slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 800ms;
  }
  .slide-exit {
    opacity: 1;
  }
  .slide-exit-active {
    opacity: 0;
    transition: opacity 800ms;
  }
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
  const initialState: myTypes.MoneyState = { selected: [], note: "", category: "-", output: "0" }
  const [state, setState] = useState<myTypes.MoneyState>(initialState)
  const [inProp, setInProp] = useState(false)
  const [showPad, setShowPad] = useState(false)
  const categoryWrapper = useRef<HTMLDivElement>(null)
  const tagsWrapper = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const changeFunc = (obj: Partial<myTypes.MoneyState>) => {
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

  useEffect(() => {
    // setInProp(true)
  }, [])
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
      <CSSTransition appear in classNames="fade" timeout={300} >
        <main>
          <div className="category-wrapper" ref={categoryWrapper}>
            <CategorySection category={state.category} onchange={(category) => changeFunc({ category })}></CategorySection>
          </div>
          <div className="tags-wrapper" ref={tagsWrapper}>
            <TagsContainer tags={classify[map[state.category]]} parent="money" togglePad={selectTag} selected={state.selected}></TagsContainer>
          </div>
        </main>
      </CSSTransition>

      {showPad && (
        <section className="bottom" ref={bottom} id="111">
          <NoteSection note={state.note} onchange={(note) => changeFunc({ note })}></NoteSection>
          <NumberPadSection output={state.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
        </section>
      )}
    </LayoutWrapper>
  )
}

export default Money
