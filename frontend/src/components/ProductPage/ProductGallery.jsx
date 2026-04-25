const ProductGallery = ({ image }) => {
  return (
    <div className="product-gallery">
      <div className="image-wrapper">
        <img src={image} alt="product" />
      </div>
    </div>
  );
};

export default ProductGallery;