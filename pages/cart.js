// components
import Navbar from '../components/_App/Navbar';
import CartItem from '../components/Cart/CartItem';

function Cart() {
  const user = false;
  return (
    <>
      <div className="container">
        <div className="container--inner">
          <Navbar />
          <div className="cart__heading">
            <h1>Your cart</h1>
            {user ? (
              <>
                <h2>No plants in your cart yet. Why don't you add some?</h2>
                <button className="btn-main">View Products</button>
              </>
            ) : (
              <>
                <h2>Sign in to add plants to your cart!</h2>
                <button className="btn-main">Sign In</button>
              </>
            )}
          </div>
          <div className="cart__container">
            <div className="cart__container--inner">
              <CartItem />
              <div className="cart__summary">
                <p>Total: £ 0.00</p>
                <button className="btn-submit">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
