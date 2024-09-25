import React from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import FilterBySearchTerm from "../features/filter/FilterBySearchTerm"
export default function Navigation() {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <nav>
      <ul className="nav-list">
        <li className="">Shopping-Cart</li>
        <FilterBySearchTerm />
        <div>
          <li className="nav-item">
            <Link to={"/"}>
              <span id="product-btn">All Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/my-cart"}>
              <span id="cart-btn">
                <p>My Cart:</p>
                <p id="cart-count">{cartCount}</p>
              </span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
