import { useState, useEffect } from "react"
import { createTagId, getComplementarySet, getIds } from "./util"

const __TAGS__ = "tags"
const allTags: MyTypes.TagItem[] = [
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
  const [restTags, setRestTags] = useState<MyTypes.TagItem[]>([])
  const [checktags, setChecktags] = useState<number[]>([])
  useEffect(() => {
    const rest = getComplementarySet<number>(getIds(tags), getIds(allTags))
    localStorage.setItem(__TAGS__, JSON.stringify(tags))
    setRestTags(findTags(rest))
  }, [tags])

  // 获取标签id
  const findTagId = (id: number) => {
    return tags.findIndex((item) => item.id === id)
  }
  // 根据id 获取标签
  const findTags = (ids: number[]): MyTypes.TagItem[] => {
    return ids.map((id) => allTags.filter((tag) => tag.id === id)[0])
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
    const tagid = findTagId(id)
    if (tagid === -1) {
      return
    }
    tagsCopy.splice(tagid, 1)
    setTags(tagsCopy)
  }

  // 添加标签
  const addTag = (val: number[]) => {
    setTags([...tags, ...findTags(val)])
  }

  return { tags, setTags, updateTag, findTagId, deleteTag, addTag, allTags, checktags, setChecktags, restTags }
}
export { useTag }
