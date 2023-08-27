import React, { useEffect, useState } from 'react'
import axios from "axios";
import {wait,load,empty} from "./assests"
import Swal from 'sweetalert2'

function Message() {
  const [allmessage,setAllmessage]=useState([])
  const getAllmessage=()=>{
    axios.get("http://localhost:5000/message").
      then((res)=>{
        console.log(res.data)
        setAllmessage(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const deletemessage=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/message/delete/${id}`).
        then((res)=>{
        console.log(res.data)})
      .catch((error)=>{
        console.log(error)});
        Swal.fire(
          'Deleted!',
          'Message has been deleted.',
          'success'
        )
      }
    })

  }

  useEffect(()=>{getAllmessage()},[allmessage])
  return (
    <>
    { allmessage && allmessage.length===0 ? <div className='container text-center'>
    <img className='img-fluid' src={empty}></img>
    <h1 className='text-center'>No Message Left</h1>
  </div> :
    (
      <div className='row mt-2 team'>
        <h1 className='text-center'>OPINIONS</h1>
        {
          allmessage && allmessage.map((item,index)=>(
            <div className='col-12 mt-2 info'>
              <div className="card w-50">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><span>Message : </span>{item.message}</p>
                <p className='text-muted'><span>Rating : </span>{item.rating}/5
                </p>
                
                <button className='btn btn-danger w-50' onClick={()=>deletemessage(item._id)}>Delete</button>
              </div>
            </div>
            </div>

          ))
        }
      </div>
    )}
    </>
  )
}

export default Message
