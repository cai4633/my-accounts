import React, { useState } from "react"
import Layout from "components/layout/Layout"
import styled from "styled-components"

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
const NoteSection: React.FC = () => {
  const [value, setValue] = useState("")
  console.log(value)
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
