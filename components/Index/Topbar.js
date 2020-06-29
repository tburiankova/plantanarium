import Link from 'next/link';
import { motion } from 'framer-motion';

// utils
import { fadeInUpDelayed } from '../../utils/animations';

function Topbar() {
  return (
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
  );
}

export default Topbar;
