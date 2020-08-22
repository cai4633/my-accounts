import React, { useState } from "react"
import { NumberPadWrapper } from "./NumberPadWrapper"

const MAX_LENGTH = 14

const NumberPadSection: React.FC = () => {
  const [output, setOutput] = useState("0")
  const clickFunc = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = (e.target as HTMLButtonElement).textContent
    switch (value) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (output.length >= MAX_LENGTH) {
          return
        }
        if (output === "0") {
          setOutput(value)
        } else {
          setOutput(output + value)
        }
        break
      case "0":
        if (output.length >= MAX_LENGTH || output === "0") {
          return
        }
        setOutput(output + value)
        break
      case ".":
        if (output.length >= MAX_LENGTH || output.indexOf(".") >= 0) {
          return
        }
        setOutput(output + value)
        break
      case "清空": //清空功能
        setOutput("0")
        break
      case "删除": //删除功能
        if (output === "0") {
          return
        }
        setOutput(output.slice(0, -1))
        break
      case "OK":
        console.log(value)
        break
      default:
        break
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
