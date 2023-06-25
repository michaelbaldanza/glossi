import { redirect } from 'react-router-dom';
import { deleteCard } from '../../../services/cards';

export async function action({ params }) {
  const cardId = params.cardId;
  const deckId = params.deckId;
  await deleteCard(cardId);
  return redirect('/decks/' + deckId);
}