import { getAllRecords } from "@/api/records"
import { useEffect, useState } from "react"

function useRecord() {
  const [records, setRecords] = useState<myTypes.RecordItem[]>([])
  useEffect(() => {
    getAllRecords().then((records) => {
      setRecords(records)
    })
  }, [])

  return { records }
}

export { useRecord }
