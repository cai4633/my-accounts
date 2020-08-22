import React from "react"
import Layout from "components/layout/Layout"
import styled from "styled-components"
import TagSection from "./edit/TagSection"
import NoteSection from "./edit/NoteSection"
import CategorySection from "./edit/CategorySection"
import NumberPadSection from "./edit/NumberPadSection"

const Edit: React.FC = () => {
  return (
    <Layout>
      <TagSection></TagSection>
      <NoteSection></NoteSection>
      <CategorySection></CategorySection>
      <NumberPadSection></NumberPadSection>
    </Layout>
  )
}

export default Edit
