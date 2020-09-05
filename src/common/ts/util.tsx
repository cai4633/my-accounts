const TAGID = "tagid"
let id = -1
function createTagId() {
  id++
  return id
}
export { createTagId }
