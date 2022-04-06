import ReviewList from '../review-list/review-list';
import CommentForm from '../comment-form/comment-form';
import { useAppSelector } from '../../hooks';
import { ReducersName } from '../../const';

function Reviews(): JSX.Element {
  const {comments, authorizationStatus} = useAppSelector((state) => ({
    comments: state[ReducersName.comments],
    authorizationStatus: state[ReducersName.auth],
  }));
  const isAuthorisedUser = authorizationStatus === 'authorized';

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default Reviews;
