import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleLogout } from '../../utils/auth';

function Navbar({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

  const [toggleMenu, setToggleMenu] = useState(false);

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

        <div className="nav-burger">
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <ul
          onClick={() => setToggleMenu(!toggleMenu)}
          style={{ display: `${toggleMenu ? 'flex' : ''}` }}
        >
          <li>
            <Link href="/store">
              <a
                className={router.pathname === '/[store]' ? 'link-active' : ''}
              >
                Store
              </a>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <a className={router.pathname === '/cart' ? 'link-active' : ''}>
                Cart
              </a>
            </Link>
          </li>

          {isRootOrAdmin && (
            <li>
              <Link href="/create">
                <a
                  className={router.pathname === '/create' ? 'link-active' : ''}
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
                      router.pathname === '/account' ? 'link-active' : ''
                    }
                  >
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <button className="nav-logout" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a
                    className={
                      router.pathname === '/login' ? 'link-active' : ''
                    }
                  >
                    Log In
                  </a>
                </Link>
              </li>
              <li>
                <button
                  className="btn-main"
                  onClick={() => router.push('/signup')}
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
