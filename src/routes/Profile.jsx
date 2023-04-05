import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUserDecksAndScrolls } from '../services/users';
import { getToken } from '../services/tokens';

export default function Profile() {
  const [user, setUser] = useOutletContext();
  const [scrolls, setScrolls] = useState(null);

  useEffect(() => {
    const BASE_URL = '/api/users/';
    const options = {
      method: 'GET',
      headers: new Headers({
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
      }),
    }
    fetch(BASE_URL + 'profile', options)
      .then(response => response.json())
      .then(data => setScrolls(data))
  }, [])

  return (
    <div className="outer-container">
      <div className="inner-container">
      <h1>{user.username}</h1>
      <div>
        <h3>Your scrolls</h3>
        { 
          scrolls ?
            scrolls.map((scroll, idx1) => (
              <div className="scroll-preview-container">
                <h5>{scroll.title ? scroll.title : 'untitled'}</h5>
                <div className="scroll-preview">
                  {scroll.body.slice(0,140) + '...'}
                </div>
              </div>
            ))
          : ''
        }
      </div>
      </div>
    </div>
  )
}