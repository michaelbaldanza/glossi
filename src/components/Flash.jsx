import { useRef, useState } from 'react';

export default function Flash(props) {
  const cards = props.cards;
  const [flashIdx, setFlashIdx] = useState(0);
  const [faceIdx, setFaceIdx] = useState(0);
  const flashcards = cards.map((card, idx0) => {
    const recto = {
      title: card.title,
      partOfSpeech: card.partOfSpeech,
    };
    const verso = card.definitions.map((def, idx1) => {
      return {definition: def};
    })
    return [recto, verso];
  })
  console.log(flashcards);

  function makeFlashcard() {
    const flashcard = flashcards[flashIdx];
    console.log(flashcard)
    function makeRecto() {
      if (faceIdx !== 0) return;
      const recto = flashcard[faceIdx]
      return (
        <div className="flashcard recto">
          <h3>{recto.title}</h3>
          <h4 className="faded">{recto.partOfSpeech.toLowerCase()}</h4>
        </div>
      )
    }
  
    function makeVerso() {
      if (faceIdx !== 1) return;
      return (
        <div className="flashcard verso">verso</div>
      )
    }

    return (
      <div>
        {makeRecto()}
        {makeVerso()}
      </div>
    )
  }

  function makeArrowBtn() {
    
  }

  return (
    <>
    {/* <h1>Flash Idx: {flashIdx}</h1>
      <h1>Face Idx: {faceIdx}</h1> */}
    <div className="flashcard-mat">
      {makeFlashcard()}
    </div>
    </>
  )
}