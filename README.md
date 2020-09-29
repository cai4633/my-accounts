# 天天记账
这是一款主要适配移动端的在线记账 APP。我的灵感来自ISO应用-鲨鱼记账。功能包括记账、标签和账单的增删改查以及年月周账单的部分统计功能。
这款 web app 前端部分采用 react 框架开发。后端数据放在了 leancloud 免费数据库中，可以实现本地和服务器的数据同步。

## 主要功能界面

1. 主页 / 详情页 / 记账页 / 图表页

<img src='https://s1.ax1x.com/2020/09/29/0eQhkt.png' width='250px'> <img src='https://s1.ax1x.com/2020/09/29/0eQ5ff.png' width='250px'>
<br><br>
<img src='https://s1.ax1x.com/2020/09/29/0eQ4tP.png' width='250px'> <img src='https://s1.ax1x.com/2020/09/29/0eQop8.png' width='250px'>

2. 编辑账单页 / 编辑标签页

<img src='https://s1.ax1x.com/2020/09/29/0eQWTI.png' width='250px'> <img src='https://s1.ax1x.com/2020/09/29/0eQR0A.png' width='250px'>


## 主要的技术栈

1. 主要使用 react 全家桶，包括 react-router、 react-hooks等，使用 useReducer 和 useContext 来间接实现 redux 的部分功能
2. 全程使用 typescript 开发，使用类型声明和泛型提高代码可读性和可预测性
2. 动画部分采用 react-transition-group 官方组件来实现
3. 部分组件直接引用 antd-mobile 组件库
4. 图表功能依赖 echarts.js 开发
5. 使用 sh 命令实现一键编译部署

