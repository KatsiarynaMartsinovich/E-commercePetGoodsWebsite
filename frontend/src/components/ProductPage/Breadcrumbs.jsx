const Breadcrumbs = ({ product }) => {
  return (
    <div className="breadcrumbs">
      <a href="/">Home</a>
      <span> / </span>

      <a href="/">{product.category}</a>
      <span> / </span>

      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrumbs;