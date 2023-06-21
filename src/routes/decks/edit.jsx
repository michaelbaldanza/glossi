import { useEffect } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import {
  get as getDeck,
  update as updateDeck,
} from '../../services/decks';
import { get as getUser } from '../../services/users';

export async function loader({ params }) {
  const user = getUser();
  const deck = await getDeck(params.deckId);
  if (!user || user._id !== deck.createdBy._id) {
    throw redirect(`/decks/${deck._id}`);
  }
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
    <div className="form-container">
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