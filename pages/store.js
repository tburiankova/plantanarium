import { useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// components
import Navbar from '../components/_App/Navbar';
import ProductCard from '../components/Index/ProductCard';

function Store({ products }) {
  console.log(products);
  // useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts() {}

  return (
    <>
      <div className="container">
        <div className="container--inner">
          <Navbar />
          <h1>Our Greens</h1>
          <div className="store__container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
}

Store.getInitialProps = async () => {
  // fetch data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  // return response data as an object
  return { products: response.data };
};

export default Store;
