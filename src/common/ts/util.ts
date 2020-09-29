const TAGID = "tagid"
let tagid = -1
function createTagId() {
  tagid++
  return tagid
}

// 取随机数
function createRecordId(allRecords?: myTypes.RecordItem[]): number {
  return (Math.random() * 100000000) | 0 //2^31
}

function getComplementarySet<T>(subset: T[], array: T[]): T[] {
  return array.filter((val) => !subset.includes(val))
}

function getIds<T extends { id: number }>(array: T[]): number[] {
  return array.map((val) => val.id)
}
export { createTagId, getComplementarySet, getIds, createRecordId }
