const findRecord = (id: number, records: myTypes.RecordItem[]): myTypes.RecordItem => {
  return records.filter((item) => item.id === id)[0]
}
const updateRecord = <T extends myTypes.RecordItem>(record: T, records: T[]): T[] => {
  return records.map((item) => (item.id === record.id ? record : item))
}

export { findRecord, updateRecord }
