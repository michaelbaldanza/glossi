import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getScroll } from '../services/scrolls';
import Scroll from  '../components/Scroll';

export async function loader({ params }) {
  const scroll = await getScroll(params.scrollId);
  return scroll;
}

export default function ScrollPage(props) {
  const scroll = useLoaderData();

  useEffect(() => {
    document.title = props.title + (scroll.title ? scroll.title : 'untitled scroll');
  }, []);

  return (
    <div className="outer-container" id="reader-container">
      <Scroll scroll={scroll} />
    </div>
  )
}