import { useEffect } from 'react';
import { Form, Link, redirect, useLoaderData, useOutletContext } from 'react-router-dom';
import Preview from '../components/Preview';
import { getToken } from '../services/tokens';
import { create as createScroll, index as indexScrolls } from '../services/scrolls';

export async function action() {
  const scroll = await createScroll();
  return redirect(`scrolls/${scroll._id}/edit`);
}

export async function loader() {
  const scrolls = await indexScrolls();
  console.log(scrolls)
  return scrolls;
}

export default function Index(props) {
  const [user, setUser] = useOutletContext();
  const scrolls = useLoaderData();

  useEffect(() => {
    document.title = props.title;
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
            <Form
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
            </Form>
            <span>.</span>
          </div>
        </div>
        <div>
          <h3>Recent scrolls</h3>
          {   
            scrolls ?
              scrolls.map((scroll, idx1) => (
                <Preview
                  key={idx1 + '-' + scroll._id}
                  link={`/scrolls/${scroll._id}`}
                  heading={scroll.title}
                  content={scroll.body.slice(0,70) + '...'}
                  updatedAt={scroll.updatedAt}
                  creator={scroll.createdBy.username}
                />
              ))
              :
              'No scrolls to display.'
          }
        </div>
      </div>
    </div>
  )
}