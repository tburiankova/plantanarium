import { useState, useEffect } from 'react';
import Head from 'next/head';

// components
import HeadContent from './HeadContent';
import Navbar from './Navbar';

function Layout({ children, user }) {
  // enable outline on links and buttons when using the tab key (accessibility)
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    function handleFocus(e) {
      if (e.keyCode === 9) {
        setFocus(true);
      }
    }
    window.addEventListener('keyup', handleFocus);
    return () => window.removeEventListener('keyup', handleFocus);
  }, []);

  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/styles/styles.css"
        />
        <title>Plantanarium || Store</title>
        <meta
          name="description"
          content="Shop for carefully selected pieces of home plants. We are here to help you turn your living space into a jungle, or just make your life a little bit greener."
        ></meta>
      </Head>
      <div className={`container ${!focus ? 'no-focus-outline' : ''}`}>
        <div className="container--inner">
          <Navbar user={user} />
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
