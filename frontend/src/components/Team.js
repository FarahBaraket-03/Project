import React, { useEffect, useState } from 'react'
import {lock} from "./assests"
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
function Team() {
  const [allUsers,setAllUsers]=useState([])
  // ^ajouter
  const [email,setemail]=useState('');
    const [name,setName]=useState('');
    const [age,setage]=useState(19);
    const [password,setpassword]=useState('');
    const [image,setimage]=useState('');
    const [description,setdes]=useState('');
  //* update
  const [Uemail,setUemail]=useState('');
  const [Uname,setUName]=useState('');
  const [Uage,setUage]=useState(null);
  const [Upassword,setUpassword]=useState('');
  const [Uimage,setUimage]=useState('');
  const [Udescription,setUdes]=useState('');
  const [editUser,setEditUser]=useState('');

  const updateUser=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5000/user/update/${editUser._id}`,
    {
      "fullname":Uname.length===0? editUser.name : Uname,
      "description":Udescription.length===0? editUser.description : Udescription,
      "age":Uage===null? editUser.age : Uage,
      "image":Uimage.length===0? editUser.image : Uimage,
      "email":Uemail.length===0? editUser.email : Uemail,
      "password":Upassword.length===0? editUser.password : Upassword

    }).
    then((res)=>{
      console.log(res);
      setUemail('')
      setUpassword('')
      setUdes('')
      setUimage('')
      setUName('')
      setUage(null);

    })
    .catch((error)=>{
      console.log(error)
    })
    document.getElementById('Uuser').reset()
  }

    const deleteUser=(id)=>{
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
          axios.delete(`http://localhost:5000/user/delete/${id}`).
          then((res)=>{
          console.log(res.data)})
        .catch((error)=>{
          console.log(error)});
          setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          Swal.fire(
            'Deleted!',
            'Member has been deleted.',
            'success'
          )
        }
      })
  
    }

  const adduser=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/user/add",{
        "fullname":name,
        "email":email,
        "age":age,
        "password":password,
        "image":image,
        "description":description
        
    }).
  then((res)=>{
    console.log(res.data);
    Swal.fire({
        title: 'perfect',
        text: "the Memeber has been added!",
        icon: 'success',
        
      })
  })
  .catch((error)=>{
    console.log(error)
  });

  document.getElementById('user').reset(); 
}
  const getAllUsers=()=>{
    axios.get("http://localhost:5000/user").
      then((res)=>{
        console.log(res.data)
        setAllUsers(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  useEffect(()=>{getAllUsers()},[allUsers])
  return (
    <>
    {
    allUsers && allUsers.length ===0 ? <h1 className='text-light text-center'>loading...</h1> :(
      <div className='row team mt-2'>
        <h1 className='text-center'>OUR TEAM</h1>
       {allUsers && allUsers.map((item,index)=>(
        <div className='col-12 mt-3 info'>
<div className="card mb-3" style={{maxWidth: 540}}>
  <div className='row-12 d-flex rowbtn'>
    <button className='btn btn-danger ' width={16} onClick={()=>deleteUser(item._id)} >X</button>
    <button className='btn btn-primary' onClick={()=>setEditUser(item)} data-bs-toggle="modal" data-bs-target="#exampleModal2">
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
</svg>

     </button>
  </div>
  <div className="row">
    <div className="col-md-4">
      <img src={item.image} alt="Trendy Pants and Shoes" className="img-fluid " />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{item.fullname}</h5>
        <p className="card-text">
        <p className="card-text">
          <span>Age : </span>{item.age}
        </p>
          <span>Abilities : </span>{item.description}
        </p>
        <p className="card-text">
          <small className="text-muted">For contact : {item.email}</small>
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
      {/* Modals */}
      <div className='add text-center'>
        <button className='btn ' data-bs-toggle="modal" data-bs-target="#exampleModal"> + Add A Memeber</button>
       </div>
<div>

  {/* Modal 1*/}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Memeber</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form id='user'>
       <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={(e)=>setemail(e.target.value)} id="exampleFormControlInput1" placeholder="name@example.com" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setpassword(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div><div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
    <input type="number" className="form-control" onChange={(e)=>setage(e.target.value)} id="exampleFormControlInput1" placeholder="19<" />
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
          <button type="button" className="btn btn-success " onClick={adduser}>Join</button>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Modal 2 */}
<div>

  {/* Modal */}
  <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit : </h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form id='Uuser'>
       <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={(e)=>setUemail(e.target.value)} id="exampleFormControlInput1" placeholder="name@example.com" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setUpassword(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
    <input type="text" className="form-control" onChange={(e)=>setUName(e.target.value)} id="exampleFormControlInput1" placeholder=".." />
  </div><div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
    <input type="number" className="form-control" onChange={(e)=>setUage(e.target.value)} id="exampleFormControlInput1" placeholder="19<" />
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
          <button type="button" className="btn btn-warning " onClick={updateUser}>Update</button>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* End of Modals */}
    </>
  )
}

export default Team
