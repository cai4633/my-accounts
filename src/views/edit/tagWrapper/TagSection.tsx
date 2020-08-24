import React from "react"
import { TagWrapper } from "./TagWrapper"
import { useTag } from "@/common/ts/useTag"

type Prop = {
  selected: string[]
  onchange: (tags: string[]) => void
}
const TagSection: React.FC<Prop> = (prop) => {
  const { tags, setTags } = useTag()
  const selectedTags = prop.selected
  const setSelectedTags = prop.onchange

  // 添加标签
  const addTag = () => {
    const name = window.prompt("请输入你要添加的标签名")
    if (!name) {
      window.alert("你没有输入有效的标签名！")
      return
    } else if (tags.includes(name)) {
      window.alert("标签名已经存在！")
      return
    } else {
      setTags([...tags, name])
    }
  }
  // 选中取消标签
  const toggleSelected = (tag: string) => {
    const arr = selectedTags.slice()
    const index = arr.indexOf(tag)
    if (index >= 0) {
      arr.splice(index, 1)
      setSelectedTags(arr)
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }
  const getClass = (tag: string) => (selectedTags.includes(tag) ? "selected" : "")

  return (
    <TagWrapper>
      <div className="tag-wrapper">
        {tags.map((tag: string) => {
          return (
            <span
              key={tag}
              onClick={() => {
                toggleSelected(tag)
              }}
              className={getClass(tag)}>
              {tag}
            </span>
          )
        })}
      </div>
      <button onClick={addTag}>新增标签</button>
    </TagWrapper>
  )
}

export default TagSection
