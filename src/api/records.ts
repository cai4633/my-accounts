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

  AV.Object.saveAll(objs).then(() => {
    console.log("保存成功")
  })
}

// 获取leancloud标签
function getAllRecords(): Promise<myTypes.RecordItem[]> {
  const query = new Query("Records")
  return query.find().then((todo: any) => todo.map((item: { attributes: myTypes.RecordItem }) => item.attributes))
}

export { addRecords, getAllRecords }

export {}

// ================================================================
// [
//   { "selected": [6], "note": "买纸", "category": "-", "output": "2220", "createAt": "2020-09-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "120", "createAt": "2020-09-07" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "60", "createAt": "2020-09-09" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "280", "createAt": "2020-09-11" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-09-10" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-08-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-08-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-08-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-08-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-07-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-07-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-07-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-07-05" },
//   { "selected": [6], "note": "买纸", "category": "-", "output": "220", "createAt": "2020-07-05" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-01" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-30" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-01" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-07-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-07-31" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-06-30" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-06-01" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-08-30" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-09-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-09-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-09-06" },
//   { "selected": [16], "note": "兼职", "category": "+", "output": "2220", "createAt": "2020-09-06" },
//   { "selected": [1], "note": "", "category": "-", "output": "6699", "createAt": "2020-09-01" },
//   { "selected": [10], "note": "", "category": "-", "output": "5999", "createAt": "2020-09-06" },
//   { "selected": [20], "note": "工资", "category": "+", "output": "9900", "createAt": "2020-09-04" },
//   { "selected": [1], "note": "吃饭", "category": "-", "output": "36", "createAt": "2020-09-06" },
//   { "selected": [20], "note": "", "category": "+", "output": "58665", "createAt": "2020-09-03" },
//   { "selected": [20], "note": "", "category": "-", "output": "58665", "createAt": "2020-09-03" },
//   { "selected": [16], "note": "", "category": "+", "output": "3998", "createAt": "2020-09-06" },
//   { "selected": [5], "note": "", "category": "-", "output": "360", "createAt": "2020-09-02" },
//   { "selected": [5], "note": "", "category": "-", "output": "30", "createAt": "2020-09-02" },
//   { "selected": [1], "note": "", "category": "-", "output": "2566", "createAt": "2020-09-06" },
//   { "selected": [6], "note": "", "category": "-", "output": "5666", "createAt": "2020-09-04" },
//   { "selected": [1], "note": "午饭", "category": "-", "output": "65", "createAt": "2020-09-01" },
//   { "selected": [1], "note": "", "category": "-", "output": "65599", "createAt": "2020-09-06" },
//   { "selected": [20], "note": "", "category": "+", "output": "2000", "createAt": "2020-09-11" },
//   { "selected": [1], "note": "", "category": "-", "output": "11", "createAt": "2020-09-12" },
//   { "selected": [1], "note": "", "category": "-", "output": "200", "createAt": "2020-09-13" },
//   { "selected": [20], "note": "", "category": "+", "output": "2000", "createAt": "2020-09-13" },
//   { "selected": [1], "note": "请客户吃饭、", "category": "-", "output": "250", "createAt": "2020-09-14" },
//   { "selected": [2], "note": "房租", "category": "-", "output": "1300", "createAt": "2020-09-14" },
//   { "selected": [5], "note": "云南旅游", "category": "-", "output": "2000", "createAt": "2020-09-16" },
//   { "selected": [11], "note": "", "category": "-", "output": "36", "createAt": "2020-09-16" },
//   { "selected": [18], "note": "电话费", "category": "-", "output": "100", "createAt": "2020-09-16" },
//   { "selected": [1], "note": "", "category": "-", "output": "0", "createAt": "2020-09-16" },
//   { "selected": [7], "note": "零食", "category": "-", "output": "36", "createAt": "2020-09-16" },
//   { "selected": [8], "note": "", "category": "-", "output": "800", "createAt": "2020-09-16" },
//   { "selected": [1], "note": "", "category": "-", "output": "363", "createAt": "2020-09-16" },
//   { "selected": [5], "note": "", "category": "-", "output": "35", "createAt": "2020-09-16" },
//   { "selected": [1], "note": "", "category": "-", "output": "598", "createAt": "2020-09-16" },
//   { "selected": [6], "note": "", "category": "-", "output": "38", "createAt": "2020-09-16" }
// ]
