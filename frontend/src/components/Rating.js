import React, { useEffect, useState } from 'react'
import {lock} from "./assests"
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import{love} from './assests'
function Rating({messages}) {
  const [message,setmessage]=useState('');
    const [name,setName]=useState('');
    const [rating,setrating]=useState(null);

  const addmessage=(e)=>{
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#716add',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send It!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5000/message/add",{
        "name":name,
        "message":message,
        "rating":rating,
        }).
        then((res)=>{
    console.log(res.data);
    Swal.fire({
        title: 'perfect',
        text: "thank you for Giving Us You Point View!",
        icon: 'success',
        
      }) })
      .catch((error)=>{console.log(error)})
      }
    })
    ;

  document.getElementById('form').reset(); 
}
const config=(e)=>{
  if(message.length<3 || name.length<3 || rating===null|| (rating>5 || rating<0)){
    Swal.fire({
      icon: 'error',
      title: 'Wrong',
      text: 'check Inputs!',
      footer: '<small>Inputs empty or enter something wrong</small>'
    })
  }
else{
  addmessage(e)
}
}
  return (
    <div className='container rating' id='rating'>
     <div className='row'>
     <div className='col-sm-12 col-md-6 col-lg-6 text-center'>
     <h1 className='text-center text-light text pt-5'>Your Opinion <span>Matter</span></h1>
     <img src={love} className='img-fluid img col-12'></img>
     </div>
     <div className='col-lg-6 col-md-6 col-sm-12'>
     <h1 className='text-center text-light text pt-5'>Share <span>With Us</span></h1>
 <form id='form'>
 <div>
  <div className="mb-3 col-lg-11 col-sm-12">
    <label htmlFor="exampleFormControlInput1" className="form-label">Name:</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
  </div>
  <div className="mb-3 col-lg-11 col-sm-12">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Message</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e)=>setmessage(e.target.value)} rows={3} defaultValue={""} />
  </div>
  <div className="mb-3 col-lg-6 col-sm-12">
    <label htmlFor="exampleFormControlInput1" className="form-label">Rating:</label>
    <input type="Number" className="form-control " onChange={(e)=>setrating(e.target.value)}  id="exampleFormControlInput1" placeholder="between 1 and 5" />
  </div>
  <div className="col-12 text-center">
    <button onClick={config} className="bt">Send</button>
  </div>
</div>

 </form>

     </div>
     </div>
     
      <div className='row-12'>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <div className="card mb-3" style={{maxWidth: 540}}>
              <div className="row g-0">
                <div className="col-md-4 .img">
                  <img width="188" height="188"  className="img-fluid rounded-start" src="https://img.icons8.com/3d-fluency/188/user-female--v4.png" alt="user-female--v4"/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Ben Amor</h5>
                    <p className="card-text">I saw ALL Your Works guys that was amazing ,Keep going and i'm loking forward to future projects</p>
                    <p className="card-text"><small className="text-body-secondary">Rating : 4.5 / 5</small></p>
                  </div>
                </div>
              </div>
            </div>
    </div>
    {
            messages && messages.map((item,index)=>(
              <div className="carousel-item" key={index}>
            <div className="card mb-3" style={{maxWidth: 540}}>
              <div className="row g-0">
                <div className="col-md-4">
                <img width="188" height="188" className='img-fluid rounded-start' src="https://img.icons8.com/3d-fluency/188/user-male--v3.png" alt="user-male--v3"/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.message}</p>
                    <p className="card-text"><small className="text-body-secondary">Rating : {item.rating} / 5</small></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
            ))
          }
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>
 
    </div>

   
  )
}

export default Rating
