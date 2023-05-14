import { Form, redirect, useLoaderData, useOutletContext } from 'react-router-dom';
import { getScroll, update as updateScroll } from '../services/scrolls';
import { getUser } from '../services/users';

export async function loader({ params }) {
  const user = getUser();
  const scroll = await getScroll(params.scrollId);
  if (!user || user._id !== scroll.createdBy._id) {
    throw redirect(`/scrolls/${scroll._id}`)
  }
  return scroll;
};

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateScroll(params.scrollId, updates);
  return redirect(`/scrolls/${params.scrollId}`);
};

export default function ScrollEdit() {
  const [user, setUser] = useOutletContext();
  const scroll = useLoaderData();

  return (
    <div className="form-container">
    <Form method="put">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          placeholder="untitled"
          defaultValue={scroll.title}
          type="text"
          name="title"
          />
      </div>
      <div className="mb-3"> 
        <label className="form-label">Body</label>
        <textarea
          className="form-control reader-body"
          name="body"
          placeholder="no text"
          defaultValue={scroll.body}
          rows="15"
        />
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
};