import { useState } from "react";
import { useAddToCart } from "../../hooks/useAddToCart";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Rating from "./Rating";
import QuantitySelector from "./QuantitySelector";

const ProductDetail = ({ product }) => {
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  const inStock = product.stockQuantity > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail">
      <div className="gallery-wrapper">
        <ProductGallery images={product.images} />
      </div>

      <div>
        <ProductInfo
          category={inStock ? "In stock" : "Out of stock"}
          title={product.title}
          price={`$${product.price}`}
          rating={<Rating value={product.rating} />}
        />

        <ProductInfo
          sectionVariant="highlights"
          highlightsTitle="Key Highlights"
          highlights={[
            `• Available: ${product.stockQuantity} pcs`,
            `• Rating: ${product.rating} out of 5`,
            `• Added: ${new Date(product.createdAt).toLocaleDateString()}`,
          ]}
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
              max={Math.max(1, product.stockQuantity)}
            />
          }
        />

        <ProductInfo
          sectionVariant="button"
          buttonText="Add to Cart"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductDetail;