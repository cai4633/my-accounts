import React from "react"
import styled from "styled-components"
import { theme } from "common/ts/variable"

const CategoryWrapper = styled.section`
  display: flex;
  background-color: ${theme.backgroundColor};
  font-size: 16px;
  justify-content: center;
  button {
    max-width: 20%;
    line-height: 3em;
    flex: 1;
    position: relative;
    text-align: center;
    margin: 0 10px;
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
const CategorySection: React.FC<Prop> = (prop) => {
  const categorys: KeyType[] = ["-", "+"]
  const index = prop.category
  return (
    <CategoryWrapper>
      {categorys.map((cg) => (
        <button
          key={cg}
          className={index === cg ? "selected" : ""}
          onClick={() => {
            prop.onchange(cg)
          }}>
          {map[cg]}
        </button>
      ))}
    </CategoryWrapper>
  )
}

export default CategorySection
