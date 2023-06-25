import { redirect } from 'react-router-dom';
import { deleteDeck } from '../../services/decks';

export async function action({ params }) {
  const deckId = params.deckId;
  await deleteDeck(deckId);
  return redirect('/decks');
};