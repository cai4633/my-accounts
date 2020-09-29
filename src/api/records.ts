import { AV, Query } from "./index"

// 向leancloud 添加记录
function addRecords(data: myTypes.RecordItem[]) {
  const Tags = AV.Object.extend("Records") //获取tags 类
  const objs = data.map((item) => {
    const records = new Tags()
    const keys = Object.keys(item) as (keyof typeof item)[]
    keys.map((key) => {
      records.set(key, item[key]) //添加tags
    })
    return records
  })

  AV.Object.saveAll(objs)
}
function updateRecord(data: myTypes.RecordItem): void {
  const array = ["output", "note"] as const
  const query = new Query("Records")
  query.equalTo("id", data.id)
  query.first().then((record: any) => {
    array.forEach((item) => record.set(item, data[item]))
    record.save()
  })
}

function deleteOne(data: myTypes.RecordItem) {
  const query = new Query("Records")
  query.equalTo("id", data.id)
  query.first().then((record: any) => {
    record.destroy()
  })
}

// 获取leancloud标签
function getAllRecords(): Promise<myTypes.RecordItem[]> {
  const query = new Query("Records")
  return query.find().then((todo: any) => todo.map((item: { attributes: myTypes.RecordItem }) => item.attributes))
}

export { addRecords, getAllRecords, updateRecord, deleteOne }
