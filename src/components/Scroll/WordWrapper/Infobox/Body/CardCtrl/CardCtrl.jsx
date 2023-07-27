import { useState } from 'react';
import SuccessView from './SuccessView';
import Form from './Form/Form';

export default function AddView(props) {
  const activeDict = props.activeDict;
  const entry = props.entry;
  const scrollId = props.scrollId;
  const [submittedCard, setSubmittedCard] = useState(null);
  const wordId = props.wordId;

  return (
    submittedCard ?
    <SuccessView
      deckName={submittedCard.deck.name}
      title={submittedCard.title}
    />
    :
    <Form
      activeDict={activeDict}
      entry={entry}
      scrollId={scrollId}
      submittedCard={[submittedCard, setSubmittedCard]}
      wordId={wordId}
    />
  );
}