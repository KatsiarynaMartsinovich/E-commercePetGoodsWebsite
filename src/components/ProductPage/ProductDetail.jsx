import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Rating from "./Rating";
import QuantitySelector from "./QuantitySelector";

import iconItem from "../../assets/info.svg";
import iconHeader from "../../assets/specifications.svg";

const ProductDetail = ({ product, id }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, id, quantity);

    showToast(
      `Added ${quantity} ${product.name} to cart`
    );
  };

  return (
    <div className="product-detail">
      <div className="gallery-wrapper">
        <ProductGallery image={product.image} />
      </div>

      <div>
        <ProductInfo
          category={product.category}
          title={product.name}
          price={`$${product.price}`}
          rating={<Rating value={product.rating} />}
        />

        <ProductInfo
          sectionVariant="highlights"
          highlightsTitle="Key Highlights"
          highlights={Object.entries(product.specifications)
            .slice(0, 3)
            .map(([key, value]) => `• ${key}: ${value}`)}
        />

        <ProductInfo
          sectionVariant="description"
          descriptionTitle="Description"
          description={product.description}
        />

        <ProductInfo
          sectionVariant="quantity"
          quantityLabel="Quantity:"
          quantitySelector={
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
            />
          }
        />

        <ProductInfo
          sectionVariant="button"
          buttonText="Add to Cart"
          onClick={handleAddToCart}
        />

        <div className="specs-modern">
          <div className="specs-header">
            <div className="specs-header-icon">
              <img src={iconHeader} alt="Icon" />
            </div>
            <h3>Technical Specifications</h3>
          </div>

          <div className="specs-grid-modern">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-card">
                <div className="spec-card-inner">
                  <div className="spec-icon">
                    <img src={iconItem} alt="Icon" />
                  </div>

                  <div className="spec-text">
                    <p className="spec-title">{key}</p>
                    <p className="spec-value">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;