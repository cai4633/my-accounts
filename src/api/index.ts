const AV = require("leancloud-storage")
const { Query, User } = AV
AV.init({
  appId: "Vai02JpY0WFCmxvXsba5plya-9Nh9j0Va",
  appKey: "QT6uaO0otX1bYKrsFgYrphey",
  serverURL: "https://vai02jpy.lc-cn-e1-shared.com",
})

export { AV, Query, User }
