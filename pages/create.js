import { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

// components
import Navbar from '../components/_App/Navbar';
import Loading from '../components/_App/Loading';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  image: '',
  description: '',
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [success, setSuccess] = useState(false);
  const [imagePrev, setImagePrev] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct((prev) => ({ ...prev, image: files[0] }));
      setImagePrev(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.image);
    data.append('upload_preset', 'plantanarium');
    data.append('cloud_name', 'drkyl8du9');
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/drkyl8du9/image/upload',
      data
    );
    const imageUrl = response.data.url;
    return imageUrl;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const imageUrl = await handleImageUpload();
      console.log({ imageUrl });
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, imageUrl };
      const response = await axios.post(url, payload);
      console.log({ response });
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="container--inner">
          <Navbar />
          <h1>Create a product</h1>
          <form className="form-main" onSubmit={handleSubmit}>
            {success && (
              <div className="form-message-success">
                <p>New product has been posted!</p>
              </div>
            )}
            {Boolean(error) && (
              <div className="form-message-error">
                <p>{error}</p>
              </div>
            )}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={product.name}
              onChange={handleChange}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min="0.00"
              step="0.01"
              name="price"
              id="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />
            <label>Image</label>
            <label htmlFor="image" className="custom-file-input">
              Select image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
            />
            <div className="img-prev">
              <img src={imagePrev} />
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              rows="10"
              value={product.description}
              onChange={handleChange}
            />
            {loading && <Loading />}
            <button
              type="submit"
              className="btn-submit"
              disabled={disabled || loading}
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
