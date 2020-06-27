import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// components
import ProductCard from '../components/Index/ProductCard';

function Store({ products }) {
  return (
    <>
      <h1>Our Greens</h1>
      <div className="store__container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

Store.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;

  // fetch data on server
  const response = await axios.get(url);
  // return response data as an object
  return { products: response.data };
};

export default Store;
