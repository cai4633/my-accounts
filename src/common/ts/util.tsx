const TAGID = "tagid"
let id = -1
function createTagId() {
  id++
  return id
}

function getComplementarySet<T>(subset: T[], array: T[]): T[] {
  return array.filter((val) => !subset.includes(val))
}

function getIds<T extends { id: number }>(array: T[]): number[] {
  return array.map((val) => val.id)
}
export { createTagId, getComplementarySet, getIds }
