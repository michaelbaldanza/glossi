import { redirect } from 'react-router-dom';
import { deleteScroll } from '../services/scrolls';

export async function action({ params }) {
  console.log(`hitting scrollDeleteAction`);
  await deleteScroll(params.scrollId);
  console.log(`now it should redirect`)
  return redirect('/');
}