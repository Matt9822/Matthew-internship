import React, { useEffect } from 'react'
import 'aos/dist/aos.css';
import AOS from 'aos';

const Animate = () => {
  return (
    useEffect(() => {
      AOS.init();
    }, [])
  )
}

export default Animate