import { lexica, refOrder } from '../../../../services/dictionaries';

export default function Nav(props){
  const [activeDict, setActiveDict] = props.activeDict;
  const [addView, setAddView] = props.addView;
  const dictionaries = props.dictionaries;

  if (addView.length) return;

  function handleDictionaryClick(e) {
    e.stopPropagation();
    setActiveDict(e.target.innerText);
  }

  const buttons = refOrder.map((dictKey, idx0) => {
    if (dictKey === 'wikt' && dictionaries[dictKey].response.hasOwnProperty('1')) {
      return '';
    }
    return (
      dictionaries[dictKey] ?
        <button
          key={dictKey + '-' + idx0}
          className={`btn btn-link link-secondary toolbar-btn ${lexica[dictKey].name === activeDict ? 'active' : 'text-decoration-none'}`}
          data-bs-toggle={lexica[dictKey].name === activeDict ? 'button' : ''}
          aria-pressed={lexica[dictKey].name === activeDict ? 'true' : 'false'}
          onClick={(e) => handleDictionaryClick(e)}
          style={{'fontSize': 'small'}}
        >
          {lexica[dictKey].name}
        </button>
        :
        ''
    )
  });

  return (
    <div className="dictionary-bar">
      {buttons}
    </div>
  );
}