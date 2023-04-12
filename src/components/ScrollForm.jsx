import { Form, useOutletContext } from 'react-router-dom';

export default function ScrollForm(props) {
  const [user, setUser] = useOutletContext();

  return (
    <div className="form-container">
      <h5>Edit {props.scroll.title}</h5>
      <Form method="put">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" defaultValue={props?.scroll.title} type="text" name="title" />
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