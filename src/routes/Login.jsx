import React, { useState } from 'react';

export default function Login(props) {
  const [email, setEmail] = useState('');

  function handleChange(e) {
    
  }
  
  function handleSubmit(e) {
    e.preventDefault();

  }
  
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="text" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="text" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    </div>
  )
}