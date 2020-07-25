import { useRouter } from 'next/router';

// components
import LayoutIndex from '../components/_App/LayoutIndex';

function Home() {
  const router = useRouter();
  return (
    <>
      <div className="index__cta">
        <h1>We Live Plants.</h1>
        <h2>And are here to help you make your life greener.</h2>
        <p>
          Visit our store and discover how to turn your home into an urban
          jungle. All our plants are carefully selected and absolutely
          Insta-friendly!
        </p>
        <button className="btn-main" onClick={() => router.push('/store')}>
          Shop Now
        </button>
      </div>
      <div className="index__address">
        <p>46 Boroughbridge Road, Birmigham, B2 5GR</p>
      </div>
    </>
  );
}

Home.Layout = LayoutIndex;

export default Home;
