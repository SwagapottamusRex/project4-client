import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth';



const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };


  return (
    <>
      <nav className='navbar-wrapper'>
        <div className='navbar-brand'>
          <Link to='/home' className='navbar-item'>
            <p className='fontstyling'>Home</p>
            <span className='icon'>
              <i className='fas fa-home'></i>
            </span>
          </Link>

          <Link to='/pixel' className='navbar-item'>
            <p className='fontstyling'>r/Place</p>
            <span className='icon'>
              <i class='fas fa-square'></i>
            </span>
          </Link>
          <Link to='/community' className='navbar-item'>
            <p className='fontstyling'>Community</p>
            <span className='icon'>
              <i class='fas fa-users'></i>
            </span>
          </Link>
          {getLoggedInUserId() && (
            <Link to='/myprofile' className='navbar-item'>
              <p className='fontstyling'>My Profile</p>
              <span className='icon'>
                <i class='fas fa-address-card'></i>
              </span>
            </Link>
          )}
          <div className='navbar-end'>
            {!getLoggedInUserId() && (
              <Link to='/register' className='navbar-item'>
                <p className='fontstyling'>Register</p>
                <span className='icon'>
                  <i className='fas fa-user'></i>
                </span>
              </Link>
            )}
            {!getLoggedInUserId() && (
              <Link to='/login' className='navbar-item'>
                <p className='fontstyling'>Login</p>
                <span className='icon'>
                  <i class='fas fa-user-lock'></i>
                </span>
              </Link>
            )}
            {getLoggedInUserId() && (
              <Link
                to='/home'
                className='navbar-item'
                id='logout'
                onClick={logout}
              >
                <span className='icon'>
                  <i className='fa fa-arrow-left'></i>
                </span>
                <p className='fontstyling'>Logout</p>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );


}

export default Navbar