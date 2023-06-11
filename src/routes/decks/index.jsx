import { useLoaderData } from 'react-router-dom';
import { index as indexDecks } from '../../services/decks';
import Preview from '../../components/Preview';

export async function loader() {
  const decks = await indexDecks();
  console.log(decks);
  return decks;
}

export default function DeckIndex(props) {
  const decks = useLoaderData();

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h3>Decks</h3>
        <div>
          {   
            decks ?
              decks.map((deck, idx1) => (
                <Preview
                  key={idx1 + '-' + deck._id}
                  link={`/decks/${deck._id}`}
                  heading={deck.name}
                  content={
                    deck.cards.length ?
                      deck.cards.length + 
                      (deck.cards.length > 1 ? ' cards' : ' card')
                      : 'No cards.'
                  }
                  updatedAt={deck.updatedAt}
                  creator={deck.createdBy && deck.createdBy.username ? deck.createdBy.username : ''}
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