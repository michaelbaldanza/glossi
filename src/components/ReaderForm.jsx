import React, { useState } from 'react';

export default function ReaderForm(props) {
  const [submission, setSubmission] = props.submission;
  const [progress, setProgress] = useState({title: '', body: ''});

  function handleSubmit(e) {
    e.preventDefault();
    setSubmission({
      ...progress,
    });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProgress({
      ...progress,
       [name]: value
    });
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" type="text" name="title" onChange={handleChange} />
        </div>
        <div className="mb-3"> 
          <label className="form-label">Body</label>
          <textarea className="form-control reader-body" name="body" rows="15" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Go</button>
      </form>
    </div>
  )
}