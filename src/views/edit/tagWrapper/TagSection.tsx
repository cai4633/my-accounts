import React from "react"
import { TagWrapper } from "./TagWrapper"
import { useTag, TagItem } from "@/common/ts/useTag"
import { createTagId } from "@/common/ts/util"

type Prop = {
  selected: number[]
  onchange: (tags: number[]) => void
}
const TagSection: React.FC<Prop> = (prop) => {
  const { tags, setTags } = useTag()
  const selectedTags = prop.selected
  const setSelectedTags = prop.onchange

  // 添加标签
  const addTag = () => {
    const tagNames = tags.map((tag) => tag.name)
    const name = window.prompt("请输入你要添加的标签名")
    if (!name) {
      window.alert("你没有输入有效的标签名！")
      return
    } else if (tagNames.includes(name)) {
      window.alert("标签名已经存在！")
      return
    } else {
      setTags([...tags, { id: createTagId(), name }])
    }
  }
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
      <button onClick={addTag}>新增标签</button>
    </TagWrapper>
  )
}

export default TagSection
