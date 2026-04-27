import { Link } from "react-router-dom";
import nextIcon from "../../assets/next.svg";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>

      <img src={nextIcon} alt=">" className="breadcrumb-icon" />

      <Link to="/">{product.category}</Link>

      <img src={nextIcon} alt=">" className="breadcrumb-icon" />

      <span className="current">{product.name}</span>
    </div>
  );
};

export default Breadcrumbs;