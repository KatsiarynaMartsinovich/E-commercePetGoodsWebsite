import basketIcon from "../../assets/white_basket.svg";

const ProductInfo = (props) => {
  if (props.sectionVariant === "highlights") {
    return (
      <div className="highlights">
        <h3 className="highlights-title">{props.highlightsTitle}</h3>

        <ul className="highlights-list">
          {(props.highlights || []).map((item, index) => (
            <li key={index} className="highlights-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
        <span className="quantity-title">{props.quantityLabel}</span>
        {props.quantitySelector}
      </div>
    );
  }

  if (props.sectionVariant === "button") {
    return (
      <button className="add-to-cart">
        <img src={basketIcon} alt="Корзина" />
        <span>{props.buttonText}</span>
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