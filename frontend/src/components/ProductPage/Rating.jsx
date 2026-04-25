const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 !== 0;

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i}>★</span>
      ))}

      {hasHalf && <span>☆</span>}

      <span className="rating-text">
        {value} out of 5
      </span>
    </div>
  );
};

export default Rating;