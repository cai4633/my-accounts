import React, { useState } from "react"
import styled from "styled-components"
import { Picker, List } from "antd-mobile"
import { theme } from "@/common/ts/variable"
const Wrapper = styled.div`
  text-align: center;
  .am-list-item {
    background-color: ${theme.backgroundColor};
    .am-list-line {
      justify-content: center;
      .am-list-content {
        flex: 0;
        min-width: 2em;
        text-align: center;
      }
      .am-list-extra {
        flex-basis: 10px;
      }
    }
  }
`
const colorStyle = {
  display: "inline-block",
  verticalAlign: "middle",
  width: "16px",
  height: "16px",
  marginRight: "10px",
}

const texts = [
  {
    label: "收入",
    value: "收入",
  },
  {
    label: "支出",
    value: "支出",
  },
]
interface Props {
  onChange?: (date: string) => void
}
const Pick = (props: Props) => {
  const [value, setValue] = useState<string>("支出")
  return (
    <Wrapper className="wrapper">
      <Picker
        cols={1}
        data={texts}
        title="选择图表种类"
        cascade={true}
        extra=" "
        onChange={(date) => {
          if (date && typeof date[0] === "string") {
            setValue(date[0])
            props.onChange!(date[0])
          }
        }}>
        <List.Item align="middle" arrow="down">
          {value}
        </List.Item>
      </Picker>
    </Wrapper>
  )
}

export default Pick
