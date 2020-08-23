export type InputType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "." | "清空" | "删除"

export function isInputType(value: string): value is InputType {
  return "0123456789.".split("").concat(["删除", "清空"]).includes(value)
}

export function generateOutput<T extends InputType>(value: T, output: string): string {
  switch (value) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      return output === "0" ? value : output + value
    case ".":
      return output.includes(".") ? output : output + value
    case "清空": //清空功能
      return "0"
    case "删除": //删除功能
      return output === "0" ? "0" : output.slice(0, -1)
    default:
      return "0"
  }
}
