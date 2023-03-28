import { clipTags } from '../services/helpers';

export default function Hexapla(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;

  function handleClick() {
    setLookupHistory([...lookupHistory, null]);
  }

  const lookupErr = props.mostRecent && props.mostRecent.wikt.response.error ?
    <div>
      <div className="action-heading">
        <h5>{props.mostRecent.wikt.response.title}</h5>
        <span onClick={() => handleClick()}>X</span>
      </div>
      <p>
        {props.mostRecent.wikt.response.detail}
      </p>
    </div> : null;
    
  const dictionary = props.mostRecent ? (lookupErr ?
    lookupErr
    : 
    <div id="hexapla" className="container-fluid">
      <div>
      <div className="action-heading">
        <h5>{props.mostRecent.term}</h5>
        <span onClick={() => handleClick()}>X</span>
      </div>
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
    ) : ''
  ;

  return (
    <>
     {dictionary} 
    </>
  )
}