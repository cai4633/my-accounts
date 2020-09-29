import { updateRecord, deleteOne } from "api/records"

const findRecord = (id: number, records: myTypes.RecordItem[]): myTypes.RecordItem => {
  return records.filter((item) => item.id === id)[0]
}
const updateRecords = <T extends myTypes.RecordItem>(record: T, records: T[]): T[] => {
  updateRecord(record)
  return records.map((item) => (item.id === record.id ? record : item))
}

const deleteRecord = <T extends myTypes.RecordItem>(record: T, records: T[]): T[] => {
  deleteOne(record)
  return records.filter((item) => item.id !== record.id)
}
export { findRecord, updateRecords, deleteRecord }
