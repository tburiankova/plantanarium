import axios from 'axios';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

// utility functions
import baseUrl from '../utils/baseUrl';
import { fadeInUp, stagger } from '../utils/animations';

// components
import ProductCard from '../components/Store/ProductCard';
import ProductPagination from '../components/Store/ProductPagination';

function Store({ products, totalPages }) {
  const router = useRouter();
  const currentPage = Number(router.query.page);

  return (
    <>
      <h1>Our Greens</h1>
      <motion.div className="store__container" variants={stagger}>
        {products.map((product) => (
          <motion.div key={product._id} variants={fadeInUp}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      {totalPages > 1 && (
        <ProductPagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

Store.getInitialProps = async (ctx) => {
  // implement pagination
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 8;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Store;
