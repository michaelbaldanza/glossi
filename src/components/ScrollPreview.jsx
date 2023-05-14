import { Link, useOutletContext } from 'react-router-dom';

export default function ScrollPreview(props) {
  const [user, setUser] = useOutletContext();
  const scroll = props.scroll;

  return (
    <Link to={`/scrolls/${scroll._id}`} className="link-dark text-decoration-none">
      <span className="scroll-preview-container" style={{'display': 'block'}}>
        <h5>{scroll.title ? scroll.title : 'untitled'}</h5>
        <h6>
          <span className="faded">{scroll.createdBy.username}</span>
          &nbsp;
          <span className="faded">{scroll.updatedAt.slice(0,10)}</span>
        </h6>
        <span className="scroll-preview" style={{'display': 'block'}}>
          {
            scroll.body ?
              scroll.body.length >= 71 ?
              scroll.body.slice(0,70) + '...'
              :
              scroll.body
            :
            ''
          }
        </span>
      </span>
    </Link>
  );
}