export const actions = {
  add: (state: myTypes.Store, action: { data: myTypes.RecordItem }): myTypes.Store => {
    return {
      newRecords: [...state.newRecords, action.data],
    }
  },
}
