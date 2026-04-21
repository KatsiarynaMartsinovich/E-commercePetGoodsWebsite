import NavbarBrand from "./NavbarBrand";
import DesktopNav from "./DesktopNav";
import NavbarActions from "./NavbarActions";
import "../../styles/App.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <NavbarBrand />
          <DesktopNav />
          <NavbarActions />
        </div>
      </div>
    </header>
  );
};

export default Header;