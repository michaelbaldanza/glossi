import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUserById } from '../../../../../../../../services/users';

export default function Radio(props) {
  const [user, setUser] = useOutletContext();
  const [card, setCard] = props.card;
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(user._id);
        setDecks(response.decks)
      } catch (error) {
        console.error('error', error);
      }
    }
    fetchUser();
  }, []);


  function handleChange(e) {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
      'deckName': '',
    });
  }

  return (
    <fieldset>
      <legend><h6 style={{'fontSize': 'small'}}>{'Add this card to an existing deck:'}</h6></legend>
      {
        decks && decks.length > 0 ?
        decks.map((deck, idx0) => {
          const key = 'radio-' + idx0;
          return (
            <div
              key={key}
              className="form-check"
              style={{'display': 'flex', 'alignItems': 'flex-start'}}
            >
              <input
                className="form-check-input"
                id={key}
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
                htmlFor={key}
              >
                {deck.name}
              </label>
            </div>
          )
        })
        :
        ''
      }
    </fieldset>
  )
}