import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// components
import CartItem from '../components/Cart/CartItem';

function Cart({ products, user }) {
  return (
    <>
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
    </>
  );
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { products: [] };
  }

  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);

  return { products: response.data };
};

export default Cart;
