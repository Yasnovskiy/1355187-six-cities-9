import { SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { errorHandle } from '../../services/error-handle';
import { sendCommentAction } from '../../store/api-actions';

const MIN_REVIEW_LENGTH = 50;
const MAX_STARS_RATING = 5;

function CommentForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isFormLocked, setIsFormLocked] = useState(false);

  const params = useParams();
  const ratingStars = [];

  for (let value = 1; value <= MAX_STARS_RATING; value++) {
    ratingStars.push(value);
  }

  const ratingStarsList = ratingStars.reverse().map((value) => <ReviewStart key={value} setRating={setRating} value={value} rating={rating} />);

  const reviewLenght: boolean = review.length >= MIN_REVIEW_LENGTH && rating !== 0;

  function cleanState() {
    setReview('');
    setRating(0);
    setIsFormLocked(false);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsFormLocked(true);
    if (params.id) {
      cleanState();
      dispatch(sendCommentAction( {
        rating: rating,
        comment: review,
      }, params.id, cleanState));
    } else {
      errorHandle({ error: new Error() });
    }
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {ratingStarsList}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" onChange={(evt) => setReview(evt.target.value)} value={review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" maxLength={300}></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!reviewLenght || isFormLocked}>Submit</button>
      </div>
    </form>
  );
}

type ReviewStartProps = {
  value: number,
  rating: number | null,
  setRating: (rating: number) => void,
}

const labelTitleArray: string[] = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

function ReviewStart({ value, rating, setRating}: ReviewStartProps): JSX.Element {

  return (
    <>
      <input className="form__rating-input visually-hidden" onChange={() => setRating(value)} name="rating" value={value} id={`${value}-stars`} type="radio" checked={value === rating} />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={labelTitleArray[value - 1]}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default CommentForm;
