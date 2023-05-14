import { Fragment, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { clipTags, isLast } from '../../services/helpers';
import { BTN_CLASSES } from '../../services/constants';
import { create } from '../../services/cards';

export default function CardForm(props) {
  const [user, setUser] = useOutletContext();
  const decks = user.decks;
  const [card, setCard] = useState(makeCard(props.entry));
  const [titleInput, setTitleInput] = useState(false);

  function makeCard(entry) {
    const newCard = structuredClone(entry);
    newCard.title = newCard.headword;
    delete newCard.headword;
    if (newCard.definitions) {
      const defs = newCard.definitions;
      for (let i = 0; i < defs.length; i++) {
        defs[i].checked = false;
        defs[i].idx = i;
      }
    }
    return newCard;
  }

  function handleTitleInput(e) {
    e.stopPropagation();
    if ((e.type === 'keydown' && e.keyCode === 13) ||
      e.type === 'click')
    setTitleInput(!titleInput);
  }

  function handleSubmit(e) {
    e.stopPropagation();
    const submission = {...card}
    submission.definitions = submission.definitions.filter((def) => def.checked);
    create(submission);
  }

  function handleChange(e) {
    console.log(card)
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }

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
    console.log(card)
  }

  return (<div>
    <form onSubmit={ e => e.preventDefault()}>
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
      <div style={{'display': 'flex', 'alignItems': 'center'}}>
      <h6 className="faded" style={{'fontSize': 'small'}}>
      {card.partOfSpeech.toLowerCase()}
      {card.language && card.language !== 'English' ? ' - ' + card.language : ''}
      
    </h6>
    </div>
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
                  style={{'width': '332px'}}
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
      <fieldset>
        <legend><h6 style={{'fontSize': 'small'}}>{'Which deck(s) would you like to add this card to?'}</h6></legend>
        {
          decks.length ?
          decks.map((deck, idx0) => (
            <Fragment key={`deck-checkbox-${idx0 + 1}-${deck.id}`}>
              <div
                className="form-check"
                id={deck._id}
                style={{'display': 'flex', 'alignItems': 'flex-start'}}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  // checked={def.checked}
                  // onChange={() => handleCheckbox(def.idx)}
                  style={{'marginRight': '10px'}}
                />
                <label
                  className="form-check-label"
                  style={{'width': '332px'}}
                >
                  {deck.name}
                </label>
              </div>
            </Fragment>
          ))
          :
          ''
        }
              <div
                className="form-check"
                style={{'display': 'flex', 'alignItems': 'flex-start'}}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  // checked={def.checked}
                  // onChange={() => handleCheckbox(def.idx)}
                  style={{'marginRight': '10px'}}
                />
                <label
                  className="form-check-label"
                  style={{'width': '332px'}}
                >
                  Other (please specify)
                  <input type="text" className="form-control" />
                </label>
              </div>
      </fieldset>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => handleSubmit(e)}
      >
        Add to deck
      </button>
    </form>

  </div>);
}