import { Fragment, useState } from 'react';
import Header from './Header';
import View from './DeckCtrl/View';
import Checklist from './Checklist';
import { clipTags } from '../../../../../../../services/helpers';
import { create } from '../../../../../../../services/cards';

export default function Form(props) {
  const activeDict = props.activeDict;
  const entry = props.entry;
  const scrollId = props.scrollId;
  const wordId = props.wordId;
  const [card, setCard] = useState(makeCardState(entry));

  
  const [submittedCard, setSubmittedCard] = props.submittedCard;


  function makeCardState(entry) {
    const newCard = structuredClone(entry);
    newCard.title = newCard.headword;
    newCard.citation = {
      scroll: scrollId,
      location: wordId,
    };
    if (activeDict === 'Free Dictionary') newCard.languageCode = 'en'
    delete newCard.headword;
    if (newCard.definitions) {
      const defs = newCard.definitions;
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i];
        def.checked = false;
        def.idx = i;
        def.definition = clipTags(def.definition)
        def.source = { name: activeDict, userSubmitted: false };
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

  async function handleSubmit(e) {
    e.stopPropagation();
    const submission = {...card}
    submission.definitions = submission.definitions
      .filter((def) => def.checked)
      .map(({checked, idx, ...rest}) => rest);
    setSubmittedCard(await create(submission));
  }

    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
        <Header
          card={[card, setCard]}
          title={card.title}
        />
        <div style={{'display': 'flex', 'alignItems': 'center'}}>
          <h6 className="faded" style={{'fontSize': 'small'}}>
            {card.partOfSpeech.toLowerCase()}
            {card.language && card.language !== 'English' ? ' - ' + card.language : ''}
          </h6>
        </div>
        <Checklist 
          card={[card, setCard]}
        />
        <View
          card={[card, setCard]}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Add to deck
        </button>
      </form>
    </div>
    )
};