import { useState, useEffect } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import ScrollPreview from '../components/ScrollPreview';
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
    <div className="outer-container">
      <div className="inner-container">
        <div>
            <h3>{viewUser.username}'s scrolls</h3>
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