const TAGID = "tagid"
let id = window.parseInt(localStorage.getItem(TAGID) || "-1")
function createTagId() {
  id++
  localStorage.setItem(TAGID, `${id}`)
  return id
}
export { createTagId }
