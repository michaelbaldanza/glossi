import { Link, useLoaderData, useOutletContext } from 'react-router-dom';
import ScrollPreview from '../components/ScrollPreview';
import { getToken } from '../services/tokens';
import { index } from '../services/scrolls';

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
  const scrolls = await index();
  return scrolls;
}

export default function Index() {
  const [user, setUser] = useOutletContext();
  console.log(user);
  const scrolls = useLoaderData();
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          <h3>Recent scrolls</h3>
          { 
              scrolls.map((scroll, idx1) => (
                <ScrollPreview
                  key={idx1 + '-' + scroll._id}
                  scroll={scroll}
                />
              ))
          }
        </div>
      </div>
    </div>
  )
}