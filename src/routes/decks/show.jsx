import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { get as getDeck } from '../../services/decks';
import { get as getDef } from '../../services/definitions';
import Preview from '../../components/Preview';
import Header from '../../components/Header';

export async function loader({ params }) {
  const deck = await getDeck(params.deckId);
  return deck;
}

export default function DeckPage(props) {
  const deck = useLoaderData();
  const cards = deck.cards;
  console.log(cards);
  const [flashcardView, setFlashcardView] = useState(false);
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
        Enter {!flashcardView ? 'flashcard' : 'list'} view.
    </button>
    );
  }

  function makeListView() {
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

  function makeFlashcardView() {

    const flashcards = cards.map((card, idx) => {
      const recto = {
        title: card.title,
        verso: card.partOfSpeech,
      };
      const verso = card.definitions.map((def, idx2) => {
        return {definition: def};
      })
      return [recto, verso];
    })
    console.log(flashcards);
    return <div>flashcards go here</div>
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <Header 
          createdBy={deck.createdBy}
          docId={deck._id}
          link={'/decks/' + deck._id}
          title={deck.name}
          updatedAt={deck.updatedAt}
        />
        {/* {makeBtn()} */}
        {
          !flashcardView ?
          makeListView()
          :
          makeFlashcardView()
        }
      </div>
    </div>
  )
}