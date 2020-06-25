import Link from 'next/link';

function Navbar() {
  const user = false;

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

          {user ? (
            <>
              <li>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <a>Log Out</a>
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
