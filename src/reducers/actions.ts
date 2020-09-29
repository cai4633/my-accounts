import { updateRecords, deleteRecord } from "@/common/ts/records"

export const actions = {
  addNew: (state: myTypes.Store, action: myTypes.ActionType): myTypes.Store => {
    const { newRecords, allRecords } = state
    if (!Array.isArray(action.data)) {
      return {
        newRecords: [...newRecords, action.data],
        allRecords: [...allRecords, action.data],
      }
    }
    return state
  },

  updateAll: (state: myTypes.Store, action: myTypes.ActionType): myTypes.Store => {
    const { newRecords, allRecords } = state
    if (!Array.isArray(action.data)) {
      return {
        newRecords,
        allRecords: updateRecords(action.data, allRecords),
      }
    }
    return state
  },

  addAll: (state: myTypes.Store, action: myTypes.ActionType): myTypes.Store => {
    const { newRecords, allRecords } = state
    const { data } = action
    return Array.isArray(data)
      ? {
          newRecords: [...newRecords],
          allRecords: [...data],
        }
      : state
  },

  deleteOne: (state: myTypes.Store, action: myTypes.ActionType): myTypes.Store => {
    const { newRecords, allRecords } = state
    const { data } = action
    return !Array.isArray(data)
      ? {
          newRecords: [...newRecords],
          allRecords: deleteRecord(data, allRecords),
        }
      : state
  },
}
