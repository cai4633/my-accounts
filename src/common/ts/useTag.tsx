import { useState } from "react"
import { createTagId } from "./util"

export type TagItem = { id: number; name: string }

const defaultTags = [
  { id: createTagId(), name: "衣" },
  { id: createTagId(), name: "食" },
  { id: createTagId(), name: "住" },
  { id: createTagId(), name: "行" },
]

function useTag() {
  const [tags, setTags] = useState<TagItem[]>(defaultTags)
  return { tags, setTags }
}
export { useTag }
