import React from 'react'
import './App.css'

const Urlcard = ({url}) => {
  return (
    <div className='urlcard'>
      <a href={url}>{url}</a></div>
  )
}

export default Urlcard