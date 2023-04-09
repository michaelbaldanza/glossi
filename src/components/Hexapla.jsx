import { clipTags } from '../services/helpers';

export default function Hexapla(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;

  function handleClick(e) {
    e.stopPropagation();
    setLookupHistory([...lookupHistory.slice(), null]);
  }
  
  function makeHeading(headingText) {
    return (
      <div className="action-heading">
          <h5>{headingText}</h5>
          <h5
            className="faded"
            onClick={(e) => handleClick(e)}
          >
            X
          </h5>
      </div>
    );
  }

  const lookupErr = props.mostRecent && props.mostRecent.wikt.response.error ?
    <div id="hexapla">
      {makeHeading(props.mostRecent.wikt.response.title)}
      <p>
        {props.mostRecent.wikt.response.detail}
      </p>
    </div> : null;
    
  const dictionary = props.mostRecent.wikt.response !== 'error' ? (lookupErr ?
    lookupErr
    : 
    <div id="hexapla" className="">
      <div>
      {makeHeading(props.mostRecent.term)}
      {
        props.mostRecent.wikt.response.en?.map((entry, idx0) => (
          <div key={`entry-${idx0}`}>
            {
              entry.definitions.map((sense, idx1) => (
                <div key={`sense-${idx0}-${idx1}`}>
                  {
                    clipTags(sense.definition)
                  }
                </div>
              ))
            }
          </div>
        ))
      }
      </div>
    </div>
    )
    :
    <div id="hexapla">
      <div>
        {makeHeading(props.mostRecent.term)}
      </div>
      {
        props.mostRecent.fd.response.map((entry, idx0) => (
          <div key={`entry-${idx0}`}>
            {
              entry.meanings.map((meaning, idx1) => (
                <div key={`meaning-${idx0}-${idx1}`}>
                  {
                    meaning.definitions.map((definition, idx2) => (
                      <div key={`definition-${idx0}-${idx1}-${idx2}`}>
                        {
                          definition.definition
                        }
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  ;

  return (
    <>
     {dictionary} 
    </>
  )
}