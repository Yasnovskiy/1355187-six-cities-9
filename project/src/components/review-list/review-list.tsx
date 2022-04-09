import { Comment } from '../../types/reviews';
import Rating from '../rating/rating';

function ReviewList(props: { comments: Comment[] }): JSX.Element {

  const { comments } = props;


  return (
    <ul className="reviews__list">
      {comments.map((commentIteam) => {

        const displayedDate = new Date(commentIteam.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

        return (
          <li className="reviews__item" key={commentIteam.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={commentIteam.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {commentIteam.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <Rating rating={commentIteam.rating} />
                </div>
              </div>
              <p className="reviews__text">
                {commentIteam.comment}
              </p>
              <time className="reviews__time" dateTime={commentIteam.date}>{displayedDate}</time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
