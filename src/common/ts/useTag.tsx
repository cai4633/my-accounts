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
  console.log(tags)

  const updateTag = (id: number, newTag: string) => {
    const tagsCopy = tags.slice()
    tagsCopy.splice(id, 1, { id, name: newTag })
    setTags(tagsCopy)
  }
  const findTag = (id: number) => {
    return tags.findIndex((item) => item.id === id)
  }
  const deleteTag = (id: number) => {
    const tagsCopy = tags.slice()
    const tagid = findTag(id)
    if (tagid === -1) {
      return
    }
    tagsCopy.splice(tagid, 1)
    setTags(tagsCopy)
  }

  return { tags, setTags, updateTag, findTag, deleteTag }
}
export { useTag }
