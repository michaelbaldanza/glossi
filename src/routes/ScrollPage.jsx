import { Form, useLoaderData } from 'react-router-dom';
import { getScroll } from '../services/scrolls';
import Scroll from  '../components/Scroll';

export async function loader({ params }) {
  const scroll = await getScroll(params.scrollId);
  return scroll;
}

export default function ScrollPage() {
  const scroll = useLoaderData();

  return (
    <div className="outer-container" id="reader-container">
      <Form
        method="delete"
        action="delete"
        onSubmit={(event) => {
          if(!window.confirm('Please confirm you want to delete this scroll.')) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
      <Scroll scroll={scroll} />
    </div>
  )
}