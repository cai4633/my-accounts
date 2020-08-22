import React from "react"
import "./App.less"
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom"
import Tag from 'views/Tag'
import Edit from 'views/Edit'
import Statistics from 'views/Statistics'
import NoMatch from 'views/NoMatch'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/tag" component={Tag} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/statistics" component={Statistics} />
        <Redirect exact from="/" to="/Tag"></Redirect>
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App

