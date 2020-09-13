import React from "react"
import styled from "styled-components"
import { theme } from "common/ts/variable"
import { useHistory } from "react-router-dom"

const CategoryWrapper = styled.section`
  display: flex;
  color: ${theme.color};
  background-color: ${theme.backgroundColor};
  font-size: 16px;
  justify-content: center;
  align-items: center;
  button {
    color: ${theme.color};
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
      background-color: ${theme.color};
      width: 100%;
      height: 4px;
      left: 0;
      bottom: 0px;
    }
  }
  .cancel {
    position: absolute;
    right: 20px;
    font-size: 12px;
  }
`

const map = { "+": "收入", "-": "支出" }
type KeyType = keyof typeof map
type Prop = { category: KeyType; onchange: (category: KeyType) => void }
const CategorySection: React.FC<Prop> = (prop) => {
  const categorys: KeyType[] = ["-", "+"]
  const index = prop.category
  const history = useHistory()
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
      <span
        className="cancel extend-click"
        onClick={() => {
          history.push("/")
        }}>
        取消
      </span>
    </CategoryWrapper>
  )
}

export default CategorySection
