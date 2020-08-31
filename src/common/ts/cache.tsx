const TAGS = "__tags__"
const RECORDS = "__records__"

class Storage {
  get(key: string, value: any = undefined) {
    const local = localStorage.getItem(key)
    return local ? JSON.parse(local) : value
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}

const storage = new Storage()

class Record {
  public static get(): MyTypes.RecordItem[]{
    return storage.get(RECORDS, [])
  }
  public static set(records: MyTypes.RecordItem[]) {
    storage.set(RECORDS, JSON.stringify(records))
  }
}

export { Record }
