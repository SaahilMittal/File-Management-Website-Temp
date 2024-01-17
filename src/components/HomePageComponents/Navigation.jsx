import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {signOutUser} from "../../redux/actionCreators/authActionCreator"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeFolder } from '../../redux/actionCreators/fileFolderActionCreator';
function NavComponent() {

  const {isAuthenticated , user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <nav className="navbar bg-info navbar-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand ms-5"> File Management System</Link>
        <ul className="navbar-nav ms-auto me-5">
          {
            isAuthenticated ?  (
              <>

            <li className="nav-item mx-2">
                <p className='my-0 mt-1 mx-2'>
                  <span className="text-light"> USER : </span>
                  <span className="text-justigy">{user.displayName}</span>
                </p>
            </li>

            <li className="nav-item mx-2">
                <button className="btn btn-dark btn-md" onClick={()=> {dispatch(changeFolder("root")),navigate("/dashboard")}}>Dashboard</button>
            </li>
            <li className="nav-item">
                <button className="btn btn-danger btn-md" onClick={() =>  {navigate("/") , dispatch(signOutUser()) , dispatch(userLogsOut(""))} }>Logout</button>
            </li>
              </>
            )



            :
            (
              <>

            <li className="nav-item mx-2">
                <Link to="/login" className="btn btn-success btn-md">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="btn btn-primary btn-md">Register</Link>
            </li>
              </>
            )
          }
        </ul>
    </nav>
  )
};

export default NavComponent;