import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Preview from '../components/Preview';
import { get as getUser, getUserDecksAndScrolls, getByUsername } from '../services/users';
import { getToken } from '../services/tokens';

export async function loader({ params }) {
  const profileUser = await getByUsername(params.username);
  console.log(profileUser.username);

  return profileUser;
}

export default function UserPage() {
  const profileUser = useLoaderData();
  const currentUser = getUser();
  const isLogged = currentUser && profileUser._id === currentUser._id ? true : false;
  const scrolls = profileUser.scrolls;

  return (
    <div className="inner-container">
      <h3>{isLogged ? 'Your profile' : profileUser.username}</h3>
      {   
        scrolls ?
          scrolls.map((scroll, idx1) => (
            <Preview
              key={idx1 + '-' + scroll._id}
              link={`/scrolls/${scroll._id}`}
              heading={scroll.title}
              content={scroll.body.slice(0,70) + '...'}
              updatedAt={scroll.updatedAt}
              createdBy={profileUser}
            />
          ))
          :
          'No scrolls to display.'
      }
    </div>
  )
}