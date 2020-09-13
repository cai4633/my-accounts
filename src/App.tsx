import React from "react"
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Tags from "@/views/tags/Tags"
import Money from "@/views/Money"
import Detail from "@/views/Detail"
import NoMatch from "views/NoMatch"
import EditTag from "views/editTag/EditTag"
import AddTags from "views/addTags/AddTags"
import Statistics from "views/Statistics"
import Home from "views/home/home"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tags/:tagId" component={EditTag} />
        <Route exact path="/addTags" component={AddTags} />
        <Route exact path="/money" component={Money} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/statistics" component={Statistics} />
        <Redirect exact from="/" to="/detail"></Redirect>
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
