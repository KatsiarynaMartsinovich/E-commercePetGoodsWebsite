import { useState } from "react";
import NavbarBrand from "./NavbarBrand";
import DesktopNav from "./DesktopNav";
import NavbarActions from "./NavbarActions";
import "../../styles/App.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <NavbarBrand />
          <DesktopNav />
          <NavbarActions toggleMenu={toggleMenu} />
        </div>

        {isOpen && (
          <div className="mobile-menu">
            <a href="/">Shop</a>
            <a href="/">Categories</a>
            <a href="/">Deals</a>
            <a href="/">About</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;