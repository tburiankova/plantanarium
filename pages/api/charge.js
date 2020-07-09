import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import calculateCartTotal from '../../utils/calculateCartTotal';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { id, amount, billing_details } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // find cart based on users' id and populate it to get all cart data
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });
    // calculate cart totals again from cart products (extra security)
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
    // get email from payment data, see if email is linked with previous customer
    const previousCustomer = await stripe.customers.list({
      email: billing_details.email,
      limit: 1,
    });
    const isExistingCustomer = previousCustomer.data.length > 0;
    // if not - create
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: billing_details.email,
      });
    }
    const customer =
      (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'GBP',
      payment_method: id,
      confirm: true,
      customer,
    });

    // add order data to db
    await new Order({
      user: userId,
      email: billing_details.email,
      total: cartTotal,
      products: cart.products,
    }).save();
    // clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });

    return res
      .status(200)
      .send('We have received your order and payment! Thank you!');
  } catch (err) {
    console.log(err.raw.message);
    res.status(400).send(err.raw.message);
  }
};
