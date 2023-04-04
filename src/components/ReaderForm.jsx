import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function ReaderForm(props) {
  const [submission, setSubmission] = props.submission;
  const [editMode, setEditMode] = props.editMode;
  const [progress, setProgress] = useState({...submission});
  const [user, setUser] = useOutletContext();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmission({
      ...progress,
    });
    setEditMode(!editMode);
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
          <input className="form-control" defaultValue={submission?.title} type="text" name="title" onChange={handleChange} />
        </div>
        <div className="mb-3"> 
          <label className="form-label">Body</label>
          <textarea className="form-control reader-body" name="body" defaultValue={submission.body} rows="15" onChange={handleChange} />
        </div>
        <div className="btn-group" role="btn-group">
          <button type="submit" className="btn btn-outline-primary">Go</button>
          {
            user ?
            <button type="submit" className="btn btn-outline-primary">Save</button>
            :
            ''
          }
        </div>
      </form>
    </div>
  )
}