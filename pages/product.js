import { useState } from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';

// components
import Navbar from '../components/_App/Navbar';

function Product({ product }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const { _id } = product;

  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push('/store');
  }

  return (
    <>
      <div className="container">
        <div className="container--inner">
          <Navbar />
          <div className="product__wrapper">
            <div className="product__wrapper--left">
              <div className="product__heading">
                <h1>{product.name}</h1>
                <span>£ {product.price.toFixed(2)}</span>
              </div>
              <div className="product__img-wrapper">
                <img src={`${product.mediaUrl}`} alt={product.name} />
              </div>
            </div>
            <div className="product__wrapper--right">
              <p>{product.description}</p>
              <form>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value="1"
                  id="quantity"
                  min="1"
                  max="10"
                />
                <button className="btn-secondary">Add To Cart</button>
              </form>
            </div>
          </div>
          <button className="btn-delete" onClick={() => setModal(true)}>
            Delete Product
          </button>

          {modal && (
            <div className="product__modal">
              <div className="product__modal--inner">
                <p>Are you sure you want to delete this product?</p>
                <div className="product__modal__btns">
                  <button
                    className="btn-cancel"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-delete" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
