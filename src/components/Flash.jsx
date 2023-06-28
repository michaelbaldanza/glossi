import { useState } from 'react';
import { BTN_CLASSES } from '../services/constants';

export default function Flash(props) {
  const cards = props.cards;
  const [flashIdx, setFlashIdx] = useState(0);
  const [faceIdx, setFaceIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [flashcards, setFlashcards] = useState(makeFlashcards);

  console.log(flashcards)

  function makeFlashcards() {
    return (
      cards.map((card, idx0) => {
      const recto = {
        title: card.title,
        partOfSpeech: card.partOfSpeech,
      };
      const verso = card.definitions.map((def, idx1) => {
        return def;
      })
      return [recto, verso];
    })
    );
  }

  function makeFlashcard() {
    const flashcard = flashcards[flashIdx];
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
      const verso = flashcard[faceIdx]
      console.log(verso)
      return (
        <div className="flashcard verso">
          <ol>
            {
              verso.map((def, idx) => (
                <li>
                  {def.definition}
                </li>
              ))
            }
          </ol>
        </div>
      )
    }

    return (
      <div>
        {makeRecto()}
        {makeVerso()}
      </div>
    )
  }

  function makeButton(action) {
    const actions = {
      rwd: {
        icon: isHovered === 'rwd' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rewind-fill" viewBox="0 0 16 16">
        <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z"/>
        <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z"/>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rewind" viewBox="0 0 16 16">
        <path d="M9.196 8 15 4.633v6.734L9.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z"/>
        <path d="M1.196 8 7 4.633v6.734L1.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z"/>
      </svg>,
        handleClick: () => {
          if (flashIdx === 0 && faceIdx === 1) {
            setFaceIdx(faceIdx - 1);
          } else if (flashIdx === 0) {
            return;
          } else {
            setFlashIdx(flashIdx - 1);
            setFaceIdx(0);
          }
        },
      },
      left: {
        icon: isHovered === 'left' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
      </svg>,
        handleClick: () => {
          if (faceIdx === 0 && flashIdx === 0) return;
          if (faceIdx === 1) {
            setFaceIdx(faceIdx - 1);
          } else if (faceIdx === 0) {
            setFaceIdx(faceIdx + 1);
            setFlashIdx(flashIdx - 1);
          }
        },
      },
      right: {
        icon: isHovered === 'right' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
      </svg>,
        handleClick: () => {
          if (faceIdx === 1 && flashIdx === (flashcards.length - 1)) return;
          if (faceIdx === 0) {
            setFaceIdx(faceIdx + 1);
          } else if (faceIdx === 1) {
            setFlashIdx(flashIdx + 1);
            setFaceIdx(faceIdx - 1);
          }
        },
      },
      fwd: {
        icon: isHovered === 'fwd' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-fill" viewBox="0 0 16 16">
        <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
        <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward" viewBox="0 0 16 16">
          <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
          <path d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
        </svg>,
        handleClick: () => {
          if (
            flashIdx === (flashcards.length - 1) &&
            faceIdx === 0
          ) {
            setFaceIdx(faceIdx + 1);
          } else if (flashIdx === (flashcards.length - 1)) {
            return;
          } else {
            setFlashIdx(flashIdx + 1);
            setFaceIdx(0);
          }
        },
      },
    };

    function handleHover(e) {
      e.stopPropagation();
      setIsHovered(action);
    }
    return (
      <button
        className={BTN_CLASSES + ' ' + action}
        onClick={() => actions[action].handleClick()}
        onMouseEnter={(e) => handleHover(e)}
        onMouseLeave={() => setIsHovered(null)}
      >
        {actions[action].icon}
      </button>
    );
  }

  return (
    <>
    {/* <h1>Flash Idx: {flashIdx}</h1>
      <h1>Face Idx: {faceIdx}</h1> */}
    <div className="flashcard-mat">
      {makeButton('rwd')}
      {makeButton('left')}
      {makeFlashcard()}
      {makeButton('right')}
      {makeButton('fwd')}
      {/* <FlashButton
        action={'fwd'}
        isHovered={[isHovered, setIsHovered]}
        faceIdx={[faceIdx, setFaceIdx]}
        flashIdx={[flashIdx, setFlashIdx]}
        flashcards={flashcards}
      /> */}
    </div>
    </>
  )
}