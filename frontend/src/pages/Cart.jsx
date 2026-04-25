import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmptyCartCard from "../components/Cart/EmptyCartCard";

const Cart = () => {
  return (
    <>
      <Header />

      <div className="cart-page">
        <div className="cart-page__center">
          <EmptyCartCard />
        </div>
      </div>
    
      <Footer />
    </>
  );
};

export default Cart;