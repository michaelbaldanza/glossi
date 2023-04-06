import { getToken } from '../services/tokens';
import { Link, useLoaderData, useOutletContext } from 'react-router-dom';

export async function loader() {
  const BASE_URL = '/api/users/';
  const options = {
    method: 'GET',
    headers: new Headers({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    }),
  }
  const userScrolls = await fetch(BASE_URL + 'profile', options)
    .then(response => response.json())
  console.log(userScrolls)
  // }
  // const userScrolls = '';
  return userScrolls;
}

export default function Index() {
  const [user, setUser] = useOutletContext();
  const scrolls = useLoaderData();
  console.log(scrolls);
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          <h3>{user ? user.username + "'s" : 'Most recent'} scrolls</h3>
          { 
              scrolls.map((scroll, idx1) => (
                <Link to={`scrolls/${scroll._id}`} className="link-dark text-decoration-none">
                  <span className="scroll-preview-container" style={{'display': 'block'}}>
                    <h5>{scroll.title ? scroll.title : 'untitled'}</h5>
                    <span className="scroll-preview" style={{'display': 'block'}}>
                      {scroll.body.slice(0,70) + '...'}
                    </span>
                  </span>
                </Link>
              ))
          }
        </div>
      </div>
    </div>
  )
}