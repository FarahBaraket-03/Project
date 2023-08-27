import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
   <div>
 <nav className="navbar navbar-expand-lg menu">
  <div className="container-fluid ">
    <div className='space'>
    <a className="navbar-brand" href="">LOGO</a>
    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon bg-light" />
    </button>
    </div>
    <div className="collapse navbar-collapse nav " id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#main">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">About </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#team">Team</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#rating">Rating</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#projects">Projects</a>
        </li>
        <li className="nav-item ">
         <span className='login'><Link to='/login'>LogIn</Link></span>
        </li>
      </ul>
      
    </div>
  </div>
</nav>

</div>

  )
}

export default Navbar
