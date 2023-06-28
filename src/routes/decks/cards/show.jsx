import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { get as getCard } from '../../../services/cards';
import Header from '../../../components/Header';

export async function loader({ params }) {
  const card = await getCard(params.cardId);
  return card;
}

export default function CardPage(props) {
  const card = useLoaderData();
  console.log(card)
  useEffect(() => { // set document title
    document.title = props.makeDocTitle(
      'Card: ' + card.title
    );
  }, []);

  return (
    <div className="inner-container">
      <Header
        createdBy={card.createdBy}
        languageCode={card.languageCode}
        link={`/decks/${card.deck}/cards/${card._id}`}
        title={card.title}
        updatedAt={card.updatedAt}
      />
      <h4 className="faded" style={{'fontSize': 'small'}}>
        {card.partOfSpeech.toLowerCase()}
      </h4>
      <div>
        <ol>
        {
          card.definitions.map((definition, idx0) => (
            <li key={definition._id + '-' + idx0}>
              {definition.definition}
            </li>
          ))
        }
        </ol>
      </div>
    </div>
  )
};