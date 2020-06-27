import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { useRouter } from 'next/router';

// components
import ProductCard from '../components/Index/ProductCard';
import ProductPagination from '../components/Index/ProductPagination';

function Store({ products, totalPages }) {
  const router = useRouter();
  const currentPage = Number(router.query.page);

  return (
    <>
      <h1>Our Greens</h1>
      <div className="store__container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <ProductPagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

Store.getInitialProps = async (ctx) => {
  // console.log(ctx.query);
  // implement pagination
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 2;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

// Store.getInitialProps = async () => {
//   const url = `${baseUrl}/api/products`;

//   // fetch data on server
//   const response = await axios.get(url);
//   // return response data as an object
//   return { products: response.data };
// };

export default Store;
