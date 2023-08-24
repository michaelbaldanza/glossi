import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Header from '../../components/Header';
import Preview from '../../components/Preview';
import { get as getUser, getUserById, getByUsername } from '../../services/users';
import { capitalize } from '../../services/helpers';
import { getToken } from '../../services/tokens';

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

  function makeSec(entity) {

    return (
      <div>
        <h4>{capitalize(entity)}</h4>
        <p>
          {
            isLogged ?
            <>
              <Link
                className="link link-dark text-decoration-none"
                to={
                  `/${entity}?createdBy=${profileUser.username}&draft=true`
                }
              >
                Drafts
              </Link>
              {' '}-{' '}
            </>
            :
            ''
          }
          <Link
            className="link link-dark text-decoration-none"
            to={
              `/${entity}?createdBy=${profileUser.username}`
            }
          >
            Published
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="inner-container">
      <Header
        docId={profileUser._id}
        title={profileUser.username}
        additional={{
          text: `Joined ${profileUser.createdAt.slice(0, 10)}.`
        }}
      />
      {makeSec('scrolls')}
      {makeSec('decks')}
      {makeSec('cards')}
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