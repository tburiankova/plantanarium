import Head from 'next/head';
import Navbar from './Navbar';

function Layout({ children, user }) {
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
      <div className="container">
        <div className="container--inner">
          <Navbar user={user} />
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
