import React, { useState } from 'react';
import { redirect, useNavigate, useOutletContext } from 'react-router-dom';
import { getUser, login } from '../services/users';

export function action() {
  return redirect('/');
}

export default function Login(props) {
  const [creds, setCreds] = useState({email: '', password: ''});
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();

  function handleChange(e) {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(creds);
      setUser(getUser);
      navigate('/')
    } catch (err) {
      alert('invalid credentials');
    }
  }
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input className="form-control" name="email" type="text" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input className="form-control" name="password" type="text" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    </div>
  )
}