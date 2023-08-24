import { useEffect } from 'react';
import { Link, redirect, } from 'react-router-dom';
import { create as createScroll, index as indexScrolls } from '../services/scrolls';

export async function loader({ request }) {
  const search = new URL(request.url).search;
  const scrolls = await indexScrolls(search);
  return scrolls;
}

export default function Index(props) {
  useEffect(() => {
    document.title = props.makeDocTitle;
  }, []);

  function makeLink(str, dest) {
    return (
      <Link to={dest ? dest : str} className="text-decoration-none">
        {str}
      </Link>
    );
  }

  return (
    <>
      <h3
        style={{margin: '1em 0'}}
      >
        Welcome to Glossi.
      </h3>
      <p>This is a tool for reading text with unfamiliar words and reviewing new vocabulary.</p>
      <p>
        On Glossi, you can create a
        {' '}<span className="fst-italic">scroll</span>
        —a chunk of text, clicking any word inside of which opens a panel
        populated with dictionary entries from a few select APIs. These entries can be saved to a vocabulary list, or
        {' '}<span className="fst-italic">deck</span>.
        Use decks to review your saved words—we call them 
        {' '}<span className="fst-italic">cards</span>
        —or use the flashcard view to test your memory.
      </p>
      <p>
        If you haven't been here before, you can take a look around at other 
        users' {makeLink('scrolls')} and {makeLink('decks')}. You can also try
        creating and reading your own scroll in
        the {makeLink('reader sandbox', 'reader',)}. You can sign up for an
        account {makeLink('here', 'signup')}.
      </p>
      <p>
        If you have an account, get started
        by {makeLink('adding a scroll', 'scrolls/new')}.
      </p>
    </>
  )
}