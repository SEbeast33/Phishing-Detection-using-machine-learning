import logo from './logo.svg';
import './App.css'
import { useState } from 'react';
import axios from 'axios'
import {back, closehumberger, history, logo1, searchgif} from './Assets/Assets';
import {thumbdowngif} from './Assets/Assets';
import { motion } from "framer-motion"
import Loader from './Loader';
import { useEffect } from 'react';
import Urlcard from './Urlcard';
import Header from './Header';

function App() {

  const handleButtonClick = () => {
    // Show the loading indicator
    setSearch(true);
    setLoading(true)

    // Simulate an action (e.g., an API request) that takes 5 seconds to complete
    setTimeout(() => {
      // Hide the loading indicator after 5 seconds
      setLoading(false);
    }, 9000);
  };

  const itemVariants={
    open: {
      opacity: [0,0.2,0.5,0.6,1],
      scale:[0.1,1],
     
      
      transition: { type: "spring", stiffness: 260, damping: 24,duration:10,delay:1}
    },
    closed: { sclae:0.1,opacity:0 }
  };
  const [urlGiven,setUrlGiven] = useState('');
  const [result,setResult]=useState('');
 
  const [search,setSearch] = useState(false)
  const [loading,setLoading] = useState(false)
  const [urlData, setUrlData] = useState([]);
  const [ishistoryopen,setIsHistoryopen] = useState(false)
  const [updateHistory,setUpdateHistory] = useState(false)
  console.log(search)
  console.log(urlData)
  
  useEffect(() => {
    if(updateHistory){
    const fetchDataFromBackend = async () => {
      try {
        const response1 = await axios.get('https://safesurf1.onrender.com/sharad/urls')
        const data = await response1.data
        setUrlData(data.url); // Update state with the array of URL data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataFromBackend();

  }
    setUpdateHistory(false) }, [updateHistory]);

  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      
      const response= await axios.post('https://safesurf1.onrender.com/sharad/',{"url":urlGiven}, {headers: {
        'Content-Type': 'application/json',
      }} )
      
      setResult(response.data.result)
      
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickOfHistory = ()=>{
    setIsHistoryopen(!ishistoryopen);
    setUpdateHistory(true);

  }


 console.log(result)
  return (
   <motion.div className="wholecontainer" >
     <div className='headercontainer'>
      <div className="logo1">
      SafeSurf.
      </div>
        <motion.div onClick={handleClickOfHistory  }  className="openhistorycontainer">
          <div className="historyimg">
            <img src={history} alt="" />
          </div>
          <div className="historytxt">
            History
          </div>
        </motion.div>
    </div>
   <div className='bigcontainer'>
   
    <form onSubmit={handleSubmit} className='search' >
      
      <div className="searchcontainer">
      <motion.input type="text" placeholder='Enter URL' className="searchbar" onChange={(e)=>setUrlGiven(e.target.value)} value={urlGiven} whileFocus={{boxShadow:'0px 1px 15px 5px #C272ED'}} animate={{opacity:ishistoryopen?0:1}}  />
      
      
      
      <motion.button type='submit' className='searchbutton' onClick={handleButtonClick }   >
        <img src={searchgif} alt="here is gif" className='searchgif' />
      </motion.button>
      </div>
     
      {loading?(<Loader/>):
       <motion.div  animate={{opacity:ishistoryopen?0:1}} >
      <motion.div className='resultcontainer' variants={itemVariants} initial='closed' animate={search?'open':'closed'}  >
      <div className="thumbdown">
       <motion.img src={thumbdowngif} alt=""  animate={{rotateY:result==='Phishing Website'?[0]:[180],rotate:result==='Phishing Website'?[0]:[180]}} />
      </div>
      <div className="text">
        {result}
      </div>
    </motion.div>
    </motion.div>
      }
      
      
      
    </form>

    <motion.div className="historycontainer" animate={{opacity:ishistoryopen?1:0,zIndex:ishistoryopen?2:0,display:ishistoryopen?"flex":"none"}}>

      <div className='closemenu' onClick={()=>{setIsHistoryopen(false)}}>
        <img src={closehumberger} alt="" className='closehum' />
      </div>
      {
        urlData.map((item)=>(
          <Urlcard key={item.id} url={item.url} />
        ))
       } 
        
    </motion.div>
   </div>
   </motion.div>
  );
}

export default App;
