// we're not using our static products file since we imported it to mongodb
// import products from '../../static/products.json';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  //   console.log(req.method);
  // implement pagination
  const { page, size } = req.query;
  // convert querystring values to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);

  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }
  // const products = await Product.find();
  res.status(200).json({ products, totalPages });
};

// // import products from '../../static/products.json';
// import Product from '../../models/Product';
// import connectDb from '../../utils/connectDb';

// connectDb();

// export default async (req, res) => {
//   const products = await Product.find();
//   res.status(200).json(products);
// };
