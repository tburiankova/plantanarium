import { useState } from 'react';
import formatDate from '../../utils/formatDate';

function Accordion({ order }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="accordion__wrapper">
        <button className="accordion__label" onClick={() => setOpen(!open)}>
          {formatDate(order.createdAt)}
        </button>

        {open && (
          <>
            <div className="accordion__inner">
              <h2>Total: £ {order.total.toFixed(2)}</h2>
              {order.products.map((product) => (
                <ProductInfo
                  key={product._id}
                  order={order}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ProductInfo({ product }) {
  return (
    <>
      <div className="accordion__product__wrapper">
        <div className="accordion__product__img">
          <img src={product.product.mediaUrl} alt={product.product.name} />
        </div>
        <div className="accordion__product__info">
          <h2>{product.product.name}</h2>
          <p>
            {product.quantity}x £ {product.product.price.toFixed(2)}
          </p>
          <p>
            Subtotal £ {(product.quantity * product.product.price).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Accordion;
