import React, { useState } from "react"
import Layout from "components/layout/Layout"
import TagSection from "./edit/tagWrapper/TagSection"
import NoteSection from "./edit/NoteSection"
import CategorySection from "./edit/CategorySection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"
import { Record } from "@/common/ts/cache"
import dayjs from "dayjs"

const Money: React.FC = () => {
  const [state, setState] = useState<MyTypes.MoneyState>({ selected: [], note: "", category: "+", output: "0" })
  const changeFunc = (obj: Partial<MyTypes.MoneyState>) => {
    setState({ ...state, ...obj })
  }
  const submit = () => {
    Record.set([...Record.get(), { ...state, createAt: dayjs().format('YYYY-MM-DD') }])
  }
  return (
    <Layout>
      <TagSection selected={state.selected} onchange={(selected) => changeFunc({ selected })}></TagSection>
      <NoteSection note={state.note} onchange={(note) => changeFunc({ note })}></NoteSection>
      <CategorySection category={state.category} onchange={(category) => changeFunc({ category })}></CategorySection>
      <NumberPadSection output={state.output} onchange={(output) => changeFunc({ output })} onOk={submit}></NumberPadSection>
    </Layout>
  )
}

export default Money
