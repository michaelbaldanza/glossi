import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { index as indexDecks } from '../../services/decks';
import Preview from '../../components/Preview';

export async function loader() {
  const decks = await indexDecks();
  console.log(decks);
  return decks;
}

export default function DeckIndex(props) {
  useEffect(() => { // set document title
    document.title = props.makeDocTitle;
  }, []);
  
  const decks = useLoaderData();

  console.log(decks.length)

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
                  link={`/decks/${deck._id}`}
                  heading={deck.name}
                  content={
                    deck.cards.length ?
                      deck.cards.length + 
                      (deck.cards.length > 1 ? ' cards' : ' card')
                      : 'No cards.'
                  }
                  updatedAt={deck.updatedAt}
                  createdBy={deck.createdBy}
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