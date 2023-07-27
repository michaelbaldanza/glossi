import { useState } from 'react';
import Btn from './Btn';
import Radio from './Radio';
import TextInput from './TextInput';


export default function DeckCtrl(props) {
  const [activeDeckInput, setActiveDeckInput] = useState(null);
  const [newDeckName, setNewDeckName] = useState('');
  const [card, setCard] = props.card;

  function makeTextInput() {
    if (activeDeckInput !== 'create-btn') return;
    return (
      <TextInput
        card={[card, setCard]}
        newDeckName={[newDeckName, setNewDeckName]}
        handleChange={props.handleChange}
      />
    );
  }

  function makeRadio() {
    if (activeDeckInput !== 'add-btn') return;
    return (
      <Radio
        card={[card, setCard]}
        decks={props.decks}
      />
    );
  }

  return (
    <>
      <div
        className="btn-group btn-group-sm"
        role="group"
        aria-label="Buttons for toggling radio input and text input"
      >
        <Btn
          text={'Add to an existing deck'}
          id={'add-btn'}
          activeDeckInput={[activeDeckInput, setActiveDeckInput]}
        />
        <Btn
          text={'Create a new deck'}
          id={'create-btn'}
          activeDeckInput={[activeDeckInput, setActiveDeckInput]}
        />
      </div>
      {makeRadio()}
      {makeTextInput()}
    </>
  )
};