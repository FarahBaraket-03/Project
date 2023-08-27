import React, { useEffect, useState } from 'react'
import {lock,deny,no,noo,welcome} from "./assests"
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard';
import axios from "axios";
import Swal from 'sweetalert2'

function Login() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const config=(email,pwd,e)=>{
    e.preventDefault()
    if(email.length===0 || pwd.length===0){
      Swal.fire(
        'Wrong',
        'empty inputs',
        'error'
      )
    }
    else{
      getUser(email,pwd,e)
    }
  }
  const[place,setplace]=useState(false)
  const getUser=(email,pwd,e)=>{
    e.preventDefault()
    axios.get(`http://localhost:5000/user/${email}/${pwd}`).
      then((res)=>{
        console.log(res.data)
        if(res.data==="Can't Enter"){
          Swal.fire({
            title: res.data,
            text: "You Are Not from our Team",
            imageUrl: deny,
            imageWidth: 350,
            imageHeight: 400,
            imageAlt: 'Custom image',
          })
        }
        else{
          if(res.data==="Your Password Is Wrong"){
            Swal.fire({
              title: res.data,
              text: "Correct Your Password , Then Try Again",
              imageUrl: noo,
              imageWidth: 350,
              imageHeight: 350,
              imageAlt: 'Custom image',
            })
          }
          else{
            Swal.fire({
              title: "welcome ",
              text: "Have A Good Day",
              imageUrl: welcome,
              imageWidth: 350,
              imageHeight: 350,
              imageAlt: 'Custom image',
            })
            setplace(true)
          }
        }

      })
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
    <div>
     
      { place ? <Dashboard/>:
      (<div className='container'>
      <div className='cont_login'>
      <div class="alert alert-warning" role="alert">
  <p className='text-center'>A simple warning alert—check it out! You can't enter Unless You are from Our Team</p>
  <p className='text-center'><Link to="/">Back To Home Page</Link></p>
</div>
        <div className='form_login '>
        <h1 className='h1'>Log In</h1>
        <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
            <img src={lock} className='img-fluid'></img>
        </div>
<div className='col-lg-6 col-md-6 col-sm-12'>
<form>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" onChange={(e)=>setemail(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example1" >Email address</label>
  </div>
  {/* Password input */}
  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" onChange={(e)=>setpassword(e.target.value )} className="form-control" />
    <label className="form-label" htmlFor="form2Example2" >Password</label>
  </div>
  {/* 2 column grid layout for inline styling */}
  {/* Submit button */}
 
  <button  className="btn btn-warning btn-block mb-4" onClick={(e)=>config(email,password,e)}>Sign In</button>
</form>
</div>
        </div>

        </div>
      </div>
    </div>)}
   


    </div>
  )
}

export default Login
