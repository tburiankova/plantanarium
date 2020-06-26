import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
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
            <Link href="/store">
              <a className={router.pathname === '/store' ? 'active-link' : ''}>
                Store
              </a>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <a className={router.pathname === '/cart' ? 'active-link' : ''}>
                Cart
              </a>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/create">
                  <a
                    className={
                      router.pathname === '/create' ? 'active-link' : ''
                    }
                  >
                    Create
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account">
                  <a
                    className={
                      router.pathname === '/account' ? 'active-link' : ''
                    }
                  >
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <a
                    className={
                      router.pathname === '/logout' ? 'active-link' : ''
                    }
                  >
                    Log Out
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a
                    className={
                      router.pathname === '/login' ? 'active-link' : ''
                    }
                  >
                    Log In
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a>
                    <button className="btn-main">Sign Up</button>
                  </a>
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
