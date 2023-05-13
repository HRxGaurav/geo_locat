import React from 'react'

const Device = () => {

    console.log(navigator.userAgent);
  return (
    <div>Device : {navigator.userAgent}</div>
  )
}

export default Device