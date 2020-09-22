import { AV, Query } from "./index"

// 向leancloud 添加标签
function addTags(data: myTypes.TagItem[]) {
  const Tags = AV.Object.extend("tags") //获取tags 类
  const objs = data.map((item) => {
    const tags = new Tags()
    const keys = Object.keys(item) as (keyof typeof item)[]
    keys.map((key) => {
      tags.set(key, item[key]) //添加tags
    })
    return tags
  })

  AV.Object.saveAll(objs).then(() => {
    console.log("保存成功")
  })
}

// 获取leancloud标签
function getAllTags(): Promise<myTypes.TagItem[]> {
  const query = new Query("tags")
  return query.find().then((todo: any) => todo.map((item: { attributes: myTypes.TagItem }) => item.attributes))
}

export { addTags, getAllTags }

// =================================================================================================================
// [
//   { id: createTagId(), name: "服饰", category: "-", icon: "clothes" },
//   { id: createTagId(), name: "餐饮", category: "-", icon: "food" },
//   { id: createTagId(), name: "住房", category: "-", icon: "house" },
//   { id: createTagId(), name: "交通", category: "-", icon: "traffic" },
//   { id: createTagId(), name: "购物", category: "-", icon: "shopping" },
//   { id: createTagId(), name: "旅游", category: "-", icon: "trip" },
//   { id: createTagId(), name: "日用品", category: "-", icon: "commodity" },
//   { id: createTagId(), name: "零食", category: "-", icon: "snack" },
//   { id: createTagId(), name: "运动", category: "-", icon: "sport" },
//   { id: createTagId(), name: "长辈", category: "-", icon: "parents" },
//   { id: createTagId(), name: "孩子", category: "-", icon: "children" },
//   { id: createTagId(), name: "社交", category: "-", icon: "communication" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "数码", category: "-", icon: "digital" },
//   { id: createTagId(), name: "通讯", category: "-", icon: "message" },
//   { id: createTagId(), name: "烟酒", category: "-", icon: "wine" },
//   { id: createTagId(), name: "工资", category: "+", icon: "salary" },
//   { id: createTagId(), name: "兼职", category: "+", icon: "ptjob" },
//   { id: createTagId(), name: "理财", category: "+", icon: "financing" },
//   { id: createTagId(), name: "礼金", category: "+", icon: "gift" },
//   { id: createTagId(), name: "其它", category: "-", icon: "other" },
//   { id: createTagId(), name: "其它", category: "+", icon: "other" },
// ]
