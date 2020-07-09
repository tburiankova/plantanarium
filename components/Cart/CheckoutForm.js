import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import Router from 'next/router';
import { AnimatePresence } from 'framer-motion';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// util functions
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';

// components
import Loading from '../_App/Loading';
import Modal from '../_App/Modal';

const INITIAL_BILLING = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
};

function CheckoutForm({ cartAmount, stripeAmount }) {
  const [billing, setBilling] = useState(INITIAL_BILLING);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isComplete = Object.values(billing).every((el) => Boolean(el));
    isComplete ? setDisabled(false) : setDisabled(true);
  }, [billing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  }

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        address: {
          city: billing.city,
          line1: billing.address,
          postal_code: billing.postalCode,
        },
        email: billing.email,
        name: billing.name,
      },
    });

    if (!error) {
      const { id, billing_details } = paymentMethod;
      try {
        setLoading(true);
        const url = `${baseUrl}/api/charge`;
        const token = cookie.get('token');
        const payload = { id, amount: stripeAmount, billing_details };
        const headers = { headers: { Authorization: token } };
        const response = await axios.post(url, payload, headers);
        setMessage(response.data);
        setModal(true);
      } catch (error) {
        // error.response.data
        catchErrors(error, showMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  // show stripe-specific error message
  function showMessage(errorMsg) {
    setMessage(errorMsg);
    setModal(true);
  }

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <Modal>
            <p>{message}</p>
            <div className="modal__btns">
              <button
                className="btn-cancel"
                onClick={() => {
                  setModal(!modal);
                  Router.reload();
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <form className="form-order" onSubmit={handleSubmit}>
        <h2>Complete your order</h2>
        <h3>Billing information</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={billing.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={billing.email}
          onChange={handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={billing.address}
          onChange={handleChange}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={billing.city}
          onChange={handleChange}
        />
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          placeholder="Postal Code"
          value={billing.postalCode}
          onChange={handleChange}
        />
        <h3 style={{ marginTop: '3.2rem' }}>Card Payment</h3>
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />
        {loading && <Loading />}
        <button
          type="submit"
          className="btn-submit"
          disabled={disabled || !stripe}
        >
          Pay £ {cartAmount}
        </button>
      </form>
    </>
  );
}

export default CheckoutForm;
