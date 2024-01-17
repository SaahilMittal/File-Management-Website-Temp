import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {signOutUser} from "../../../redux/actionCreators/authActionCreator"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeFolder, userLogsOut } from '../../../redux/actionCreators/fileFolderActionCreator';
function Navbar() {

  const {isAuthenticated , user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <nav className="navbar bg-info navbar-light navbar-expand-lg shadow-sm">
        <Link to="/" className="navbar-brand ms-5  "> File Management System</Link>
        <ul className="navbar-nav ms-auto me-5">
          {
            isAuthenticated ?  (
              <>

            <li className="nav-item mx-2 text-center">
                <p className='my-0 mt-1 mx-2 text-center'>
                  <span className="text-dark"> USER : </span>
                  <span className="fw-bold">{user.displayName}</span>
                </p>
            </li>

            <li className="nav-item mx-2">
                <button className="btn btn-dark btn-md shadow-sm rounded" onClick={()=> {navigate("/dashboard"), dispatch(changeFolder("root"))}}>Dashboard</button>
            </li>
            <li className="nav-item ">
                <button className="btn btn-danger btn-md" onClick={() => {navigate("/") , dispatch(signOutUser()), dispatch(userLogsOut(""))}}>Logout</button>
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