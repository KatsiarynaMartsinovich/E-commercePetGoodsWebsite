import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Rating from "./Rating";
import QuantitySelector from "./QuantitySelector";

const ProductDetail = ({ product }) => {
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
          sectionVariant="description"
          descriptionTitle="Description"
          description={product.description}
        />

        <ProductInfo
          sectionVariant="quantity"
          quantityLabel="Quantity:"
          quantitySelector={<QuantitySelector />}
        />

        <ProductInfo
          sectionVariant="button"
          buttonText="Add to Cart"
        />

        <div className="specs">
          <h3>Technical Specifications</h3>

          <div className="specs-grid">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <p className="spec-title">{key}</p>
                <p className="spec-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;