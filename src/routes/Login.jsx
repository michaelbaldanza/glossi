import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useOutletContext } from 'react-router-dom';
import { get as getUser, login } from '../services/users';

export function action() {
  return redirect('/');
}

export default function Login(props) {
  useEffect(() => { // sets document title
    document.title = props.makeDocTitle;
  }, []);

  const [creds, setCreds] = useState({
    emailOrUsername: '',
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
      await login(creds);
      setUser(getUser);
      navigate('/')
    } catch (err) {
      alert('invalid credentials');
    }
  }

  return (
    <div className="inner-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailOrUsername">Email or username</label>
          <input
            className="form-control"
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
      <div className="alert alert-primary" role="alert" style={{'marginTop': '1rem'}}>
        Don't have an account? Sign up <Link to="/signup">here</Link>.
      </div>
    </div>
  )
}