const TAGID = "tagid"
let tagid = -1
function createTagId() {
  tagid++
  return tagid
}

// 如果服务器拉取的记录为空就取随机数，否则length+1
function createRecordId(allRecords?: myTypes.RecordItem[]) {
  if (!allRecords || !allRecords.length) {
    return (Math.random() * 100000000) | 0 //2^31
  }
  return 1000001 + allRecords.length 
}

function getComplementarySet<T>(subset: T[], array: T[]): T[] {
  return array.filter((val) => !subset.includes(val))
}

function getIds<T extends { id: number }>(array: T[]): number[] {
  return array.map((val) => val.id)
}
export { createTagId, getComplementarySet, getIds, createRecordId }
