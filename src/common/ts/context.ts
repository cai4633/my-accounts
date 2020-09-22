import React, { createContext } from "react"

type ContextType = {
  allRecords: myTypes.RecordItem[]
  state: myTypes.Store
  dispatch: React.Dispatch<myTypes.ActionType>
}

export const Context = React.createContext<ContextType>({
  allRecords: [],
  state: { newRecords: [] },
  dispatch: () => {},
})
