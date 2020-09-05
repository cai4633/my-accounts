import { useState, useEffect } from "react"
import { createTagId } from "./util"

const __TAGS__ = "tags"
const allTags = [
  { id: createTagId(), name: "服饰", category: "-", icon: "clothes" },
  { id: createTagId(), name: "餐饮", category: "-", icon: "food" },
  { id: createTagId(), name: "住房", category: "-", icon: "house" },
  { id: createTagId(), name: "交通", category: "-", icon: "traffic" },
  { id: createTagId(), name: "购物", category: "-", icon: "shopping" },
  { id: createTagId(), name: "旅游", category: "-", icon: "trip" },
  { id: createTagId(), name: "日用品", category: "-", icon: "commodity" },
  { id: createTagId(), name: "零食", category: "-", icon: "snack" },
  { id: createTagId(), name: "运动", category: "-", icon: "sport" },
  { id: createTagId(), name: "长辈", category: "-", icon: "parents" },
  { id: createTagId(), name: "孩子", category: "-", icon: "children" },
  { id: createTagId(), name: "社交", category: "-", icon: "communication" },
  { id: createTagId(), name: "数码", category: "-", icon: "digital" },
  { id: createTagId(), name: "通讯", category: "-", icon: "message" },
  { id: createTagId(), name: "烟酒", category: "-", icon: "wine" },
]
function useTag() {
  const defaultTags = JSON.parse(localStorage.getItem(__TAGS__) || JSON.stringify(allTags.slice(0, 6)))
  const [tags, setTags] = useState<MyTypes.TagItem[]>(defaultTags)
  useEffect(() => {
    localStorage.setItem(__TAGS__, JSON.stringify(tags))
  }, [tags])

  const findTag = (id: number) => {
    return tags.findIndex((item) => item.id === id)
  }

  // 更新标签
  const updateTag = (id: number, newTag: string) => {
    const copy = tags.slice()
    const ret = copy.map((tag) => {
      return tag.id === id ? { ...tag, name: newTag } : tag
    })
    setTags(ret)
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
      setTags([...tags, { id: createTagId(), name, category: "+", icon: "" }])
    }
  }

  return { tags, setTags, updateTag, findTag, deleteTag, addTag, allTags }
}
export { useTag }
