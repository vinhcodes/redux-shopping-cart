import React from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";

export default function Navigation() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const cartItems = useSelector((state: RootState) => state.cart);

  console.log(cartItems);
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">Shopping-Cart</li>
        <div>
        <li className="nav-item">
          <span id="product-btn">All Products</span>
        </li>
        <li className="nav-item">
          <span id="cart-btn">
            <p>My Cart:</p>
            <p>{cartCount}</p>
          </span>
        </li>
        </div>
      </ul>
    </nav>
  );
}
