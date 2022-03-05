import { Comments } from '../../types/reviews';

import ReviewItem from '../review-item/review-item';

function ReviewList(props: {comments: Comments}): JSX.Element {

  const { comments } = props;

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <ReviewItem key={comment.id} comment={comment}/>
      ))}
    </ul>
  );
}

export default ReviewList;
