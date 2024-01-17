import React from 'react'
import {useDispatch} from "react-redux"

import { signInUser } from '../../redux/actionCreators/authActionCreator';

import { useNavigate } from 'react-router-dom'



function LoginForm() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

     

  React.useEffect(() =>{
    if(success){
    
      navigate("/")
      
    }
  }, [success])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email)
        {
            alert("Email Field cannot be empty")
            return;
        }
        else if(!password)
        {
            alert("Password field cannot be empty")
            return;

        }

        dispatch(signInUser(email,password, setSuccess));
    }

  return (
    <form action="" autoComplete='off' onSubmit={handleSubmit}>
        <div className="form-group my-2">
            <input type="email" name="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group my-2">
            <input type="password" name="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
    </form>
  )
}



export default LoginForm