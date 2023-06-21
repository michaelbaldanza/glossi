import { redirect } from 'react-router-dom';
import { deleteScroll, get as getScroll } from '../../services/scrolls';
import { get as getUser } from '../../services/users';

export async function action({ params }) {
  const scrollId = params.scrollId;
  const scroll = await getScroll(scrollId);
  const user = await getUser();
  if (!user || user._id !== scroll.createdBy._id) {
    throw redirect(`/scrolls/${scrollId}`);
  }
  await deleteScroll(scrollId);
  return redirect('/');
}