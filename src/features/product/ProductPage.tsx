import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../model/product";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../../components/Dropdown";
import { RootState, AppDispatch } from "../../app/store";
import { addItem } from "../cart/CartSlice";
import { useToast } from "../../provider/ToastProvider";
import Carousel from "../../components/Carousel";
import Accordion from "../../components/Accordion";


export default function ProductPage() {
  const [product, setProduct] = React.useState<Product>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [availableToBuy, setAvailbleToBuy] = React.useState<boolean>(false);
  
  const products = useSelector((state: RootState) => state.product.items);
 

  const dispatch: AppDispatch = useDispatch();

  const { addToast } = useToast();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    }
  });

  const handleOptionChange = (optionId: number) => {
    const selectedOption = product?.options.find((opt) => opt.id === optionId);

    if (selectedOption) {
      const inStock = selectedOption.stock > 0;
      return setAvailbleToBuy(inStock);
    }
  };

  const handleClick = (id: string) => {
    const cartItem = products.find((p) => id === p.id);
    setLoading(true);
    setAvailbleToBuy(false);

    setTimeout(() => {
      if (cartItem) {
        dispatch(addItem(cartItem));
      }
      setLoading(false);
      setAvailbleToBuy(true);
      addToast(`${cartItem?.name} added to your cart!`, "success");
    }, 2000);
  };

  const productDetails = [
    {
      id: 1,
      title: "About Product",
      content: product?.description,
    },
  ];

  return (
    <>
      {product ? (
        <div className="" id="product-page">
          <div
            className="product-carousel"
            style={{ width: "450px", height: "450px", position: "relative" }}
          >
            <Carousel
              images={
                Array.isArray(product.imageUrl)
                  ? product.imageUrl
                  : [product.imageUrl]
              }
            />
          </div>
          <div className="product-features flex-column">
            <h2>{product.name}</h2>
            <p className="product-cost product-price">$ {product.price}</p>
            <div className="product-options">
              <label htmlFor="variant-selector">Size:</label>
              <Dropdown
                options={product.options}
                onOptionChange={handleOptionChange}
              />
            </div>
            <button
              className={availableToBuy ? "btn-primary" : "btn-mute disable"}
              onClick={() => handleClick(product.id)}
            >
              {loading ? <div className="btn-loader"></div> : "add to cart"}
            </button>
            <Accordion items={productDetails} />
          </div>
        </div>
      ) : (
        <p>404 Product not found</p>
      )}
    </>
  );
}
