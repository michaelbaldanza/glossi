import { redirect } from 'react-router-dom';
import { deleteScroll, getScroll } from '../services/scrolls';
import { getUser } from '../services/users';

export async function action({ params }) {
  console.log(`hitting scrolldelete action`)
  const scroll = await getScroll(params.scrollId);
  console.log(scroll.createdBy._id)
  const user = await getUser();
  console.log(user._id)
  if (!user || user._id !== scroll.createdBy._id) {
    throw redirect(`/scrolls/${params.scrollId}`);
  }
  console.log(`user is the author. preparing to delete`)
  await deleteScroll(params.scrollId);
  console.log(`deleted. preparing to redirect`)
  return redirect('/');
}