import { useEffect } from 'react';
import { Form, Link, redirect, useLoaderData, useOutletContext } from 'react-router-dom';
import Preview from '../components/Preview';
import { getToken } from '../services/tokens';
import { get as getUser } from '../services/users';
import { create as createScroll, index as indexScrolls } from '../services/scrolls';

export async function action() {
  const scroll = await createScroll();
  return redirect(`scrolls/${scroll._id}/edit`);
}

export async function loader() {
  const scrolls = await indexScrolls();
  return scrolls;
}

export default function Index(props) {
  const user = getUser();
  const scrolls = useLoaderData();

  useEffect(() => {
    document.title = props.makeDocTitle;
  }, []);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          <h3>Get started</h3>
          <div
            style={{'display': 'flex', 'alignItems': 'center'}}
          >
            <span>
              Get started by&nbsp;
            </span>
            {/* <Form
              method="post"
              style={{'display': 'inline'}}
            >
              <button
                type="submit"
                style={{'padding': '0'}}
                className="btn btn-link text-decoration-none"
              >
                adding a scroll
              </button>
            </Form> */}
            <Link to="scrolls/new" className="text-decoration-none">adding a scroll</Link>
            <span>.</span>
          </div>
        </div>
      </div>
    </div>
  )
}