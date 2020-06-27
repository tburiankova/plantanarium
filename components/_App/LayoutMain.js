import { useState, useEffect } from 'react';
import Head from 'next/head';
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
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        {/* Stylesheets */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/styles/styles.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>Plantanarium</title>
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
