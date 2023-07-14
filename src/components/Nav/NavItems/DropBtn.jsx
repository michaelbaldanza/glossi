import { capitalize } from '../../../services/helpers';

export default function DropBtn(props) {
  const text = props.text;
  return (
    <button className="btn btn-link text-decoration-none dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {capitalize(text)}
    </button>
  )
}