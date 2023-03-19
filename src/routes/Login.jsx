import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUser, login } from '../services/users';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useOutletContext();

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
    try {
      await login(creds);
      setUser(getUser);
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