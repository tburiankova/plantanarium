import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleLogout } from '../../utils/auth';

function Navbar({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

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

          {isRootOrAdmin && (
            <li>
              <Link href="/create">
                <a
                  className={router.pathname === '/create' ? 'active-link' : ''}
                >
                  Create
                </a>
              </Link>
            </li>
          )}

          {user ? (
            <>
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
              <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Log Out
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
