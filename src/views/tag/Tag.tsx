import React from "react"
import { useParams } from "react-router-dom"
import { useTag } from "@/common/ts/useTag"
import Tags from "../Tags"

const Tag: React.FC = () => {
  const { tags, setTags } = useTag()
  type Params = { tagId: string }
  const { tagId } = useParams<Params>()
  return <div>{tags[window.parseInt(tagId)].name}</div>
}

export default Tag
