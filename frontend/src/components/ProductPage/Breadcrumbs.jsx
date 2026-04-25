import nextIcon from "../../assets/next.svg";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="breadcrumbs">
      <a href="/">Home</a>

      <img src={nextIcon} alt=">" className="breadcrumb-icon" />

      <a href="/">{product.category}</a>

      <img src={nextIcon} alt=">" className="breadcrumb-icon" />

      <span className="current">{product.name}</span>
    </div>
  );
};

export default Breadcrumbs;