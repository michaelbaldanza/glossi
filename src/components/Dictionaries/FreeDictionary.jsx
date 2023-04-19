import { Fragment } from 'react';
import { isLast } from '../../services/helpers';

export default function FreeDictionary(props) {
  const res = props.mostRecent.fd.response;
  if (res.title) {
    return (
      <div className="error-message">
        <div>{res.title}</div>
        <div>{res.message}</div>
        <div>{res.resolution}</div>
      </div>
    );
  }

  return(
    <>
      {
        res.map((entry, idx0) => (
          <div key={`entry-${idx0}`}>
            {
              entry.meanings.map((meaning, idx1) => (
                <div key={`meaning-${idx0}-${idx1}`}>
                  <ol>
                    {
                      meaning.definitions.map((definition, idx2) => (
                        <li key={`definition-${idx0}-${idx1}-${idx2}`}>
                          {definition.definition}
                          &nbsp;
                          <cite>{definition.example}</cite>
                        </li>
                      ))
                    }
                  </ol>
                  {
                    meaning.synonyms.length ?
                      <div>
                        <h6>Synonyms</h6>
                        <div>
                          {
                          meaning.synonyms.map((synonym, idx2) => (
                            <Fragment key={`${synonym}-${idx0}-${idx1}-${idx2}`}>
                              <span>{synonym}</span>
                              {
                                isLast(idx2, meaning.synonyms) ?
                                '' :
                                <span>,&nbsp;</span>
                              } 
                            </Fragment>
                          ))
                          }
                        </div>
                      </div>
                    :''
                  }
                  {
                    meaning.antonyms.length ?
                      <div>
                        <h6>Antonyms</h6>
                        <div>
                          {
                          meaning.antonyms.map((antonym, idx2) => (
                            <Fragment key={`${antonym}-${idx0}-${idx1}-${idx2}`}>
                              <span>{antonym}</span>
                              {
                                isLast(idx2, meaning.antonyms) ?
                                ''
                                :
                                <span>,&nbsp;</span>
                              } 
                            </Fragment>
                          ))
                          }
                        </div>
                      </div>
                    :''
                  }
                </div>
              ))
            }
          </div>
        )) 
      }
    </>
  )
}