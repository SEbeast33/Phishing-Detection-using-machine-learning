import React from 'react'
import { loading } from './Assets/Assets'
import './loader.css'

const Loader = () => {
  return (
<div className="loader">
  <div className="logo">
    <img src={loading} alt="here is laoder" />
    </div>
    <div className="checkingtext">
      Checking....
    </div>
</div>
  )
}

export default Loader