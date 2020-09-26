import { actions } from "./actions"

const reducer = (state: myTypes.Store, action: myTypes.ActionType) => {
  const fn = actions[action.type]
  if (!fn) {
    return { ...state }
  }
  return fn(state, action)
}

export { reducer }
