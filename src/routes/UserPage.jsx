import { useState, useEffect } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import Preview from '../components/Preview';
import { getUser, getUserDecksAndScrolls, getByUsername } from '../services/users';
import { getToken } from '../services/tokens';

export async function loader({ params }) {
  const viewUser = await getByUsername(params.username);
  return viewUser[0];
}

export default function UserPage() {
  const [user, setUser] = useOutletContext();
  const viewUser = useLoaderData();
  const scrolls = viewUser.scrolls;

  return (
    <div className="inner-container">
      <h3>{viewUser.username}'s scrolls</h3>
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
  )
}