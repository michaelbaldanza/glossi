import { redirect } from 'react-router-dom';
import { deleteScroll } from '../../services/scrolls';

export async function action({ params }) {
  const scrollId = params.scrollId;
  await deleteScroll(scrollId);
  return redirect('/scrolls');
}