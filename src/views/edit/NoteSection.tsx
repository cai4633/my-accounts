import React from "react"
import styled from "styled-components"

type Prop = { note: string; onchange: (note: string) => void; placeholder?: string; title?: string }
const NoteWrapper = styled.section`
  text-align: left;
  background-color: #f5f5f5;
  padding: 0 10px;
  display: flex;  
  span {
    padding: 1em 0;
  }
  input {
    padding: 1em 0;
    margin-left: 16px;
    color: #333;
    flex: 1;
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
      <span>{prop.title || "备注"}</span>
      <input type="text" placeholder={prop.placeholder || "在这里填写备注"} defaultValue={value} onBlur={changeValue} />
    </NoteWrapper>
  )
}

export default NoteSection
