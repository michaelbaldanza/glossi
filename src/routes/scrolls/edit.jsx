import { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { 
  create as createScroll,
  get as getScroll,
  update as updateScroll
} from '../../services/scrolls';
import { get as getUser } from '../../services/users';

export async function loader({ params }) {
  const user = getUser();
  if (!user && !params.scrollId) throw redirect(`/login`);
  let scroll;
  if (params.scrollId) {
    scroll = await getScroll(params.scrollId);
    if (!user || user._id !== scroll.createdBy._id) {
      throw redirect(`/scrolls/${scroll._id}`)
    }
  }
  const loaded = {scroll: scroll, user: user};
  return loaded;
};

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (params.scrollId) {
    await updateScroll(params.scrollId, updates);
    return redirect(`/scrolls/${params.scrollId}`);
  } else {
    const scroll = await createScroll(updates);
    return redirect(`/scrolls/${scroll._id}`);
  }
};

export default function ScrollEdit(props) {
  const loaderData = useLoaderData();
  const scroll = loaderData ? loaderData.scroll : null;
  const user = loaderData.user;
  const [onOrOff, setOnOrOff] = useState(
    scroll && scroll.isDraft ? true : false
  );

  useEffect(() => {
    if (!scroll) {
      document.title = props.makeDocTitle('Add a scroll')
    } else {
      const scrollStr = scroll.title ? scroll.title : 'untitled';
      document.title = props.makeDocTitle('Edit scroll: ' + scrollStr);
    }
  }, [])

  function handleCheckbox() {
    setOnOrOff(!onOrOff);
  };

  return (
    <div className="inner-container">
    <Form method="put">
      <div className="mb-3">
        <label className="form-label" htmlFor="title">Title</label>
        <input
          className="form-control"
          id="title"
          placeholder="untitled"
          defaultValue={scroll ? scroll.title : ''}
          type="text"
          name="title"
          />
      </div>
      <div className="mb-3"> 
        <label className="form-label" htmlFor="body">Body</label>
        <textarea
          className="form-control reader-body"
          id="body"
          name="body"
          placeholder="no text"
          defaultValue={scroll ? scroll.body : ''}
          rows="15"
        />
      </div>
      <div
        className="save-ctrl"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
        <div className="form-check">
          <label className="form-check-label" htmlFor="isDraft">
            Save as draft
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="isDraft"
            name="isDraft"
            checked={onOrOff}
            onChange={() => handleCheckbox()}
          />
        </div>
      </div>
    </Form>
  </div>
  );
};