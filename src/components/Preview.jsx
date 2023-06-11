import { Link, useOutletContext } from 'react-router-dom';

export default function Preview(props) {
  const [user, setUser] = useOutletContext();

  return (
    <Link to={props.link} className="link-dark text-decoration-none">
      <span className="scroll-preview-container" style={{'display': 'block'}}>
        <h5>{props.heading ? props.heading : 'untitled'}</h5>
        <div className="scroll-preview">
          {
            props.content ?
            props.content
            :
            ''
          }
        </div>
        <h6>
          <span className="faded">{props.creator}</span>
          &nbsp;
          <span className="faded">{props.updatedAt.slice(0,10)}</span>
        </h6>
      </span>
    </Link>
  );
}