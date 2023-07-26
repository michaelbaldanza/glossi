import { isLast } from '../../../../services/helpers';
import { BTN_CLASSES } from '../../../../services/constants';

export default function Header(props) {
  const [addView, setAddView] = props.addView;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const quarry = props.quarry;

  function handleXClick(e) {
    e.stopPropagation();
    if (addView.length) return setAddView(addView.slice(0, 0));
    setLookupHistory([...lookupHistory.slice(), null]);
  }

  function canClick(val) {
    const canClick = (
      (
        val > 0 &&
        clickThroughHistory.length > 1 &&
        !isLast(currentIdx, clickThroughHistory))
      )
      ||
      (
        val < 0 &&
        currentIdx > 0
      ) ?
      true : false
    ;
    return canClick;
  }
  
  function makeArrow(val) {
    function handleArrowClick(e) {
      e.stopPropagation();
      const val = +e.target.value;
      if (!canClick(val)) return;
      setCurrentIdx(currentIdx + val);
    }

    if (addView.length) return;
    return <button
      type="button"
      id={val > 0 ? 'fwd-btn' : 'bwd-btn'}
      value={val}
      className={`${BTN_CLASSES} ${!canClick(val) ? 'faded' : ''}`}
      onClick={(e) => handleArrowClick(e)}
      style={!canClick(val) ? {'cursor': 'auto'} : {}}
    >
      {val > 0 ? '→' : '←'}
    </button>
  }

  const infoboxHeader = <div className="action-heading">
    <h5>
      {!addView.length ? quarry : 'Make a card'}
    </h5>
    <div style={{'display': 'flex'}}>
      {makeArrow(-1)}
      {makeArrow(1)}
      <button
        className={BTN_CLASSES}
        onClick={(e) => handleXClick(e)}
      >
        {!addView.length ? 'X' : '↩'}
      </button>
    </div>
  </div>;

  return infoboxHeader;
}