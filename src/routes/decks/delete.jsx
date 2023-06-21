import { redirect } from 'react-router-dom';
import { get as getDeck, deleteDeck } from '../../services/decks';
import { get as getUser } from '../../services/users';


export async function action({ params }) {
  const deckId = params.deckId;
  console.log(`hitting delete deck action`)
  const deck = await getDeck(deckId);
  const user = await getUser();
  if (!user || user._id !== deck.createdBy._id) {
    throw redirect(`/decks${deckId}`);
  }
  await deleteDeck(deckId);
  return redirect('/');
};