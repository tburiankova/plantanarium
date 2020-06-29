import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

// utils
import { container, fadeIn, fadeInUpDelayed } from '../utils/animations';

// components
import LayoutIndex from '../components/_App/LayoutIndex';

function Home() {
  return (
    <>
      <motion.div
        className="index__container"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div className="index__container--inner" variants={fadeIn}>
          <motion.div className="index__topbar" variants={fadeInUpDelayed}>
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
          </motion.div>
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
        </motion.div>
      </motion.div>
    </>
  );
}

Home.Layout = LayoutIndex;

export default Home;
