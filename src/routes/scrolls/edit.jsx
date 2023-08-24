import { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { 
  create as createScroll,
  edit as editScroll,
  get as getScroll,
  newScroll,
  update as updateScroll
} from '../../services/scrolls';
import { get as getUser } from '../../services/users';

export async function loader({ params, request }) {
  const scrollId = params.scrollId ?? null;
  const path = new URL(request.url).pathname;
  const user = getUser();
  if (path.includes('/edit' && !user)) {
    const err = new Error('If this scroll belongs to you, log in to edit it.');
    err.name = '401 Unauthorized';
    throw err;
  } else if (path.includes('/new') && !user) {
    const err = new Error(
      "To create a scroll, log in to your account. If you don't have an account, sign up or use the sandbox.",
    );
    err.name = '401 Unauthorized'
    throw err;
  }
  const scroll = path.endsWith('/new') ?
    await newScroll() : path.endsWith('/edit') ?
      await editScroll(scrollId) : await getScroll(scrollId)
  ;
  return ({ scroll, user, });
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
  const navigate = useNavigate();
  const user = loaderData.user;
  const [onOrOff, setOnOrOff] = useState(
    scroll && scroll.draft ? true : false
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
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cancel
              </button>
            </>
            :
            <button type="submit" className="btn btn-outline-primary">Go</button>
          }
        </div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="draft">
            Save as draft
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="draft"
            name="draft"
            checked={onOrOff}
            onChange={() => handleCheckbox()}
          />
        </div>
      </div>
    </Form>
  </div>
  );
};