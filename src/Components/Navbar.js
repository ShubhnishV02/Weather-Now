import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div>
      <div className="navbar-body">
        <div className='left-navbar-section'>
          <Link to='/' style={{ textDecoration: "none" }}><h2>Weather Now <i className='fa fa-sun' style={{ color: "orange" }}></i></h2></Link>
        </div>
        <div className='right-navbar-section'>
          <Link to='/' style={{ textDecoration: "none" }}><h5 className='mobile-display-none'><i className='fa fa-home'></i> Home</h5></Link>
          <Link to='/weather-forecast' style={{ textDecoration: "none" }}><h5><i className='fa fa-cloud'></i> Forecast</h5></Link>
        </div>
      </div>
    </div>
  )
}
