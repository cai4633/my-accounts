import React from "react"
import { TagWrapper } from "./TagWrapper"
import { useTag } from "@/common/ts/useTag"

const TagSection: React.FC<MyTypes.Prop> = (prop) => {
  const { tags, addTag } = useTag()
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
        {tags.map((tag: MyTypes.TagItem) => {
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
      <button onClick={() => {}}>新增标签</button>
    </TagWrapper>
  )
}

export default TagSection
