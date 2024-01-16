import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {signOutUser} from "../../../redux/actionCreators/authActionCreator"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Navbar() {

  const {isAuthenticated , user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <nav className="navbar bg-info navbar-light navbar-expand-lg shadow-sm">
        <Link to="/" className="navbar-brand ms-5"> File Management System</Link>
        <ul className="navbar-nav ms-auto me-5">
          {
            isAuthenticated ?  (
              <>

            <li className="nav-item mx-2">
                <p className='my-0 mt-1 mx-2'>
                  <span className="text-dark">Welcome, </span>
                  <span className="fw-bold">{user.displayName}</span>
                </p>
            </li>

            <li className="nav-item mx-2">
                <Link to="/dashboard" className="btn btn-success btn-sm">Dashboard</Link>
            </li>
            <li className="nav-item">
                <button className="btn btn-primary btn-sm" onClick={() => {navigate("/") , dispatch(signOutUser())}}>Logout</button>
            </li>
              </>
            )



            :
            (
              <>

            <li className="nav-item mx-2">
                <Link to="/login" className="btn btn-success btn-sm">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </li>
              </>
            )
          }
        </ul>
    </nav>
  )
};

export default Navbar;