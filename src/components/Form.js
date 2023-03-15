import React, { useState } from 'react';

export default function Form(props) {
  const [lookup, setLookup] = useState('');

  function handleChange(e) {
    setLookup(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (lookup.length) {
      props.addLookup(lookup);
    }
    setLookup('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="lookup">Look it up.</label>
        <input 
          className="form-control"
          type="text"
          id="lookup"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Go
      </button>
    </form>
  )
}