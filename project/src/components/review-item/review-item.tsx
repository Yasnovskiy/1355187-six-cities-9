import { Comment } from '../../types/reviews';
import Rating from '../rating/rating';

function ReviewItem(props: { comment: Comment }): JSX.Element {

  const { date, rating, comment, user } = props.comment;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <Rating rating={rating} />
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>April 2019</time>
      </div>
    </li>
  );
}

export default ReviewItem;
