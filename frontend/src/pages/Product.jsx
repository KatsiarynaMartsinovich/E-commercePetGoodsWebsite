import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/ProductPage/Breadcrumbs";
import ProductDetail from "../components/ProductPage/ProductDetail";
import ProductStatus from "../components/ProductPage/ProductStatus";
import RelatedProducts from "../components/ProductPage/RelatedProducts";
import { useProduct } from "../hooks/useProduct";

const Product = () => {
  const { id } = useParams();
  const { product, loading, notFound, error } = useProduct(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return <ProductStatus title="Loading product..." />;
    }

    if (notFound) {
      return (
        <ProductStatus
          title="Product not found"
          text="The product you are looking for does not exist or was removed."
          showHomeLink
        />
      );
    }

    if (error) {
      return <ProductStatus title="Something went wrong" text={error} showHomeLink />;
    }

    return (
      <>
        <div className="breadcrumbs-bar">
          <div className="content-container">
            <Breadcrumbs product={product} />
          </div>
        </div>

        <div className="content-container main-content">
          <ProductDetail key={product.id} product={product} />
          <RelatedProducts currentProduct={product} />
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="product-page">{renderContent()}</div>
      <Footer />
    </>
  );
};

export default Product;