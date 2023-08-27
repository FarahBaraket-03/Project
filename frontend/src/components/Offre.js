import React, { useEffect, useState } from 'react'
import axios from "axios";
import {wait,load,empty} from "./assests"
import Swal from 'sweetalert2'

function Offre() {
    const [alloffre,setAlloffre]=useState([])
  const getAlloffre=()=>{
    axios.get("http://localhost:5000/offre").
      then((res)=>{
        console.log(res.data)
        setAlloffre(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const deleteoffre=(id)=>{
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
        axios.delete(`http://localhost:5000/offre/delete/${id}`).
        then((res)=>{
        console.log(res.data)})
      .catch((error)=>{
        console.log(error)});
        Swal.fire(
          'Deleted!',
          'Offre has been deleted.',
          'success'
        )
      }
    })

  }
  useEffect(()=>{getAlloffre()},[alloffre])
  return (
    <>
    {
        alloffre && alloffre.length===0? <div className='container text-center'>
          <img className='img-fluid' src={wait}></img>
          <h1 className='text-center'>Waiting....</h1>
        </div> :
        (<div className='table-responsive ms-5'>
        <h1 className='mt-3 mb-2 text-warning-emphasis'>OFFRES</h1>
            <table class="table bg-dark text-light table-hover  mt-2">
  <thead>
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Company Name</th>
      <th scope="col">Email</th>
      <th scope="col">Offre</th>
      <th scope="col">Place</th>
      <th scope="col">Price (TND)</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
        alloffre && alloffre.map((item,index)=>(
            <tr>
      <th scope="row">{index +1}</th>
      <td>{item.companyname}</td>
      <td>{item.email}</td>
      <td>{item.offre}</td>
      <td>{item.addresse} , {item.city}</td>
      <td className='text-warning'>{item.price}</td>
      <td><button className='btn btn-danger w-30' onClick={()=>deleteoffre(item._id)}>Delete</button></td>
    </tr>
        ))
    }
  </tbody>
</table></div>
        )
    }
    </>
  )
}

export default Offre
