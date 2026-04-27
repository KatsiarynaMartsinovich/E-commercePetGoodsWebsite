import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmptyCartCard from "../components/Cart/EmptyCartCard";
import CartContent from "../components/Cart/CartContent";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart } = useCart();

  return (
    <>
      <Header />
      {cart.length === 0 ? <EmptyCartCard /> : <CartContent />}
      <Footer />
    </>
  );
};

export default Cart;