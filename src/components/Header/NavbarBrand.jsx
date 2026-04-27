import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";
const NavbarBrand = () => {
  return (
    <Link to="/" href="/" className="brand">
      <div className="brand-logo">
        <img
          src={logo} 
          alt="logo"
        />
      </div>
      <span className="brand-text">PawsStore</span>
    </Link>
  );
};

export default NavbarBrand;