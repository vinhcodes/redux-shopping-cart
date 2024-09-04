import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { CartItem as CartItemType } from "../../model/cart";
import QuantityDropdown from "../../components/QuantityDropdown";
import { deleteItem, updateQuantity } from "./CartSlice";

const CartList: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  if (cartItems.length === 0)
    return (
      <div className="status-page">
        <p>Your cart its empty</p>
      </div>
    );

  return (
    <section id="cart">
      <ul className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.item_id} item={item} />
        ))}
      </ul>
      <div className="cart-total primary-color">
      <p>Subtotal ({totalQuantity}) items: </p>
      <p id="item-price">{parseFloat(`${totalPrice}`).toFixed(2)}</p>
      </div>
    </section>
  );
};

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch: AppDispatch = useDispatch();
  const { name, price, quantity, image, item_id } = item;

  const handleDelete = (item_id: string) => {
    dispatch(deleteItem({ item_id }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    console.log(`this is new quanity ${newQuantity} of ${name}`);
    const quantity = newQuantity;
    dispatch(updateQuantity({ name, quantity, price }));
  };
  return (
    <li className="cart-item primary-color">
      <div className="item-image">
        <img src={image} height={120} width={100}/>
      </div>
      <div className="item-details">
      <div className="item-header">
        <p>{name}</p>
      </div>
      <div className="item-content">
        <div className="item-price">
          <p>{price}</p>
        </div>
        <div className="item-options">
          <QuantityDropdown
            initialQuantity={quantity}
            maxQuantity={100}
            onQuantityChange={handleQuantityChange}
          />
          <button className="btn-outline" onClick={() => handleDelete(item_id)}>Remove item</button>
        </div>
        </div>
      </div>
    </li>
  );
};

export default CartList;
