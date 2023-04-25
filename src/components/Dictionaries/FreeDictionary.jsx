import { Fragment } from 'react';
import { isLast } from '../../services/helpers';
import Entry from './Entry';

export default function FreeDictionary(props) {
  const fd = props.mostRecent;
  const res = fd.response;
  const api = fd.name;
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
        res.map((term, idx0) => (
          <div key={`term-${idx0}`}>
            {
              term.meanings.map((meaning, idx1) => (
                <Entry
                  key={`${api}-${idx1}`}
                  entry={meaning}
                  idx1={idx1}
                  api={api}
                  quarry={props.mostRecent.quarry}
                /> 
              ))
            }
          </div>
        )) 
      }
    </>
  )
}