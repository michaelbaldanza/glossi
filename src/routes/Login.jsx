import React, { useState } from 'react';
import { redirect, useNavigate, useOutletContext } from 'react-router-dom';
import { getUser, login } from '../services/users';

export function action() {
  console.log(`hitting login action`)
  return redirect('/');
}

export default function Login(props) {
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
    const creds = {
      email: email,
      password: password,
    };
    console.log(`hitting login handleSubmit`)
    try {
      await login(creds);
      setUser(getUser);
      navigate('/')
    } catch (err) {
      alert('invalid credentials');
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