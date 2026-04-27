import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const FooterBrand = () => {
  return (
    <div>
      <Link to="/" className="footer-brand">
        <div className="footer-logo">
          <img
            src={logo}
            alt="logo"
          />
        </div>
        <span>PawsStore</span>
      </Link>

      <p className="footer-text">
        Your trusted source for premium pet supplies and accessories.
      </p>
    </div>
  );
};

export default FooterBrand;