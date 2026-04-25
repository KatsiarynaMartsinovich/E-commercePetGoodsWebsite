import star from "../../assets/star.svg";
import half_star from "../../assets/half_star.svg";
import empty_star from "../../assets/empty_star.svg";

const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <img key={"full-" + i} src={star} className="star star-large" alt="star" />
    );
  }

  if (hasHalf) {
    stars.push(
      <img key="half" src={half_star} className="star star-large" alt="half star" />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <img
        key={"empty-" + stars.length}
        src={empty_star}
        className="star star-large"
        alt="empty star"
      />
    );
  }

  return (
    <div className="rating">
      {stars}
      <span className="rating-text">{value} out of 5 stars</span>
    </div>
  );
};

export default Rating;