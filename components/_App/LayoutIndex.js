import { useState, useEffect } from 'react';
import Head from 'next/head';

function LayoutIndex({ children }) {
  // enable outline on links and buttons when using the tab key (accessibility)
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    function handleFocus(e) {
      if (e.keyCode === 9) {
        setFocus(true);
      }
    }
    document.body.addEventListener('keyup', handleFocus);
    return () => document.body.removeEventListener('keyup', handleFocus);
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
      <div className={`${!focus ? 'no-focus-outline' : ''}`}>{children}</div>
    </>
  );
}

export default LayoutIndex;
