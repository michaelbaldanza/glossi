import { useEffect } from 'react';
import { Form, Link, redirect, useLoaderData, useOutletContext } from 'react-router-dom';
import Preview from '../components/Preview';
import { getToken } from '../services/tokens';
import { get as getUser } from '../services/users';
import { create as createScroll, index as indexScrolls } from '../services/scrolls';

export async function action() {
  const scroll = await createScroll();
  return redirect(`scrolls/${scroll._id}/edit`);
}

export async function loader() {
  const scrolls = await indexScrolls();
  return scrolls;
}

export default function Index(props) {
  const user = getUser();
  const scrolls = useLoaderData();

  useEffect(() => {
    document.title = props.makeDocTitle;
  }, []);

  function makeLink(str, dest, ante, post) {
    return (
      <>
        {ante}
        <Link to={dest} className="text-decoration-none">
          {str}
        </Link>
        {post}
        </>
    );
  }

  return (
    <div className="outer-container">
      <div className="">
        <div>
          <h3>Welcome to Glossi.</h3>
          <p>This is a tool for reading text with unfamiliar words and reviewing new vocabulary.</p>
          <p>
            On Glossi, you can create a scroll—a chunk of text, inside of which any word you click will open a dictionary panel
            populated with entries from a few select APIs.
          </p>
          <p>
            Any entry in the dictionary panel can be saved to a vocabulary list, or deck.
            When you look at a deck, you can enter the flashcard view to test your memory.
          </p>
          <p>
            If you haven't been here before, you can take a look around at other users' scrolls and decks.
            You can also try reading your own scroll in the
            {
              makeLink(
                'Reader',
                'reader',
                ' ',
                ' '
              ) 
            }            
            sandbox.
          </p>
          <p>
            If you have an account, get started by
            {
              makeLink(
                'adding a scroll',
                'scrolls/new',
                ' ',
                `. `
              ) 
            }
          </p>
        </div>
      </div>
    </div>
  )
}