import { Link } from 'react-router-dom';
import { capitalize } from '../../../services/helpers';

export default function Item(props) {
  const isDropItem = props.isDropItem;
  const text = props.text;
  const url = props.url;

  return (
    <li className={isDropItem ? 'dropdown-item' : 'nav-item'}>
      <Link
        className={isDropItem ? 'dropdown-link' : 'nav-link'}
        to={'/' + (url ? url : text)}
      >
        {capitalize(text)}
      </Link>
    </li>
  )
}