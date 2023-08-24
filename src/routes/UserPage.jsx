import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Preview from '../components/Preview';
import { get as getUser, getUserById, getByUsername } from '../services/users';
import { getToken } from '../services/tokens';

export async function loader({ params }) {
  const profileUser = params.username ?
    await getByUsername(params.username)
    :
    await getUserById(params.userId)
  ;
  return profileUser;
}

export default function UserPage() {
  const profileUser = useLoaderData();
  const currentUser = getUser();
  const scrolls = profileUser.scrolls;

  const isLogged = currentUser && profileUser._id === currentUser._id ? true : false;

  return (
    <div className="inner-container">
      <h3>{profileUser.username }</h3>
      <div>
        <h4>Scrolls</h4>
        <p>
          {
            isLogged ?
            <><a>Drafts</a> - </>
            :
            ''
          }
          <a>Published</a>
        </p>
      </div>
      <div>
        <h4>Decks</h4>
        <p>
        {
            isLogged ?
            <><a>Drafts</a> - </>
            :
            ''
          }
          <a>Published</a>
        </p>
      </div>
      <div>
        <h4>All cards</h4>
      </div>

      <div>
        <h4>Scrolls</h4>
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
    </div>
  )
}