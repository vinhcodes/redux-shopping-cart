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
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="cart-total card">
      <p>Subtotal ({totalQuantity}) items: </p>
      <p id="item-price">$ {parseFloat(`${totalPrice}`).toFixed(2)}</p>
      </div>
    </section>
  );
};

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch: AppDispatch = useDispatch();
  const { name, price, quantity, image, id } = item;
  const [isFading, setIsFading] = React.useState(false);

  const handleDelete = (id: string) => {
    setIsFading(true); // Trigger fade-out
    setTimeout(() => {
      dispatch(deleteItem({ id })); // Delete item after animation
    }, 500); // Matches the duration of the fade-out animation
  };

  const handleQuantityChange = (newQuantity: number) => {
    const quantity = newQuantity;
    dispatch(updateQuantity({ name, quantity, price }));
  };
  return (
    <li className={`cart-item card ${isFading ? 'fade-out' : ''}`}> 
      <div className="item-image">
        <img src={image[0]} height={120} width={100}/>
      </div>
      <div className="item-details">
      <div className="item-header">
        <p>{name}</p>
      </div>
      <div className="item-content">
        <div className="item-price">
          <p>$ {price}</p>
        </div>
        <div className="item-options">
          <QuantityDropdown
            initialQuantity={quantity}
            maxQuantity={100}
            onQuantityChange={handleQuantityChange}
          />
          <div className="btn-container">
          <button className="btn-outline" onClick={() => handleDelete(id)}>Remove item</button>
          </div>
        </div>
        </div>
      </div>
    </li>
  );
};

export default CartList;
