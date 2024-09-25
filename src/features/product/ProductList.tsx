import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchProduct } from "./ProductSlice";
import { addItem } from "../cart/CartSlice";
import { useToast } from "../../provider/ToastProvider";
import { Link } from "react-router-dom";
import FilterList from "../filter/FilterList";
import { selectFilteredProducts } from "./ProductSelectors";
import { selectLoading } from "../filter/FilterSelectors";

const ProductList: React.FC = () => {
  const [loading, setLoading] = React.useState(false)

  const dispatch: AppDispatch = useDispatch();

  // Selectors to access state in the Redux store
  const products = useSelector((state: RootState) => state.product.items);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);
  const filterState = useSelector((state: RootState) => state.filter)



  const filteredProducts = useSelector(selectFilteredProducts);

  const { addToast } = useToast();

  // Optional: Trigger fetching products on component mount
  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());     
 }
  }, [status, dispatch]);

  React.useEffect(() => {
    setLoading(true)

    setTimeout(() => setLoading(false), 1000)
  }, [filterState])

  const handleFetchProducts = () => {
    dispatch(fetchProduct());
  };

  if (status === "loading" || loading)
    return (
      <div className="status-page">
        <div className="loader"></div>
      </div>
    );
  if (status === "failed")
    return (
      <div className="status-page">
        <p>{error}. Please try again, later.</p>
      </div>
    );

  const handleClick = (id: string) => {
    const cartItem = products.find((item) => item.id === id);
    if (cartItem) {
      dispatch(addItem(cartItem));
    }
    addToast(`${cartItem?.name} added to your cart!`, "success");
  };

  return (
    <>
      <section className="products-container">
        <div className="products-header card">
          <h2>Product List</h2>
          <div className="btn-container">
          <button className="btn-primary" onClick={handleFetchProducts}>
            Fetch Products
          </button>
          </div>
        
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="products-list">
            {filteredProducts.map((product) => (
              <li className="product-card" key={product.id}>
                <Link to={`${product?.id}`}>
                  <div className="product-img-container">
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  <div className="product-content">
                    <div className="product-description">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-char">
                        {product.description}
                      </p>
                      {product.status !== "out_of_stock" ? (
                        <p className="product-price">${product.price}</p>
                      ) : (
                        <p className="product-price text-alert">Out of Stock</p>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="product-btn">
                  <button
                    className={
                      product.status !== "out_of_stock"
                        ? "btn-primary"
                        : "disable"
                    }
                    onClick={() => handleClick(product.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </section>
    </>
  );
};

export default ProductList;
