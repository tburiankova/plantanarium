import { useState, useEffect } from 'react';
import Head from 'next/head';

// components
import HeadContent from './HeadContent';

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
        {/* Stylesheets */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/styles/styles.css"
        />
        <HeadContent />
        <title>Plantanarium || Get More Greens In Your Life</title>
        <meta
          name="description"
          content="Welcome to Plantanarium, your number 1 online store for Insta-friendly home plants. Shop for carefully selected pieces of home plants. We are here to help you turn your living space into a jungle, or just make your life a little bit greener."
        ></meta>
      </Head>
      <div className={`${!focus ? 'no-focus-outline' : ''}`}>{children}</div>
    </>
  );
}

export default LayoutIndex;
