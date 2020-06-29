import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import { AnimatePresence } from 'framer-motion';

// utility functions
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

// components
import Loading from '../components/_App/Loading';
import Modal from '../components/_App/Modal';

function Product({ product, user }) {
  const [modalDel, setModalDel] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

  const { _id } = product;

  useEffect(() => {
    let timeout;

    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);

  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push('/store');
  }

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, _id };
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="product__wrapper">
        <div className="product__wrapper--top">
          <div className="product__heading">
            <h1>{product.name}</h1>
            <p>£ {product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="product__wrapper--left">
          <div className="product__img-wrapper">
            <img src={`${product.mediaUrl}`} alt={product.name} />
          </div>
        </div>
        <div className="product__wrapper--right">
          <p>{product.description}</p>
          {loading && <Loading />}
          {success && (
            <>
              <p>
                <strong>Item added to cart!</strong>
              </p>
            </>
          )}
          <form>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="quantity"
              min="1"
              max="10"
            />
            <button
              className="btn-secondary"
              onClick={handleAddProductToCart}
              disabled={!user || loading}
            >
              {user ? <>Add to cart</> : <>Sign Up</>}
            </button>
          </form>
          <button
            className="btn-cancel product__btn-back"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>

      {isRootOrAdmin && (
        <button className="btn-delete" onClick={() => setModalDel(true)}>
          Delete Product
        </button>
      )}
      <AnimatePresence exitBeforeEnter>
        {modalDel && (
          <Modal modal={modalDel}>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal__btns">
              <button
                className="btn-cancel"
                onClick={() => setModalDel(!modalDel)}
              >
                Cancel
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

// ctx: {query}
Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
