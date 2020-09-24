import Detail from "@/views/Detail"
import Money from "@/views/Money"
import Tags from "@/views/Tags"
import React, { useMemo, useReducer } from "react"
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import AddTags from "@/views/AddTags"
import EditTag from "@/views/EditTag"
import Home from "@/views/Home"
import NoMatch from "views/NoMatch"
import Statistics from "views/Statistics"
import "./App.less"
import { Context } from "./common/ts/context"
import { reducer } from "reducers/reducer"
import { useRecord } from "./hooks/useRecord"

const store: myTypes.Store = {
  newRecords: [],
}

const App: React.FC = () => {
  const { records } = useRecord()
  const [state, dispatch] = useReducer(reducer, store)
  const value = useMemo(() => {
    return { allRecords: [...records, ...state.newRecords], state, dispatch }
  }, [records, state])

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route exact path="/home" component={Home} />
          <Route exact path="/tags" component={Tags} />
          <Route exact path="/tags/:tagId" component={EditTag} />
          <Route exact path="/addTags" component={AddTags} />
          <Route exact path="/detail" component={Detail}></Route>
          <Route exact path="/money" component={Money} />
          <Route exact path="/statistics" component={Statistics} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </Context.Provider>
  )
}
export default App
