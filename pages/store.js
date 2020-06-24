// components
import Navbar from '../components/_App/Navbar';
import ProductCard from '../components/Index/ProductCard';

function Store() {
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

export default Store;
