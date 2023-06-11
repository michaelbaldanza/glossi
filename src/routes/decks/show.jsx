import { useLoaderData } from 'react-router-dom';
import { get as getDeck } from '../../services/decks';
import Preview from '../../components/Preview';

export async function loader({ params }) {
  const deck = await getDeck(params.deckId);
  return deck;
}

export default function DeckPage(props) {
  const deck = useLoaderData();
  const cards = deck.cards;

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h3>Cards</h3>
        <div>
          {   
            cards ?
              cards.map((card, idx1) => (
                <Preview
                  key={idx1 + '-' + card._id}
                  link={`/decks/${deck._id}/cards/${card._id}`}
                  heading={card.title}
                  content={
                    card?.partOfSpeech.toLowerCase() + ': ' +
                    (card.definitions.length ?
                    card.definitions.length + 
                      (card.definitions.length > 1 ? ' definitions' : ' definition')
                      : 'No definitions.')
                  }
                  updatedAt={card.updatedAt}
                  creator={card.createdBy && card.createdBy.username ? card.createdBy.username : ''}
                />
              ))
              :
              'No decks to display.'
            }
        </div>
      </div>
    </div>
  )
}