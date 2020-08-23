import React, { useState } from "react"
import Layout from "components/layout/Layout"
import TagSection from "./edit/tagWrapper/TagSection"
import NoteSection from "./edit/NoteSection"
import CategorySection from "./edit/CategorySection"
import NumberPadSection from "./edit/numberPadSection/NumberPadSection"

type Categories = "+" | "-"
type StateType = { tags: string[]; note: string; category: Categories; output: string }

const Edit: React.FC = () => {
  const [state, setState] = useState<StateType>({ tags: ["衣", "食", "住", "行"], note: "", category: "+", output: "0" })
  return (
    <Layout>
      <TagSection
        tags={state.tags}
        onchange={(tags: string[]) => {
          setState({ ...state, tags })
        }}></TagSection>
      <NoteSection
        note={state.note}
        onchange={(note: string) => {
          setState({ ...state, note })
        }}></NoteSection>
      <CategorySection
        category={state.category}
        onchange={(category: "+" | "-") => {
          setState({ ...state, category })
        }}></CategorySection>
      <NumberPadSection
        output={state.output}
        onchange={(output: string) => {
          setState({ ...state, output })
        }}></NumberPadSection>
    </Layout>
  )
}

export default Edit
