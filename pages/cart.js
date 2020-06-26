import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { useRouter } from 'next/router';
import calculateCartTotal from '../utils/calculateCartTotal';
import cookie from 'js-cookie';

// components
import CartItem from '../components/Cart/CartItem';

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [isCarEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: { productId },
      headers: { Authorization: token },
    };
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  }

  return (
    <>
      <div className="cart__heading">
        <h1>Your cart</h1>
        {user ? (
          <>
            {products.length === 0 ? (
              <h2>No plants in your cart yet. Why don't you add some?</h2>
            ) : (
              <h2>Shop some more!</h2>
            )}
            <button className="btn-main" onClick={() => router.push('/store')}>
              View Products
            </button>
          </>
        ) : (
          <>
            <h2>Sign in to add plants to your cart!</h2>
            <button className="btn-main" onClick={() => router.push('/login')}>
              Sign In
            </button>
          </>
        )}
      </div>
      <div className="cart__container">
        <div className="cart__container--inner">
          {cartProducts.map((product) => (
            <CartItem
              key={product.product._id}
              product={product}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
          <div className="cart__summary">
            <p>Total: £ {cartAmount}</p>
            <button className="btn-submit" disabled={isCarEmpty}>
              Checkout
            </button>
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
