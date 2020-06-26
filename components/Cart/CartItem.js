import Link from 'next/link';

function CartItem({ product, handleRemoveFromCart }) {
  const { name, price, mediaUrl, _id } = product.product;
  const { quantity } = product;

  return (
    <>
      <div className="cart__item">
        <div className="cart__item__img">
          <img src={mediaUrl} alt={name} />
        </div>
        <div className="cart__item__info">
          <Link href={`/product?_id=${_id}`}>
            <a>
              <h3>{name}</h3>
            </a>
          </Link>
          <p>
            {quantity}x £ {price.toFixed(2)}
          </p>
        </div>
        <div className="cart__item__remove">
          <button
            className="btn-delete"
            onClick={() => handleRemoveFromCart(_id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
