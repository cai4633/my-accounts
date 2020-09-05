import React from "react"
import classnames from "classnames"

interface Prop {
  name: string
  fill?: string
  onClick?: () => void
  className?: string
}

function Icon(prop: Prop) {
  const { name, fill, className } = prop
  return (
    <span className={classnames("svg-wrapper", className)} onClick={prop.onClick}>
      <svg className="icon" aria-hidden="true" style={{ fill: fill }}>
        <use xlinkHref={"#icon-" + name}></use>
      </svg>
    </span>
  )
}

export default Icon
