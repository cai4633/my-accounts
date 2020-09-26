import React, { createContext } from "react"

type ContextType = {
  state: myTypes.Store
  dispatch: React.Dispatch<myTypes.ActionType>
}

export const Context = React.createContext<ContextType>({
  state: { newRecords: [], allRecords: [] },
  dispatch: () => {},
})
