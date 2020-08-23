import React from "react"
import styled from "styled-components"

const CategoryWrapper = styled.section`
  display: flex;
  background-color: #c4c4c4;
  font-size: 16px;
  button {
    min-width: 0;
    line-height: 3em;
    flex: 1;
    position: relative;
    text-align: center;
    &.selected::after {
      content: "";
      display: block;
      position: absolute;
      background-color: #000;
      width: 100%;
      height: 3px;
      left: 0;
      bottom: 0px;
    }
  }
`

const map = { "+": "收入", "-": "支出" }
type KeyType = keyof typeof map
type Prop = { category: KeyType; onchange: (category: KeyType) => void }
const NoteSection: React.FC<Prop> = (prop) => {
  const categorys: KeyType[] = ["+", "-"]
  const index = prop.category
  const setIndex = prop.onchange
  const clickFn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    let val = (e.target as HTMLElement).id as KeyType
    setIndex(val)
  }

  return (
    <CategoryWrapper onClick={clickFn}>
      {categorys.map((cg) => {
        return (
          <button key={cg} className={index === cg ? "selected" : ""} id={cg}>
            {map[cg]}
          </button>
        )
      })}
    </CategoryWrapper>
  )
}

export default NoteSection
