import Link from 'next/link';

function Home() {
  return (
    <>
      <div className="index__background">
        <div className="index__container">
          <div className="index__container--inner">
            <div className="index__topbar">
              <Link href="/">
                <a>
                  <div className="index__logo logo-main">
                    <span>Plant</span>anarium.
                  </div>
                </a>
              </Link>
              <ul>
                <li>
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/store">
                    <a>Store</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="index__cta">
              <h1>We Live Plants.</h1>
              <h2>And are here to help you get more green in your life.</h2>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
