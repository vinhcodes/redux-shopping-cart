import React from "react";
import FilterList from "../filter/FilterList";
import ProductList from "./ProductList";

import "./index.css"

const Products: React.FC = () => {
  return (
    <> 
      <FilterList />
      <ProductList />
    </>
  );
};

export default Products;
