const ProductInfo = (props) => {
  if (props.sectionVariant === "description") {
    return (
      <div className="section">
        <h3>{props.descriptionTitle}</h3>
        <p>{props.description}</p>
      </div>
    );
  }

  if (props.sectionVariant === "quantity") {
    return (
      <div className="quantity-row">
        <span>{props.quantityLabel}</span>
        {props.quantitySelector}
      </div>
    );
  }

  if (props.sectionVariant === "button") {
    return (
      <button className="add-to-cart">
        {props.buttonText}
      </button>
    );
  }

  return (
    <div className="main-info">
      <span className="category">{props.category}</span>

      <h1>{props.title}</h1>

      {props.rating}

      <p className="price">{props.price}</p>
    </div>
  );
};

export default ProductInfo;