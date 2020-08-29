import React from "react"
import { TagWrapper } from "./TagWrapper"
import { useTag, TagItem } from "@/common/ts/useTag"
import { createTagId } from "@/common/ts/util"

type Prop = {
  selected: number[]
  onchange: (tags: number[]) => void
}
const TagSection: React.FC<Prop> = (prop) => {
  const { tags, setTags, addTag } = useTag()
  const selectedTags = prop.selected
  const setSelectedTags = prop.onchange

  // 选中取消标签
  const toggleSelected = (tagId: number) => {
    const arr = selectedTags.slice()
    const index = arr.indexOf(tagId)
    if (index >= 0) {
      arr.splice(index, 1)
      setSelectedTags(arr)
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }
  const getClass = (tagId: number) => (selectedTags.includes(tagId) ? "selected" : "")

  return (
    <TagWrapper>
      <div className="tag-wrapper">
        {tags.map((tag: TagItem) => {
          return (
            <span
              key={tag.id}
              onClick={() => {
                toggleSelected(tag.id)
              }}
              className={getClass(tag.id)}>
              {tag.id}
              {tag.name}
            </span>
          )
        })}
      </div>
      <button
        onClick={() => {
          addTag()
        }}>
        新增标签
      </button>
    </TagWrapper>
  )
}

export default TagSection
