import App from 'next/app';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import Router from 'next/router';
import { AnimatePresence } from 'framer-motion';

// utility functions
import baseUrl from '../utils/baseUrl';
import { redirectUser } from '../utils/auth';

// components
import LayoutMain from '../components/_App/LayoutMain';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = parseCookies(ctx);
    const token = cookies.token;

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRouter =
        ctx.pathname === '/account' || ctx.pathname === '/create';
      if (isProtectedRouter) {
        redirectUser(ctx, '/login');
      }
    } else {
      try {
        // provide a token on an authorization header
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const isRoot = user.role === 'root';
        const isAdmin = user.role === 'admin';
        // create page only availble for root and admins
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === '/create';
        if (isNotPermitted) {
          redirectUser(ctx, '/store');
        }
        // add all user data on page props
        pageProps.user = user;
      } catch (error) {
        console.error('Error getting current user', error);
        // throw out invalid token
        destroyCookie(ctx, 'token');
        // redirect to login page
        redirectUser(ctx, '/login');
      }
    }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  syncLogout = (e) => {
    if (e.key === 'logout') {
      Router.push('/login');
    }
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const Layout = Component.Layout || LayoutMain;

    return (
      <AnimatePresence exitBeforeEnter>
        <Layout {...pageProps} key={router.route}>
          <Component {...pageProps} router={router} />
        </Layout>
      </AnimatePresence>
    );
  }
}

export default MyApp;
