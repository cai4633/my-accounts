import React from "react"
import ReactDOM from "react-dom"
import "common/less/index.less"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { createFromIconfontCN } from "@ant-design/icons"

export const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2004957_uhq290qv94.js",
})


ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
