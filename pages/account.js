import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// components
import Accordion from '../components/Account/Accordion';

function Account({ user, orders }) {
  return (
    <>
      <div className="account__wrapper">
        <div className="account__heading">
          <h1>
            Hello there, <span className="account__name">{user.name}</span>!
          </h1>
          <h2>Your account details:</h2>
          <p>{user.email}</p>
          <p>{user.createdAt}</p>
        </div>
        <div className="account__orders">
          <h2>You order history</h2>
          {orders.length === 0 && <p>You haven't ordered anything yet!</p>}
          {orders.map((order) => (
            <Accordion key={order._id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

Account.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  // extra check (not necessarry as this is a protected route)
  if (!token) {
    return { orders: [] };
  }
  const url = `${baseUrl}/api/orders`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;
