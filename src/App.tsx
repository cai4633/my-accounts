import Detail from "@/views/Detail"
import Money from "@/views/Money"
import Tags from "@/views/tags/Tags"
import React from "react"
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from "react-router-dom"
import AddTags from "views/addTags/AddTags"
import EditTag from "views/editTag/EditTag"
import Home from "views/home/Home"
import NoMatch from "views/NoMatch"
import Statistics from "views/Statistics"
import "./App.less"
const App: React.FC = (props) => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route exact path="/home" component={Home} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tags/:tagId" component={EditTag} />
        <Route exact path="/addTags" component={AddTags} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/statistics" component={Statistics} />
        <Route exact path="/money" component={Money} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
