import React from "react"

interface Prop {
  name: string
  fill?: string
  onClick?: () => void
}

function Icon(prop: Prop) {
  const { name, fill } = prop
  return (
    <svg className="icon" aria-hidden="true" style={{ fill: fill }} onClick={prop.onClick}>
      <use xlinkHref={"#icon-" + name}></use>
    </svg>
  )
}

export default Icon
