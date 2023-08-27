import React, { useEffect, useState } from 'react'
import {lock} from "./assests"
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'


function Contact() {
  const [email,setemail]=useState('');
    const [name,setName]=useState('');
    const [price,setprice]=useState(null);
    const [addresse,setadd]=useState('');
    const [city,setcity]=useState('');
    const [offre,setoffre]=useState('');

    const config=(e)=>{
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(addresse.length<3 || name.length<3 || price===null||  price<0 || city.length===0 
        || offre.length<5 || email.length<0 || ! (email.match(validRegex)) ){
        Swal.fire({
          icon: 'error',
          title: 'Wrong',
          text: 'check Inputs!',
          footer: '<small>Inputs empty or enter something wrong</small>'
        })
      }
    else{
      addoffre(e)
    }
    }

  const addoffre=(e)=>{
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send It!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5000/offre/add",{
        "companyname":name,
        "email":email,
        "price":price,
        "addresse":addresse,
        "city":city,
        "offre":offre
        }).
        then((res)=>{
    console.log(res.data);
    Swal.fire({
        title: 'perfect',
        text: "thank you for JOB!",
        icon: 'success',
        
      }) })
      .catch((error)=>{console.log(error)})
      }
    })
    ;

  document.getElementById('form').reset(); 
}
  return (
    <div>
      <div className='container contact p-5' id='contact'>
        <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <h1>Get In Touch</h1>
                <form className="row g-3" id='form'>
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Company Name</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)}  id="inputEmail4" />
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Email</label>
    <input type="Email" className="form-control" onChange={(e)=>setemail(e.target.value)}  id="inputPassword4" />
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" onChange={(e)=>setadd(e.target.value)}  id="inputAddress" placeholder="1234 Main St" />
  </div>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" onChange={(e)=>setcity(e.target.value)}  id="inputCity" />
  </div>
  
  <div className="col-md-4">
    <label htmlFor="inputZip" className="form-label">Price</label>
    <input type="number" className="form-control"  onChange={(e)=>setprice(e.target.value)} id="inputZip" />
  </div>
  <div className="col-12">
  <label htmlFor="inputZip" className="form-label">Your Offre</label>
  <textarea class="form-control" aria-label="With textarea" onChange={(e)=>setoffre(e.target.value)} ></textarea>
  </div>
  <div className="col-12 text-center">
    <button onClick={config} className="bt">Send</button>
  </div>
  </form>
            </div>
            <img src='https://raw.githubusercontent.com/judygab/web-dev-projects/6bf5a12767154a7383288450bb441d04f7c0dce9/personal-portfolio/src/assets/img/contact-img.svg'className='img-fluid col-lg-6 col-md-6 col-sm-12 mt-3 '></img>
        </div>
      </div>
    </div>
  )
}

export default Contact
