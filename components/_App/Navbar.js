import Link from 'next/link';

function Navbar() {
  return (
    <>
      <div className="topbar">
        <Link href="/">
          <a>
            <div className="logo logo-main">
              <span>Plant</span>anarium.
            </div>
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/cart">
              <a>Cart</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <button className="btn-main">Sign Up</button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
