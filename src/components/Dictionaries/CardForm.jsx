import { Fragment, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { clipTags, isLast, isLemma } from '../../services/helpers';
import { BTN_CLASSES } from '../../services/constants';
import { create } from '../../services/cards';
import { getUserById } from '../../services/users';

export default function CardForm(props) {
  console.log(props);
  const [user, setUser] = useOutletContext();
  const userId = useOutletContext()[0]._id;
  const [activeDeckInput, setActiveDeckInput] = useState(null);
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setDecks(response.decks)
      } catch (error) {
        console.error('error', error);
      }
    }
    fetchUser();
  }, []);

  const [card, setCard] = useState(makeCardState(props.entry));
  console.log(card);
  const [submittedCard, setSubmittedCard] = useState(null);
  const [titleInput, setTitleInput] = useState(false);
  function makeCardState(entry) {
    const newCard = structuredClone(entry);
    newCard.title = newCard.headword;
    newCard.citation = {
      scroll: props.scrollId,
      location: props.wordId,
    };
    if (props.activeDict === 'Free Dictionary') newCard.languageCode = 'en'
    delete newCard.headword;
    if (newCard.definitions) {
      const defs = newCard.definitions;
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i];
        def.checked = false;
        def.idx = i;
        def.definition = clipTags(def.definition)
        def.source = { name: props.activeDict, userSubmitted: false };
        if (def.hasOwnProperty('parsedExamples')) {
          delete def.parsedExamples;
        }
        if (def.hasOwnProperty('examples')) {
          for (let j = 0; j < def.examples.length; j++) {
            def.examples[j] = clipTags(def.examples[j]);
          }
        }
        if (def.hasOwnProperty('example')) {
          def.examples = [];
          def.examples.push(def.example);
          delete def.example;
        }
      }
    }
    return newCard;
  }
  function makeTitleInput() {
    function handleTitleInput(e) {
      e.stopPropagation();
      if (e.type === 'click' || e.type === 'keydown' && e.key === 'Enter') {
        setTitleInput(!titleInput);
      }
    }

    return (
      <div style={{'display': 'flex', 'alignItems': 'center'}}>
        {
          titleInput ?
          <input
            name="title"
            className="form-control"
            type="text"
            value={card.title}
            onChange={handleChange}
            onKeyDown={handleTitleInput}
            autoFocus
          />
          :
          <>
            <h6>{card.title}</h6>
            <button
              className={`${BTN_CLASSES} faded`}
              type="button"
              style={{'fontSize': 'smaller', 'marginLeft': '10px'}}
              onClick={(e) => handleTitleInput(e)}
            >
              Is this right?
            </button>
          </>
        }
      </div>
    )
  }

  async function handleSubmit(e) {
    e.stopPropagation();
    const submission = {...card}
    submission.definitions = submission.definitions
      .filter((def) => def.checked)
      .map(({checked, idx, ...rest}) => rest);
    setSubmittedCard(await create(submission));
  }

  function handleChange(e) {
    if (e.target.name === 'deckId') {
      setCard({
        ...card,
        [e.target.name]: e.target.value,
        'deckName': '',
      })
    } else if (e.target.name === 'deckName') {
      setCard({
        ...card,
        [e.target.name]: e.target.value,
        'deckId': '',
      })
    } else {
      setCard({
        ...card,
        [e.target.name]: e.target.value
      })
    }
  }

  function makeDefChecklist() {
    function handleCheckbox(idx) {
      const newDefs = card.definitions.map(def => {
        if (def.idx === idx) {
          return { ...def, checked: !def.checked };
        }
        return def;
      });
      setCard({
        ...card,
        definitions: newDefs
      });
    }
    return (
      <fieldset>
        <legend><h6 style={{'fontSize': 'small'}}>Which definitions do you want to include?</h6></legend>
        {
          card.definitions.map((def, idx0) => (
            <Fragment key={`card-checkbox-${idx0 + 1}`}>
              {def.definition.length ?
              (<div
                className="form-check"
                style={{'display': 'flex', 'alignItems': 'flex-start'}}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={def.checked}
                  onChange={() => handleCheckbox(def.idx)}
                  style={{'marginRight': '10px'}}
                />
                <label
                  className="form-check-label"
                  style={{'width': '332px', 'hyphens': 'auto'}}
                >
                  {clipTags(def.definition)}
                </label>
              </div>)
              :
              ''}
            </Fragment>
          ))
        }
      </fieldset>
    );
  }

  function makeDeckView() {
    function makeCollapseButton(target, text, btnId) {
      const isActive = activeDeckInput === btnId ? true : false;
      function handleBtnClick(e) {
        const id = e.target.id;
        setActiveDeckInput(activeDeckInput === id ? null : id);
      }

      return (
        <button
          className={`btn btn-outline-dark ${isActive ? 'show' : 'hide'}`}
          id={btnId}
          type="button"
          onClick={(e) => handleBtnClick(e)}
        >
          {text}
        </button>
      )
    }

    function makeDeckRadio() {
      if (activeDeckInput !== 'add-btn') return;
      function handleRadio(e) {
      }
      return (
        <div>
        <fieldset>
        <legend><h6 style={{'fontSize': 'small'}}>{'Add this card to an existing deck:'}</h6></legend>
      {
        decks && decks.length ?
        decks.map((deck, idx0) => (
          <Fragment key={`deck-checkbox-${idx0 + 1}-${deck.id}`}>
            <div
              className="form-check"
              id={deck._id}
              style={{'display': 'flex', 'alignItems': 'flex-start'}}
            >
              <input
                className="form-check-input"
                type="radio"
                value={deck._id}
                checked={card.deckId === deck._id}
                onChange={handleChange}
                name="deckId"
                // checked={def.checked}
                // onChange={() => handleCheckbox(def.idx)}
                style={{'marginRight': '10px'}}
              />
              <label // decks need to be populated
                className="form-check-label"
                style={{'width': '332px'}}
              >
                {deck.name} {deck._id}
              </label>
            </div>
          </Fragment>
        ))
        :
        ''
      }
        </fieldset>
        </div>
      )
    }

    function makeDeckTextInput() {
      if (activeDeckInput !== 'create-btn') return;
      return (
        <div
          // style={{'display': 'flex', 'alignItems': 'flex-start'}}
        >
          {/* <label htmlFor="deck" style={{'flexShrink': '0', }}>
            Create a new deck and add this card to it:
          </label> */}
          <input
            name="deckName"
            type="text"
            className="form-control"
            placeholder="name the new deck"
            value={card.deckName}
            onChange={handleChange}
          />
        </div>
      )
    }

    return (
      <>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Buttons for toggling radio input and text input"
        >
          {makeCollapseButton('collapseRadio', 'Add to an existing deck', 'add-btn')}
          {makeCollapseButton('collapseTextInput', 'Create a new deck', 'create-btn')}
        </div>
        {makeDeckRadio()}
        {makeDeckTextInput()}
      </>
    )
  }

  return (
    submittedCard ?
    <div>
      <h1>Success</h1>
      <p>Created a card for "{submittedCard.title}" and added it to the deck "{submittedCard.deck.name}".</p>
    </div>
    :
    <div>
      <form onSubmit={e => e.preventDefault()}>
        {makeTitleInput()}
        <div style={{'display': 'flex', 'alignItems': 'center'}}>
          <h6 className="faded" style={{'fontSize': 'small'}}>
            {card.partOfSpeech.toLowerCase()}
            {card.language && card.language !== 'English' ? ' - ' + card.language : ''}
          </h6>
        </div>
        {makeDefChecklist()}
        {makeDeckView()}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Add to deck
        </button>
      </form>
    </div>
  );
}