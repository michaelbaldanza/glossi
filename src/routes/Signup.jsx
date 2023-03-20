import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getUser, signup } from '../services/users'; 

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();
  
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    try {
      await signup(newUser);
      setUser(getUser);
      navigate('/');
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="text" onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="text" onChange={handlePassword} />
        </div>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    </div>
  )
}