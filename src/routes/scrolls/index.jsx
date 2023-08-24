import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { index as indexScrolls } from '../../services/scrolls';
import { get as getUser } from '../../services/users';
import { capitalize, varToString } from '../../services/helpers';
import Preview from '../../components/Preview';

export async function loader({ request }) {
  const search = new URL(request.url).search;
  
  /* Handle permission errors for a request to see drafts. 
    Users are permitted to see only the drafts they have created.
    If the user is not logged in, respond with error 404.
    If the user is logged in but has not requested their own drafts, respond
    with error 403.
  */
  const user = getUser();
  if (search.includes('draft=true')) {
    if (!user) {
      const err = new Error('If these drafts belong to you, log in to view them.');
      err.name = '401 Unauthorized';
      throw err;
    } else if (!search.includes('createdBy')) {
      const err = new Error("Can't view all drafts.")
      err.name = '403 Forbidden';
      throw err;
    } else if (!search.includes('createdBy=' + user.username)) {
      const err = new Error(`Can't view these drafts.`);
      err.name = '403 Forbidden';
      throw err;
    }
  }
  
  const scrolls = await indexScrolls(search);
  return scrolls;
}

export default function ScrollIndex(props) {
  const scrolls = useLoaderData();
  useEffect(() => { // set document title
    document.title = props.makeDocTitle;
  }, []);

  return (
    <div className="inner-container">
      <h3>Scrolls</h3>
      {   
        scrolls.length ?
          scrolls.map((scroll, idx1) => (
            <Preview
              key={idx1 + '-' + scroll._id}
              content={scroll.body ? scroll.body.slice(0,70) + '...' : ''}  
              createdBy={scroll.createdBy}
              docId={props._id}
              heading={scroll.title}
              link={`/scrolls/${scroll._id}`}
              updatedAt={scroll.updatedAt}
            />
          ))
          :
          'No scrolls to display.'
      }
    </div>
  );
};