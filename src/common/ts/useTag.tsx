import { useState } from "react"

function useTag() {
  const [tags, setTags] = useState<string[]>(["衣", "食", "住", "行"])
  return { tags, setTags }
}
export { useTag }
