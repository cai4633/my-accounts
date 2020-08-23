import React, { useState } from "react"
import styled from "styled-components"

type Prop = { note: string; onchange: (note: string) => void }
const NoteWrapper = styled.section`
  text-align: left;
  background-color: #f5f5f5;
  padding: 1em 10px;
  line-height: 2em;
  input {
    margin-left: 16px;
    color: #333;
  }
`
const NoteSection: React.FC<Prop> = (prop) => {
  const value = prop.note
  const setValue = prop.onchange
  const changeValue = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <NoteWrapper>
      <span>备注</span>
      <input type="text" placeholder="在这里填写备注" defaultValue={value} onBlur={changeValue} />
    </NoteWrapper>
  )
}

export default NoteSection
