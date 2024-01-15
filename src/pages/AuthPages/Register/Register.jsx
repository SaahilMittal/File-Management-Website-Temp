import React from 'react'
import RegForm from '../../../components/AuthComponents/RegForm'

function Register() {
  return (
    <div className="container-fluid">
        <h1 className="display-1 my-5 text-center">Register</h1>
        <div className="row">
          <div className="col-md-5 mx-auto mt-5"> <RegForm/></div>
        </div>
      </div>
  )
}

export default Register