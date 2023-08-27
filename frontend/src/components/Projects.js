import React, { useEffect, useState } from 'react'
import axios from "axios";
import {wait,load,empty} from "./assests"
import Swal from 'sweetalert2'


function Projects() {
  const [allproject,setAllproject]=useState([])
  // ^ajouter
  const [url,seturl]=useState('');
    const [name,setName]=useState('');
    const [image,setimage]=useState('');
    const [description,setdes]=useState('');
  //* update
  const [Uurl,setUurl]=useState('');
  const [Uname,setUName]=useState('');
  const [Uimage,setUimage]=useState('');
  const [Udescription,setUdes]=useState('');
  const [editUser,setEditUser]=useState('');

  const updatepro=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5000/project/update/${editUser._id}`,
    {
      "name":Uname.length===0? editUser.name : Uname,
      "description":Udescription.length===0? editUser.description : Udescription,
      "image":Uimage.length===0? editUser.image : Uimage,
      "url":Uurl.length===0? editUser.url : Uurl,

    }).
    then((res)=>{
      console.log(res);
      setUurl('')
      setUdes('')
      setUimage('')
      setUName('')

    })
    .catch((error)=>{
      console.log(error)
    })
    document.getElementById('Uproject').reset()
  }
  
  const addpro=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/project/add",{
        "name":name,
        "url":url,
        "image":image,
        "description":description
        
    }).
  then((res)=>{
    console.log(res.data);
    Swal.fire({
        title: 'perfect',
        text: "the Projects has been added!",
        icon: 'success',
        
      })
  })
  .catch((error)=>{
    console.log(error)
  });

  document.getElementById('project').reset(); 
}

  const getAllproject=()=>{
    axios.get("http://localhost:5000/project").
      then((res)=>{
        console.log(res.data)
        setAllproject(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const deletepro=(id)=>{
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
        axios.delete(`http://localhost:5000/project/delete/${id}`).
        then((res)=>{
        console.log(res.data)})
      .catch((error)=>{
        console.log(error)});
        Swal.fire(
          'Deleted!',
          'Project has been deleted.',
          'success'
        )
      }
    })

  }
  useEffect(()=>{getAllproject()},[allproject])

  return (
    <>
    {
    allproject && allproject.length ===0 ? <div className='container text-center'>
    <img className='img-fluid' src={load}></img>
    <h1 className='text-center'>loading....</h1>
  </div> :(
      <div className='row team mt-2'>
        <h1 className='text-center'>OUR PROJECTS</h1>
       {allproject && allproject.map((item,index)=>(
        <div className='col-lg-12  mt-3 info'>
<div className="card mb-3 bg-dark" style={{maxWidth: 540}}>
  <div className='row-12 d-flex rowbtn'>
    <button className='btn btn-danger ' width={16} onClick={()=>deletepro(item._id)} >X</button>
    <button className='btn btn-primary' onClick={()=>setEditUser(item)} data-bs-toggle="modal" data-bs-target="#exampleModal2">
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
</svg>

     </button>
  </div>
  <div className="row ">
    <div className="col-md-4">
      <img src={item.image} alt="Trendy Pants and Shoes" className="img-fluid " />
    </div>
    <div className="col-md-8">
      <div className="card-body ">
        <h5 className="card-title text-light">{item.name}</h5>
        <p className="card-text text-light">
          <span>Description : </span>{item.description}
        </p>
        <p className="card-text">
          <small className="text-secondary">Lien GitHub : {item.url}</small>
        </p>
      </div>
    </div>
  </div>
</div>

        </div>
       ))}
      </div>
      )
      }
    <div className='add text-center'>
        <button className='btn ' data-bs-toggle="modal" data-bs-target="#exampleModal"> + Add A Project</button>
       </div>

    {/* Modal 1*/}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form id='project'>
       <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">URL (GitHub) </label>
    <input type="email" className="form-control" onChange={(e)=>seturl(e.target.value)} id="exampleFormControlInput1" placeholder="http//...." />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Name of Project</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
    <textarea className="form-control" onChange={(e)=>setdes(e.target.value)} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Your Image Url</label>
    <input type="text" className="form-control" onChange={(e)=>setimage(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>

</div>

       </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-success " onClick={addpro} >Add one</button>
        </div>
      </div>
    </div>
  </div>

   {/* Modal 2*/}
   <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Project</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form id='Uproject'>
       <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">URL (GitHub) </label>
    <input type="email" className="form-control" onChange={(e)=>setUurl(e.target.value)} id="exampleFormControlInput1" placeholder="http//...." />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Name of Project</label>
    <input type="text" className="form-control" onChange={(e)=>setUName(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
    <textarea className="form-control" onChange={(e)=>setUdes(e.target.value)} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Your Image Url</label>
    <input type="text" className="form-control" onChange={(e)=>setUimage(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>

</div>

       </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-warning " onClick={updatepro} >Update</button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Projects
