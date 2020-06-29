import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { AnimatePresence } from 'framer-motion';

// util functions
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import calculateCartTotal from '../utils/calculateCartTotal';

// components
import CartItem from '../components/Cart/CartItem';
import Loading from '../components/_App/Loading';
import Modal from '../components/_App/Modal';

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(cartProducts);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(cartProducts.length === 0);
  }, [cartProducts]);

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

  async function handleCheckout(paymentData) {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get('token');
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
      setModalSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="cart__heading">
        <h1>Your cart</h1>
        {user ? (
          <>
            {cartProducts.length === 0 ? (
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
          <AnimatePresence exitBeforeEnter>
            {modalSuccess && (
              <Modal modal={modalSuccess}>
                <p>Payment successful!</p>
                <p>Thank you for your order!</p>
                <div className="modal__btns">
                  <button
                    className="btn-cancel"
                    onClick={() => setModalSuccess(!modalSuccess)}
                  >
                    Close
                  </button>
                </div>
              </Modal>
            )}
          </AnimatePresence>
          {cartProducts.map((product) => (
            <CartItem
              key={product.product._id}
              product={product}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
          <div className="cart__summary">
            <p>Total: £ {cartAmount}</p>
            {loading && <Loading />}
            <StripeCheckout
              name="Plantanarium"
              amount={stripeAmount}
              image={
                cartProducts.length > 0 ? cartProducts[0].product.mediaUrl : ''
              }
              currency="GBP"
              shippingAddress={true}
              billingAddress={true}
              zipCode={true}
              stripeKey="pk_test_51GybqSH9ONxUVGpodX6v5V9UcWecyTohsVhgjVvBFeTQPahvsnc0qnAv3LzLJX7Wtwlw3TGwabJcCueMz3Q0Nhac00iGH26kEN"
              token={handleCheckout}
              triggerEvent="onClick"
            >
              <button className="btn-submit" disabled={isCartEmpty || success}>
                Checkout
              </button>
            </StripeCheckout>
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
