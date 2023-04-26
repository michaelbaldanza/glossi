import { Fragment } from 'react';
import BoxWord from './BoxWord';
import { clipTags, isLast } from '../../services/helpers';

export default function Entry(props) {
  const api = props.api.toLowerCase().replace(' ', '-');
  const entry = props.entry;
  const quarry = props.quarry;

  const partOfSpeech = entry.partOfSpeech ? <h6 className="faded" style={{'fontSize': 'small'}}>
      {entry.partOfSpeech.toLowerCase()}
      {props.lang === 'other' ? ' - ' + entry.language : ''}
    </h6>
    :
    ''
  ;
  const antonyms = entry.antonyms && entry.antonyms.length ? <div>
      <h6
        className="faded" style={{'fontSize': 'smaller'}}
      >
        antonyms
      </h6>
      <div>
        {
          entry.antonyms.map((antonym, idx0) => {
            return (
              <Fragment key={`${antonym}-${idx0}`}>
                <BoxWord
                  clickThroughHistory={props.clickThroughHistory}
                  wordId={`${antonym}-${idx0}`}
                  word={antonym}
                  handleRef={props.handleRef}
                />
                {
                  isLast(idx0, entry.antonyms) ?
                  ''
                  :
                  ', '
                } 
              </Fragment>
            )
          })
        }
      </div>
    </div>
    :''
  ;

  const synonyms = entry.synonyms && entry.synonyms.length ? <div>
    <h6
      className="faded" style={{'fontSize': 'smaller'}}
    >
      synonyms
    </h6>
    <div>
      {
        entry.synonyms.map((synonym, idx0) => (
          <Fragment key={`${synonym}-${idx0}`}>
            <BoxWord
              clickThroughHistory={props.clickThroughHistory}
              wordId={`${synonym}-${idx0}`}
              word={synonym}
            />
            {
              isLast(idx0, entry.synonyms) ?
              '' :
              ', '
            } 
          </Fragment>
        ))
        }
      </div>
    </div>
    :''
  ;

  return (
    <div
      key={`${api}-entry-${props.idx1}`}
      style={{
        'display': props.selLang === props.lang ? 'block' : 'none'
      }}
      className={`entry-container ${api}`}
    >
      {
        entry.headword && entry.headword !== quarry ?
        <h6 style={{'fontSize': 'small'}}>
          {entry.headword}
        </h6>
        : ''
      }
      {partOfSpeech}
      <ol>
        {
          entry.definitions.map((def, idx2) => {
            function makeLi(defOrDefinition) {
              return <li key={`sense-${props.idx1}-${idx2}`}>
              {
              defOrDefinition.split(' ').map((word, idx3) => (
                <Fragment key={`${word}-${idx2}-${idx3}`}>
                  <BoxWord
                      clickThroughHistory={props.clickThroughHistory}
                      wordId={`${word}-${idx2}-${idx3}`}
                      word={word}
                      handleRef={props.handleRef}
                  />
                  {' '}
                </Fragment>
              ))
            }
            </li>;
            }

            return (
              def.hasOwnProperty('definition') ?
              def.definition.length ? makeLi(clipTags(def.definition)) : ''
              :
              makeLi(def)
          )})
        }
      </ol>
      {synonyms}
      {antonyms}
    </div>
  );
}