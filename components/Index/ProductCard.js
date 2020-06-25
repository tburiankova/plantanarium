import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <>
      <Link href={`/product?_id=${product._id}`}>
        <a>
          <div className="store__card">
            <div className="store__card__img-wrapper">
              <img src={`${product.mediaUrl}`} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
            <p>£ {product.price}</p>
          </div>
        </a>
      </Link>
    </>
  );
}

export default ProductCard;
