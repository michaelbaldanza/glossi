import { useEffect } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import {
  edit as editDeck,
  get as getDeck,
  update as updateDeck,
} from '../../services/decks';
import { get as getUser } from '../../services/users';

export async function loader({ params, request }) {
  const user = getUser();
  const path = new URL(request.url).pathname;
  if (path.includes('/edit' && !user)) {
    const err = new Error('If this deck belongs to you, log in to edit it.');
    err.name = '401 Unauthorized';
    throw err;
  }
  const deck = await editDeck(params.deckId);
  return deck;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateDeck(params.deckId, updates);
  return redirect(`/decks/${params.deckId}`);
}

export default function DeckEdit(props) {
  const deck = useLoaderData();

  useEffect(() =>{
    const deckStr = deck.name ? deck.name : 'untitled';
    document.title = props.makeDocTitle('Edit deck: ' + deckStr);
  }, []);
  
  return (
    <div className="inner-container">
      <Form method="put">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="untitled"
            defaultValue={deck.name}
            type="text"
            name="name"
          />
        </div>
        <div className="btn-group" role="btn-group">
          <button type="submit" className="btn btn-outline-primary">Save</button>
          <button type="submit" className="btn btn-outline-danger">Cancel</button>
        </div>
      </Form>
    </div>
  )
}