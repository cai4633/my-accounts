import React from "react"
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Tags from '@/views/Tags'
import Edit from 'views/Edit'
import Statistics from 'views/Statistics'
import NoMatch from 'views/NoMatch'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/statistics" component={Statistics} />
        <Redirect exact from="/" to="/tags"></Redirect>
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App

