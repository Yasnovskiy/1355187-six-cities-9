import { useState } from 'react';

function ReviewsFormScreen(): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const ratingStars = [];

  for (let value = 1; value <= 5; value++) {
    ratingStars.push(value);
  }

  const ratingStarsList = ratingStars.reverse().map((value) => <ReviewStart key={value} setRating={setRating} value={value} rating={rating} />);

  const reviewLenght: boolean = review.length >= 50 && rating !== 0;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {ratingStarsList}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" onChange={(evt) => setReview(evt.target.value)} value={review} name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!reviewLenght}>Submit</button>
      </div>
    </form>
  );
}

type ReviewStartProps = {
  value: number,
  rating: number,
  setRating: (rating: number) => void,
}

const labelTitleArray: string[] = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

function ReviewStart({ value, rating, setRating }: ReviewStartProps): JSX.Element {

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

export default ReviewsFormScreen;
