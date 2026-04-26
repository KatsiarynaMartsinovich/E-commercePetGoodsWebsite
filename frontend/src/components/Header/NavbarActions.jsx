import { useCart } from "../../context/CartContext";

import search from '../../assets/search.svg';
import basket from '../../assets/basket.svg';
import open from '../../assets/open.svg';

const NavbarActions = ({ toggleMenu }) => {
  const { totalCount } = useCart();

  return (
    <div className="actions">
      <button className="icon-btn">
        <img src={search} alt="search" />
      </button>

      <a href="/cart" className="icon-btn cart-btn">
        <img src={basket} alt="cart" />

        {totalCount > 0 && (
          <span className="cart-badge">
            {totalCount}
          </span>
        )}
      </a>

      <button className="icon-btn mobile-only" onClick={toggleMenu}>
        <img src={open} alt="menu" />
      </button>
    </div>
  );
};

export default NavbarActions;