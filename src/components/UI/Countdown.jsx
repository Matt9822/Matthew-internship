import React, { useState } from 'react'

const Countdown = (elem) => {

  const timeLeft = elem.expiryDate
  const [timer, setTimer] = useState({})


  return (
    <div className="de_countdown">{Countdown()}</div>
  )
}

export default Countdown