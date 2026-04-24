import search from '../../assets/search.svg';
import basket from '../../assets/basket.svg';
import open from '../../assets/open.svg';

const NavbarActions = ({ toggleMenu }) => {
  return (
    <div className="actions">
      <button className="icon-btn">
        <img src={search} alt="search" />
      </button>

      <a href="/cart" className="icon-btn">
        <img src={basket} alt="cart" />
      </a>

      <button className="icon-btn mobile-only" onClick={toggleMenu}>
        <img src={open} alt="menu" />
      </button>
    </div>
  );
};

export default NavbarActions;