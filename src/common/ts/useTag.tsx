import { useState, useEffect } from "react"
import { createTagId } from "./util"

export type TagItem = { id: number; name: string }
const TAGS = "tags"

function useTag() {
  const defaultTags = JSON.parse(
    localStorage.getItem(TAGS) || JSON.stringify([
        { id: createTagId(), name: "衣" },
        { id: createTagId(), name: "食" },
        { id: createTagId(), name: "住" },
        { id: createTagId(), name: "行" },
      ])
  )
  const [tags, setTags] = useState<TagItem[]>(defaultTags)
  useEffect(() => {
    localStorage.setItem(TAGS, JSON.stringify(tags))
  }, [tags])

  const findTag = (id: number) => {
    return tags.findIndex((item) => item.id === id)
  }

  // 更新标签
  const updateTag = (id: number, newTag: string) => {
    const tagsCopy = tags.slice()
    tagsCopy.splice(id, 1, { id, name: newTag })
    setTags(tagsCopy)
  }

  // 删除标签
  const deleteTag = (id: number) => {
    const tagsCopy = tags.slice()
    const tagid = findTag(id)
    if (tagid === -1) {
      return
    }
    tagsCopy.splice(tagid, 1)
    setTags(tagsCopy)
  }

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

  return { tags, setTags, updateTag, findTag, deleteTag, addTag }
}
export { useTag }
