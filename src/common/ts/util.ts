const TAGID = "tagid"
let tagid = -1
let recordId = -1
function createTagId() {
  tagid++
  return tagid
}

function createRecordId(lastId?: number) {
  if (lastId !== undefined) {
    recordId = lastId
  }
  recordId++
  return 1000 + recordId
}

function getComplementarySet<T>(subset: T[], array: T[]): T[] {
  return array.filter((val) => !subset.includes(val))
}

function getIds<T extends { id: number }>(array: T[]): number[] {
  return array.map((val) => val.id)
}
export { createTagId, getComplementarySet, getIds, createRecordId }
