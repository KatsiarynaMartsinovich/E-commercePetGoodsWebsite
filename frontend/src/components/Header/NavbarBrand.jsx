import logo from '../../assets/logo.svg';

const NavbarBrand = () => {
  return (
    <a href="/" className="brand">
      <div className="brand-logo">
        <img
          src={logo} 
          alt="logo"
        />
      </div>
      <span className="brand-text">PawsStore</span>
    </a>
  );
};

export default NavbarBrand;