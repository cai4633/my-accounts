import { getAllTags } from "@/api/tags"
import { useState, useEffect } from "react"
import { getComplementarySet, getIds } from "../common/ts/util"

interface Classify<T = myTypes.TagItem> {
  income: T[]
  outcome: T[]
}

const __TAGS__ = "tags"
const allTags: myTypes.TagItem[] = []
const promise: Promise<myTypes.TagItem[]> = getAllTags().then((tags) => {
  allTags.push(...tags)
  return tags
})

function useTag() {
  const [defaultTags, setDefaultTags] = useState(JSON.parse(localStorage.getItem(__TAGS__) || "[]"))
  const [tags, setTags] = useState<myTypes.TagItem[]>(defaultTags)
  const [restTags, setRestTags] = useState<myTypes.TagItem[]>([])
  const [classify, setClassify] = useState<Classify>({ income: [], outcome: [] })
  const [checktags, setChecktags] = useState<number[]>([])
  useEffect(() => {
    const rest = getComplementarySet<number>(getIds(tags), getIds(allTags))
    setClassify(classifyByCategory(tags))
    localStorage.setItem(__TAGS__, JSON.stringify(tags))
    setRestTags(findTags(rest))
  }, [tags])
  useEffect(() => {
    promise.then(() => {
      if (!defaultTags.length) {
        setDefaultTags(allTags.slice())
      }
    })
  }, [])

  useEffect(() => {
    setTags(defaultTags)
  }, [defaultTags])

  // 根据category将将标签分类
  function classifyByCategory<T extends { category: myTypes.Categories }>(tags: T[]) {
    const income: T[] = []
    const outcome: T[] = []
    tags.forEach((tag) => {
      if (tag.category === "+") {
        income.push(tag)
      } else {
        outcome.push(tag)
      }
    })
    return { income, outcome }
  }

  // 获取标签id
  const findTagId = (id: number) => {
    return tags.findIndex((item) => item.id === id)
  }
  // 根据id 获取标签
  const findTags = (ids: number[]): myTypes.TagItem[] => {
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

  return { tags, setTags, updateTag, findTagId, deleteTag, addTag, allTags, checktags, setChecktags, restTags, classify }
}

export { useTag }
