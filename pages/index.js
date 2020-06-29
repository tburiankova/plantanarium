import Link from 'next/link';

// components
import LayoutIndex from '../components/_App/LayoutIndex';

function Home() {
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

        <Link href="/store">
          <a>
            <button className="btn-main">Shop Now</button>
          </a>
        </Link>
      </div>
      <div className="index__address">
        <p>46 Boroughbridge Road, Birmigham, B2 5GR</p>
      </div>
    </>
  );
}

Home.Layout = LayoutIndex;

export default Home;
