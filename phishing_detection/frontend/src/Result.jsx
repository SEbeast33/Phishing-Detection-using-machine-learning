import React from 'react'
import logo from './logo.svg';
import './App.css'
import { useState } from 'react';
import axios from 'axios'
import {searchgif} from './Assets/Assets';
import {thumbdowngif} from './Assets/Assets';
import { motion } from "framer-motion"
import Loader from './Loader';
import { useEffect } from 'react';




const Result = () => {
    const [urlGiven,setUrlGiven] = useState('');
    const [result,setResult]=useState('');
   
    const [search,setSearch] = useState(false)
    const [loading,setLoading] = useState(false)
    console.log(search)

    const itemVariants={
        open: {
          opacity: [0,0.2,0.5,0.6,1],
          scale:[0.1,1],
         
          
          transition: { type: "spring", stiffness: 260, damping: 24,duration:10,delay:1}
        },
        closed: { sclae:0.1,opacity:0 }
      };
  return (
   
    <div>
       <motion.div className='resultcontainer' variants={itemVariants} initial='closed' animate={search?'open':'closed'} >
      <div className="thumbdown">
       <img src={thumbdowngif} alt="" />
      </div>
      <div className="text">
        {result}
      </div>
    </motion.div> 
    </div>
  )
}

export default Result