import { useParams } from "react-router-dom";
import products from "../data/products.json";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Breadcrumbs from "../components/ProductPage/Breadcrumbs";
import ProductDetail from "../components/ProductPage/ProductDetail";


const Product = () => {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />

      <div className="product-page">
        
        {/* верхняя полоска с хлебными крошками */}
        <div className="breadcrumbs-bar">
          <div className="content-container">
            <Breadcrumbs product={product} />
          </div>
        </div>

        {/* основной контент */}
        <div className="content-container main-content">
          <ProductDetail product={product} />
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Product;