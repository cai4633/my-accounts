import React from "react"
import { NumberPadWrapper } from "./NumberPadWrapper"
import { generateOutput, isInputType } from "./generateOutput"

type Prop = {
  output: string
  onchange: (output: string) => void
  onOk: () => void
}
const MAX_LENGTH = 14
const NumberPadSection: React.FC<Prop> = (prop) => {
  const output = prop.output
  const _setOutput = prop.onchange
  const setOutput = (value: string) => {
    if (value.length >= MAX_LENGTH) {
      value = value.slice(0, MAX_LENGTH)
    }
    _setOutput(!value.length ? "0" : value)
  }
  const clickFunc = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = (e.target as HTMLButtonElement).textContent
    if (!value) {
      return
    }
    if (value === "OK") {
      //TODO
      prop.onOk()
      return
    }
    if (isInputType(value)) {
      setOutput(generateOutput(value, output))
    }
  }
  return (
    <NumberPadWrapper>
      <div className="output">
        <input
          value={output}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setOutput(e.target.value)
          }}
        />
      </div>
      <div className="pad">
        <div className="button-wrapper" onClick={clickFunc}>
          <button className="white-1">1</button>
          <button className="white-2">2</button>
          <button className="white-3">3</button>
          <button className="white-4">删除</button>
          <button className="white-2">4</button>
          <button className="white-3">5</button>
          <button className="white-4">6</button>
          <button className="white-5">清空</button>
          <button className="white-3">7</button>
          <button className="white-4">8</button>
          <button className="white-5">9</button>
          <button className="white-7">OK</button>
          <button className="white-5">0</button>
          <button className="dot white-6">.</button>
        </div>
      </div>
    </NumberPadWrapper>
  )
}

export default NumberPadSection
