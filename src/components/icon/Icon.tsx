import React from "react"

interface Prop {
  name: string
  fill?: string
}

function Icon(prop: Prop) {
  const { name, fill } = prop
  return (
    <svg className="icon" aria-hidden="true" style={{ fill: fill }}>
      <use xlinkHref={"#icon-" + name}></use>
    </svg>
  )
}

export default Icon
