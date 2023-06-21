import { Link, useNavigate } from 'react-router-dom';
import { BYLINE_ITEM } from '../services/constants';
import BylineBar from './BylineBar';

export default function Preview(props) {
  let navigate = useNavigate();

  function handleClick(e) {
    const target = e.target;
    if (target.matches('.' + BYLINE_ITEM)) return;
    navigate(props.link);
  }

  return (
      <div
        className="preview-container"
        onClick={(e) => handleClick(e)}
        style={{'display': 'block', 'cursor': 'pointer'}}
      >
        <h5>{props.heading ? props.heading : 'untitled'}</h5>
        <div className="scroll-preview">
          {
            props.content ?
            props.content
            :
            ''
          }
        </div>
        {/* <h6>
          <span className="faded">{props.createdBy}</span>
          &nbsp;
          <span className="faded">{props.updatedAt.slice(0,10)}</span>
        </h6> */}
        <BylineBar
          createdBy={props.createdBy}
          docId={props.docId}
          link={props.link}
          title={props.heading}
          updatedAt={props.updatedAt}
        />
      </div>
  );
}