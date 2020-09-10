import React from "react"
import styled from "styled-components"
import { Tabs, Badge, SegmentedControl, WingBlank } from "antd-mobile"
import { theme } from "common/ts/variable"
const Wrapper = styled.div`
  padding: 10px;
`
interface Props {
  onChange: (e: any) => void
  index: number
}

const Tab = (props: Props) => {
  return (
    <Wrapper>
      <WingBlank size="lg" className="sc-example">
        <SegmentedControl
          values={["周", "月", "年"]}
          onChange={props.onChange}
          tintColor="#333"
          style={{ backgroundColor: theme.backgroundColor }}
          selectedIndex={props.index}
        />
      </WingBlank>
    </Wrapper>
  )
}

export default Tab
