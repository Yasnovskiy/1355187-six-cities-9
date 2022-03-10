import comments from '../../mock/comment';

import ReviewList from '../review-list/review-list';
import CommentForm from '../comment-form/comment-form';

function Reviews(): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      <CommentForm />
    </section>
  );
}

export default Reviews;
