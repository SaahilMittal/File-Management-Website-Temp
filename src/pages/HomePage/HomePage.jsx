import React from 'react'
import { NavComponent } from '../../components/HomePageComponents'
import { useSelector } from 'react-redux';




function HomePage() {

  const {isAuthenticated , user} = useSelector(state => state.authReducer);
  return (
    <>
        <NavComponent />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                  {
                    isAuthenticated ? ( <h1 className="text-center my-5">Hey {user.displayName}! Click on Dashboard to Access Files</h1>) : ( <h1  className="text-center my-5">Kindly Login or Create User</h1>)
                  }
                   
                </div>
            </div>
        </div>
    </>
  )
}

export default HomePage