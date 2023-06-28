import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { get as getDeck } from '../../services/decks';
import { get as getDef } from '../../services/definitions';
import Flash from '../../components/Flash';
import Header from '../../components/Header';
import Preview from '../../components/Preview';

export async function loader({ params }) {
  const deck = await getDeck(params.deckId);
  return deck;
}

export default function DeckPage(props) {
  const deck = useLoaderData();
  const cards = deck.cards;
  const [flashcardView, setFlashcardView] = useState(false);
  if (!flashcardView) console.log(cards);
  const [cardIdx, setCardIdx] = useState(0);
  const [faceIdx, setFaceIdx] = useState(0);

  useEffect(() => {
    document.title = props.makeDocTitle('Deck: ' + deck.name);
  }, []);

  function makeBtn() {
    function handleBtnClick() {
      setFlashcardView(!flashcardView)
    }

    return (
      <button
        className="btn btn-link link-secondary text-decoration-none fst-italic"
        onClick={() => handleBtnClick()}
        style={{padding: '0'}}
      >
        {!flashcardView ? 'Enter flashcard' : 'Return to list'} view.
      </button>
    );
  }

  function makeFlashView() {
    if (!flashcardView) return;

    return <Flash cards={cards} />
  }

  function makeHeader() {
    return (
      <Header 
        createdBy={deck.createdBy}
        docId={deck._id}
        link={'/decks/' + deck._id}
        title={deck.name}
        updatedAt={deck.updatedAt}
        additional={makeBtn()}
      />
    )
  }

  function makeListView() {
    if (flashcardView) return;

    return (
      <div>
        {
          cards ?
            cards.map((card, idx1) => (
              <Preview
                key={idx1 + '-' + card._id}
                content={
                  card?.partOfSpeech.toLowerCase() + ': ' +
                  (card.definitions.length ?
                  card.definitions.length + 
                    (card.definitions.length > 1 ? ' definitions' : ' definition')
                    : 'No definitions.')
                }
                languageCode={card.languageCode}
                link={`/decks/${deck._id}/cards/${card._id}`}
                heading={card.title}
                updatedAt={card.updatedAt}
                createdBy={card.createdBy}
              />
            ))
            :
            'No decks to display.'
          }
      </div>
    )
  }

  return (
    <>
      <div className="inner-container">
        {makeHeader()}
        {makeListView()}
      </div>
      {makeFlashView()}
    </>
  )
}