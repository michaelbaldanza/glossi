import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { get as getUser, signup } from '../services/users'; 

export default function Signup(props) {
  useEffect(() => { // set document title
    document.title = props.makeDocTitle;
  }, []);

  const [creds, setCreds] = useState({
    username: '',
    email: '',
    password: '',
  });
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
      await signup(creds);
      setUser(getUser);
      navigate('/');
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className="inner-container">
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input className="form-control" name="username" type="text" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input className="form-control" name="email" type="text" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input className="form-control" name="password" type="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    </div>
  )
}