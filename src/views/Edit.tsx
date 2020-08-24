import React, { useState } from "react"
import Layout from "components/layout/Layout"
import TagSection from "./edit/tagWrapper/TagSection"
import NoteSection from "./edit/NoteSection"
import CategorySection from "./edit/CategorySection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"

type Categories = "+" | "-"
type StateType = { selected: number[]; note: string; category: Categories; output: string }

const Edit: React.FC = () => {
  const [state, setState] = useState<StateType>({ selected: [], note: "", category: "+", output: "0" })
  const changeFunc = (obj: Partial<StateType>) => {
    setState({ ...state, ...obj })
  }
  return (
    <Layout>
      <TagSection selected={state.selected} onchange={(selected) => changeFunc({ selected })}></TagSection>
      <NoteSection note={state.note} onchange={(note) => changeFunc({ note })}></NoteSection>
      <CategorySection category={state.category} onchange={(category) => changeFunc({ category })}></CategorySection>
      <NumberPadSection output={state.output} onchange={(output) => changeFunc({ output })}></NumberPadSection>
    </Layout>
  )
}

export default Edit
