type RatingProps = {
  rating: number,
};

function getRatingStyle(rating: number) {
  return Math.round(rating) * 20;
}

function Rating({rating} : RatingProps): JSX.Element {

  return (
    <>
      <span style={{ width: `${getRatingStyle(rating)}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </>
  );
}

export default Rating;
