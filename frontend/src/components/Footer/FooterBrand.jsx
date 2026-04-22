import logo from '../../assets/logo.svg';

const FooterBrand = () => {
  return (
    <div>
      <a href="/" className="footer-brand">
        <div className="footer-logo">
          <img
            src={logo}
            alt="logo"
          />
        </div>
        <span>PawsStore</span>
      </a>

      <p className="footer-text">
        Your trusted source for premium pet supplies and accessories.
      </p>
    </div>
  );
};

export default FooterBrand;