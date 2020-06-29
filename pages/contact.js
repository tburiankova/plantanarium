// components
import LayoutIndex from '../components/_App/LayoutIndex';

function Contact() {
  return (
    <>
      <h1>Can we help you with anything?</h1>
      <h2 style={{ marginBottom: '2.4rem' }}>Feel free to get in touch:</h2>
      <p>
        Mobile:{' '}
        <a href="tel:07911123456" className="link-basic">
          +44 7911 123456
        </a>
      </p>
      <p>
        Email:{' '}
        <a href="mailto:info@plantanarium.com" className="link-basic">
          info@plantanarium.com
        </a>
      </p>
      <h2 style={{ marginTop: '3.2rem' }}>
        We'd love to see you in person as well!
      </h2>

      <p>46 Boroughbridge Road</p>
      <p>Birmigham</p>
      <p>B2 5GR</p>
    </>
  );
}

Contact.Layout = LayoutIndex;

export default Contact;
