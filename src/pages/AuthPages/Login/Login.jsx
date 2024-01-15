import React from 'react'
import LoginForm from '../../../components/AuthComponents/LoginForm'

function Login() {
  return (
      <div className="container-fluid">
        <h1 className="display-1 my-5 text-center">Login</h1>
        <div className="row">
          <div className="col-md-5 mx-auto mt-5"> <LoginForm/></div>
        </div>
      </div>
  )
}

export default Login