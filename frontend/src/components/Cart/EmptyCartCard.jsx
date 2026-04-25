import package_icon from '../../assets/package.svg';
import next from '../../assets/next_white.svg';

const PrimaryButton = () => {
  return (
    <a href="/" className="ecc-button">
      Start Shopping
      <img
        src={next}
        alt="Icon"
        className="ecc-button-icon"
      />
    </a>
  );
};

const EmptyCartCard = () => {
  return (
    <div className="ecc-card">
      <div className="ecc-icon-wrapper">
        <img
          src={package_icon}
          alt="Icon"
          className="ecc-icon"
        />
      </div>

      <h2 className="ecc-title">Your cart is empty</h2>

      <p className="ecc-text">
        Discover amazing products for your furry friends!
      </p>

      <PrimaryButton />
    </div>
  );
};

export default EmptyCartCard;