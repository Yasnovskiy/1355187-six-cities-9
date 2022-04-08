import ReviewList from '../review-list/review-list';
import CommentForm from '../comment-form/comment-form';
import { useAppSelector } from '../../hooks';
import { Authorization } from '../../const';
import { getCommentsSelector } from '../../store/selectors/comments-selector';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';

function Reviews(): JSX.Element {
  const comments = useAppSelector(getCommentsSelector);
  const authorizationStatus = useAppSelector(getAuthorizationStatusSelector);

  const isAuthorisedUser = authorizationStatus === Authorization.Authorized;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default Reviews;
