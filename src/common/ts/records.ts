const findRecord = (id: number, records: myTypes.RecordItem[]): myTypes.RecordItem => {
  return records.filter((item) => item.id === id)[0]
}

export { findRecord }
