import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { index as indexDecks } from '../../services/decks';
import { capitalize, varToString } from '../../services/helpers';
import Preview from '../../components/Preview';

export async function loader() {
  const decks = await indexDecks();
  return decks;
}

export default function DeckIndex(props) {
  useEffect(() => { // set document title
    document.title = props.makeDocTitle;
  }, []);
  
  const decks = useLoaderData();

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h3>Decks</h3>
        <div>
          {   
            decks.length ?
              decks.map((deck, idx1) => (
                <Preview
                  key={idx1 + '-' + deck._id}
                  content={
                    deck.cards.length ?
                      deck.cards.length + 
                      (deck.cards.length > 1 ? ' cards' : ' card')
                      : 'No cards.'
                  }
                  createdBy={deck.createdBy}
                  heading={deck.name}
                  link={`/decks/${deck._id}`}
                  nonEdit={true}
                  updatedAt={deck.updatedAt}
                  
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