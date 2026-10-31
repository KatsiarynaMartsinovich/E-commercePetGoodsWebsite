import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className="nav">
      <Link to="/">Shop</Link>
      <Link to="/">Categories</Link>
      <Link to="/">Deals</Link>
      <Link to="/">About</Link>
    </nav>
  );
};

export default DesktopNav;