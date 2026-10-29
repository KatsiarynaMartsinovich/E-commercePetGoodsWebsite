import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/ProductPage/Breadcrumbs";
import ProductDetail from "../components/ProductPage/ProductDetail";
import PageStatus from "../components/common/PageStatus";
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
      return <PageStatus title="Loading product..." />;
    }

    if (notFound) {
      return (
        <PageStatus
          title="Product not found"
          text="The product you are looking for does not exist or was removed."
          showHomeLink
        />
      );
    }

    if (error) {
      return <PageStatus title="Something went wrong" text={error} showHomeLink />;
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