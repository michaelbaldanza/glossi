import CardForm from './CardForm';
import Dictionary from './Dictionary/Dictionary';
import { refOrder } from '../../../../../services/dictionaries';

export default function Body(props) {
  const activeDict = props.activeDict;
  const [addView, setAddview] = props.addView;
  const decks = props.decks;
  const dictionaries = props.dictionaries;
  const dictProps = props.dictProps;

  function makeCardForm() {
    return (<CardForm
      activeDict={activeDict}
      scrollId={props.scrollId}
      entry={addView[0]}
      decks={decks}
      wordId={props.wordId}
    />);
  }

  function makeDictionaryPanels() {
    return refOrder.map((dictabbr, idx0) => (
      <div
        key={`${dictabbr}-${idx0}`}
        style={{'display': activeDict === dictionaries[dictabbr].name ? 'block' : 'none'}}
      >
        <Dictionary
          mostRecent={dictionaries[dictabbr]}
          {...dictProps}
        />
      </div>
    ));
  }
  
  return addView.length ? makeCardForm() : makeDictionaryPanels();
}