import React, { useState } from 'react'
import Team from './Team'
import { Link } from 'react-router-dom'
import Message from './Message'
import Projects from './Projects'
import Offre from './Offre'

function Dashboard() {
  const [comp,setComp]=useState(<Team/>)
  return (
    <div className=''>
      <div className='row'>
        <div className='col-lg-2 col-md-2 col-sm-3  '>
          <div className='list p-2'>
            <button onClick={()=>setComp(<Team/>)}> 
            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/conference-call--v1.png" alt="conference-call--v1"/>
            Our Team</button>
            <button onClick={()=>setComp(<Message/>)}>
            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/star.png" alt="star"/>
               Messasge</button>
            <button onClick={()=>setComp(<Projects/>)}>
            <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/folder-invoices--v1.png" alt="folder-invoices--v1"/>
               Projects</button>
               <button onClick={()=>setComp(<Offre/>)}>
               <img width="50" height="50" src="https://img.icons8.com/3d-fluency/50/company.png" alt="company"/>
               Offres</button>
           <button> <Link className='text' to="/">
           <img width="48" height="48" src="https://img.icons8.com/color/48/door-opened.png" alt="door-opened"/>
            Log Out</Link></button>
          </div>
        </div>
        <div className='col-lg-9 col-md-9 col-sm-9 section'>
          {comp}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
