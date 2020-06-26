function CartItem() {
  return (
    <>
      <div className="cart__item">
        <div className="cart__item__img"></div>
        <div className="cart__item__info">
          <h3>Product Name</h3>
          <p>1x £ 0.00</p>
        </div>
        <div className="cart__item__remove">
          <button className="btn-delete">Remove</button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
