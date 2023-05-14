import React from 'react'

export default function Duration({d}) {
  return (
    <>{d === "1"? "one Month" : d === "12" ? "year": d + " Months"}</>
  )
}
