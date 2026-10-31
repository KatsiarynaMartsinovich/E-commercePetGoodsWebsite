import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmptyCartCard from "../components/Cart/EmptyCartCard";
import CartContent from "../components/Cart/CartContent";
import PageStatus from "../components/common/PageStatus";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, loading } = useCart();

  const renderContent = () => {
    if (loading) return <PageStatus title="Loading your cart..." />;
    if (items.length === 0) return <EmptyCartCard />;
    return <CartContent />;
  };

  return (
    <>
      <Header />
      {renderContent()}
      <Footer />
    </>
  );
};

export default Cart;