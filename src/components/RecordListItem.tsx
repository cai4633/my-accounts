import { useTag } from "@/hooks/useTag"
import React from "react"
import Icon from "./icon/Icon"

interface Props {
  id: number
}

const RecordListItem = (props: Props) => {
  const { findTags } = useTag()
  const { id } = props
  return (
    <span className="tag">
      <Icon name={findTags([id])[0]?.icon}></Icon>
      <span className="text">{findTags([id])[0]?.name}</span>
    </span>
  )
}

export default RecordListItem
