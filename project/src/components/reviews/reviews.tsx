import ReviewList from '../review-list/review-list';
import CommentForm from '../comment-form/comment-form';
import { useAppSelector } from '../../hooks';
import { Authorization } from '../../const';
import { getCommentsSelector } from '../../store/selectors/comments-selector';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';
import { Comment } from '../../types/reviews';


function compare(a: Comment, b: Comment) {
  return b.date.localeCompare(a.date);
}

export function getCommentsForRendering(data: Comment[]) {
  const sortedComments = [...data].sort(compare);
  return sortedComments.slice(0, 10);
}

function Reviews(): JSX.Element {
  const comments = useAppSelector(getCommentsSelector);
  const authorizationStatus = useAppSelector(getAuthorizationStatusSelector);

  const commentsForRendering = getCommentsForRendering(comments);

  const isAuthorisedUser = authorizationStatus === Authorization.Authorized;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsForRendering.length}</span></h2>
      <ReviewList comments={commentsForRendering}/>
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default Reviews;
