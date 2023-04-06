import { useLoaderData } from 'react-router-dom';
import { getScroll } from '../services/scrolls';

export async function loader({ params }) {
  const scroll = await getScroll(params.scrollId);
  return scroll;
}

export default function Scroll() {
  const scroll = useLoaderData();

  return (
    <div>
      <h3>{scroll.title ? scroll.title : 'untitled'}</h3>
      <div>
        {scroll.body}
      </div>
    </div>
  )
}