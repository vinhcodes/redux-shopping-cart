import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store"; // Adjust the path to your store file
import { fetchProduct } from "./ProductSlice"; // Adjust the path to your slice file
import { addItem } from "../cart/CartSlice";

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Selectors to access state in the Redux store
  const products = useSelector((state: RootState) => state.product.items);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);

  // Optional: Trigger fetching products on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

  // Function to manually trigger product fetching
  const handleFetchProducts = () => {
    dispatch(fetchProduct());
  };

  // Render different UI based on status
  if (status === "loading")
    return (
      <div className="status-page">
        <p>Loading...</p>
      </div>
    );
  if (status === "failed")
    return (
      <div className="status-page">
        <p>Error: {error}</p>
      </div>
    );

  const handleClick = (id: number) => {
    const cartItem = products.find((item) => item.id === id);
    if (cartItem) {
      dispatch(addItem(cartItem));
    }
  };

  return (
    <section className="products-container">
      <div className="products-header primary-color">
        <h2 >Product List</h2>
        <button onClick={handleFetchProducts}>Fetch Products</button>
      </div>

      {products.length > 0 ? (
        <ul className="products-list">
          {products.map((product) => (
            <li className="product-card primary-color" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                style={{ height: "250px", width: "250px" }}
              />
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <button onClick={() => handleClick(product.id)}>
                  Add to cart
                </button>
              </div>

              <p className="product-price">Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
};

export default ProductList;
