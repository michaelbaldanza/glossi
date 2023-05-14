import { useState } from 'react';
import { Form, useOutletContext } from 'react-router-dom';

export default function ScrollForm(props) {
  const [user, setUser] = useOutletContext();
  const scroll = props.scroll;
  const [scrollChange, setScrollChange] = useState(props.scroll)

  return (
    <div className="form-container">
      <h5>Edit {props.scroll.title}</h5>
      <Form method="put">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder={props.scroll.title ? props.scroll.title : 'untitled'}
            defaultValue={props.scroll.title ? props.scroll.title : ''}
            type="text"
            name="title"
            style={{ opacity: props.scroll.title ? 1 : 0.5 }}
            />
        </div>
        <div className="mb-3"> 
          <label className="form-label">Body</label>
          <textarea className="form-control reader-body" name="body" defaultValue={props?.scroll.body} rows="15" />
        </div>
        <div className="btn-group" role="btn-group">
          {
            user ?
            <>
              <button type="submit" className="btn btn-outline-primary">Save</button>
              <button type="submit" className="btn btn-outline-danger">Cancel</button>
            </>
            :
            <button type="submit" className="btn btn-outline-primary">Go</button>
          }
        </div>
      </Form>
    </div>
  );
}