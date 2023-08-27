import './App.css';
import Navbar from './components/Navbar';
import {rock,woman} from "./components/assests"
import Contact from './components/Contact';
import Footer from './components/Footer';
import Rating from './components/Rating';
import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const [allproject,setAllproject]=useState([])

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
  useEffect(()=>{getAllproject()},[allproject])
  const [allUsers,setAllUsers]=useState([])
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

  useEffect(()=>{
    Aos.init({duration:2000})
    getAllUsers();},[])
  useEffect(()=>{
    getAllmessage()
  },[allmessage])
  return (
    <div className='app'>
     <div className='fixed'><Navbar/></div>
     {/* Main */}
     <div className='conatainer main' id='main'>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <h2>Welcome To My Portfilio</h2>
          <h1>Hi! I'm Farah</h1>
          <p className='text'>Lorem ipsum dolor sit amet. Et nihil omnis id magnam obcaecati sit sunt facilis et pariatur dignissimos sit sequi omnis. Et consectetur omnis ut beatae quis est dignissimos nostrum. In repellat enim in rerum aspernatur rem voluptate consectetur.</p>
          <a href='' className='text-center'>Dig in My Universe <span><img src={rock}></img></span></a>
        </div>
        <img src='https://opendoodles.s3-us-west-1.amazonaws.com/levitate.png' className='img-fluid col-lg-6 col-md-6 col-sm-12 floated'></img>
      </div>
     </div>
     {/* End Of Main */}

     {/* About */}
     <div className='container about' id='about'>
      <h1 className='text-center text-light'>About Us</h1>
      <div className='row m-5'>
      <div className='col-lg-6 col-md-12 col-sm-12 draw'>
          <span className='circle'></span>
          <img src={woman}></img>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12 mt-5 '>
          <h1 className='text-light'>Full-Stack Developer</h1>
          <p className='text1'>I am <span className='name'>Farah Baraket</span>, a passionate freelancer from Ariana,Tunis, bringing you programming and design from the future. My expertise is developing next-level websites and web applications including full frontend design.</p>
        </div>
        
      </div>
     </div>
     {/* end of About */}

     {/* team */}
     <div className='sec_team' id='team'>
      <h1 className='text-center mb-5'>My Team</h1>
      <p className='text-center text m-5'>Lorem ipsum dolor sit amet. Qui iure facere et quas porro quo dicta fuga quo iusto voluptas qui harum suscipit At officiis voluptatem.Hic enim dolores non doloribus nisi eum facilis internos qui voluptatem autem eos reprehenderit voluptatem ut esse sunt et nostrum blanditiis!</p>
     <div className='container d-flex flex-sm-column flex-md-column flex-lg-row  justify-content-lg-between justify-content-md-center justify-content-sm-center flex-warp '>
      {
        allUsers && allUsers.length===0? <h2>I work No More with Team</h2>:
        (
          allUsers && allUsers.map((item,index)=>(
            <div data-aos="fade-up" >
              <div className="card  " style={{width: '18rem'}}>
  <img src={item.image} width={300} height={300} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.fullname}</h5>
    <p className="card-text"><span>Abilities : </span>{item.description}</p>
    <p className='text'>For Contact : {item.email}</p>
  </div>
</div>

            </div>
          ))
        )
      }

     </div>
     </div>

     {/* end of team */}

     {/* Conatct */}
     <Contact/>


     {/* Affichage de project */}
     <div className='container pro' id='projects'>
      <div className='row'>
        <h1 className='mt-3'>OUR PROJECTS</h1>
        <h3 className='text-light text-center'>' Talk is Cheap , Show Me Code '</h3>
        <h5 className='text-light text-center'>"Linus Torvalds"</h5>
      </div>
      <div className='row'>
      <div id="carouselExampleAutoplaying" className="carousel slide row-12 p-2" data-bs-ride="carousel">
         <div className="carousel-inner col-8">
          <div className="carousel-item active  ">
          <div className="content"> <a href="https://github.com/judygab/web-dev-projects/tree/main">
    <div className="content-overlay" /> <img className="content-image" src="https://user-images.githubusercontent.com/50160672/174933373-1ba6cadf-1c9a-48c3-aa58-984d0bd62d82.png" />
    <div className="content-details fadeIn-bottom">
      <h3 className="content-title">Beutiful Portfilio</h3>
      <p className="content-text"><i className="fa fa-map-marker" /> 
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
</svg>    https://github.com/judygab/web-dev-projects/tree/main</p>
    </div>
  </a> </div>
          </div>
          {
            allproject && allproject.map((item,index)=>(
              <div className="carousel-item ">
              <div className="content"> <a href={item.url}>
                <div className="content-overlay" /> <img className="content-image" src={item.image} />
                <div className="content-details fadeIn-bottom">
                  <h3 className="content-title">{item.name}</h3>
                  <p className="content-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg> {item.url}</p>
                  </div>
                  </a> </div>
          </div>
            ))
          } 
          
        </div>
        <button className="carousel-control-prev text-light col-2" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"  />
          <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next text-light col-2" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
            </button>
      </div>
      </div>
     </div>


     {/*^end of afficahge de projects */}

     {/* Rating */}
     <Rating messages={allmessage}/>


     {/* Footer */}
     <Footer/>
    </div>
  );
}

export default App;
