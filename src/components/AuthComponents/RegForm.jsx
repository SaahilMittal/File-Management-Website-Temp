import React from 'react'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';

import { useNavigate } from 'react-router-dom'

function RegForm() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] =React.useState('');
    const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();


  const dispatch = useDispatch();  

  React.useEffect(() =>{
    if(success){
      navigate("/dashboard")
    }
  }, [success])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || 
        !email ||
        !password ||
        !passwordConfirmation)
    {
        alert("All fields are required")
        return;
    }

    if(password!=passwordConfirmation){
      alert("Passwords do not match");
      return;
    }

    dispatch(signUpUser(name,email,password,setSuccess))



  }

  return (
    <form action="" autoComplete='off' onSubmit={handleSubmit}>
    <div className="form-group my-2">
        <input type="text" name="name" className="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="form-group my-2">
        <input type="email" name="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-group my-2">
        <input type="password" name="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div className="form-group my-2">
        <input type="password" name="passwordConfirmation" className="form-control" placeholder='Password Confirmation' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
    </div>
  <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
</form>
  )
}

export default RegForm