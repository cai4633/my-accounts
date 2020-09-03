import React from "react"
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Tags from '@/views/tags/Tags'
import Money from '@/views/Money'
import Statistics from 'views/Statistics'
import NoMatch from 'views/NoMatch'
import EditTag from 'views/editTag/EditTag'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tags/:tagId" component={EditTag} />
        <Route exact path="/money" component={Money} />
        <Route exact path="/statistics" component={Statistics} />
        <Redirect exact from="/" to="/tags"></Redirect>
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App

