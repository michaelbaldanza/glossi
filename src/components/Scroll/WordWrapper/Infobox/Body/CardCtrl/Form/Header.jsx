import { useState } from 'react';
import { BTN_CLASSES } from '../../../../../../../services/constants';

export default function Header(props) {
  const [card, setCard] = props.card;
  const title = props.title;
  const [titleInput, setTitleInput] = useState(false);

  function handleChange(e) {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }

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
          value={title}
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