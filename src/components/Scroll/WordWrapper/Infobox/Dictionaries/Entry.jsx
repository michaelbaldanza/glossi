import { Fragment } from 'react';
import { useOutletContext } from 'react-router-dom';
import Word from '../../Word';
import { breakLines, clipTags, isLast } from '../../../../../services/helpers';
import { BTN_CLASSES } from '../../../../../services/constants';

export default function Entry(props) {
  const [selLang, setSelLang] = props.selLang;
  const [user, setUser] = useOutletContext();
  const [addView, setAddView] = props.addView;
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const api = props.api.toLowerCase().replace(' ', '-');
  const entry = props.entry;
  const quarry = props.quarry;

  function makePartOfSpeechHeading() {
    if (!entry.partOfSpeech) return;
    function makeAddViewButton() {
      if (!user || props.abbr === 'mw' || props.abbr === 'odus') return;

      function handleClick(e) {
        e.stopPropagation();
        entry.headword = quarry;
        if (selLang) entry.languageCode = selLang;
        setAddView([entry])
      }

      return (
        <button
            className={BTN_CLASSES}
            onClick={(e) => handleClick(e)}
        >
          +
        </button>
      );
    }
    return (<div style={{'display': 'flex', 'alignItems': 'center'}}>
      <h6 className="faded" style={{'fontSize': 'small'}}>
      {entry.partOfSpeech.toLowerCase()}
      {props.lang === 'other' ? ' - ' + entry.language : ''}
      
    </h6>
    {makeAddViewButton()}
    </div>)
  }

  function makeSynsOrAnts(synsOrAnts) {
    if (!entry[synsOrAnts] || !entry[synsOrAnts].length) return;
    return <>
      <h6
        className="faded" style={{'fontSize': 'smaller'}}
      >
        {synsOrAnts}
      </h6>
      <div>
        {
          entry[synsOrAnts].map((synOrAnt, idx0) => {
            return (
              <Fragment key={`${synOrAnt}-${idx0}`}>
                <Word
                  currentIdx={[currentIdx, setCurrentIdx]}
                  clickThroughHistory={props.clickThroughHistory}
                  isBoxWord={true}
                  wordId={`${synOrAnt}-${idx0}`}
                  word={synOrAnt}
                  handleRef={props.handleRef}
                  selLang={[selLang, setSelLang]}
                />
                {
                  isLast(idx0, entry[synsOrAnts]) ?
                  ''
                  :
                  ', '
                } 
              </Fragment>
            )
          })
        }
      </div>
    </>
  }

  return (
    <div
      key={`${api}-entry-${props.idx1}`}
      style={{
        'display': props.lang ? selLang === props.lang ? 'block' : 'none' : 'block',
        'borderBottom': props.isLast ? '' : 'dashed grey 0.25px',
      }}
      className={`entry-container ${api}`}
    >
      {
        (entry.headword && entry.headword !== quarry) ?
        <h6>{entry.headword}</h6> : ''
      }
      {makePartOfSpeechHeading()}
      <ol>
        {
          entry.definitions.map((def, idx2) => {
            function makeLi(defOrDefinition) {
              return (<li key={`sense-${props.idx1}-${idx2}`}>
                {
                  breakLines(defOrDefinition).map((line, idx2p5) => (
                    line.split(' ').map((word, idx3) => (
                      <Fragment key={`${word}-${idx2}-${idx3}`}>
                        <Word
                          currentIdx={[currentIdx, setCurrentIdx]}
                          clickThroughHistory={props.clickThroughHistory}
                          isBoxWord={true}
                          wordId={`${word}-${idx2}-${idx3}`}
                          word={word}
                          handleRef={props.handleRef}
                          isQuarry={word === quarry ? true : false}
                          selLang={[selLang, setSelLang]}
                        />
                        {' '}
                      </Fragment>
                    ))
                  ))
                }
              </li>);
            }

            return (
              def.hasOwnProperty('definition') ?
              def.definition.length ? makeLi(clipTags(def.definition)) : ''
              :
              makeLi(def)
          )})
        }
      </ol>
      {makeSynsOrAnts('synonyms')}
      {makeSynsOrAnts('antonyms')}
    </div>
  );
}