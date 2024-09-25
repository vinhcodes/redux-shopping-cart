import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  selectSearchTerm,
  selectCategory,
  selectPriceRange,
  selectSortBy,
  selectSize,
} from "../filter/FilterSelectors";
import { Product } from "../../model/product";

export enum SortFields {
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
  DATE_ASC = "date-asc"
  // POPULARITY_ASC = 'popularity-asc',
  // RATING_ASC = 'rating-asc',
}

export const selectProductItems = (state: RootState) => state.product.items;

export const selectFilteredProducts = createSelector(
  [
    selectProductItems,
    selectSearchTerm,
    selectCategory,
    selectPriceRange,
    selectSortBy,
    selectSize,
  ],
  (products, searchTerm, category, priceRange, sortBy, size) => {
   
    let filteredProducts = products.filter((product: Product) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === null || product.CategoryId === category;

      const matchesPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      
        const matchesSize = size.length === 0 || product.options.some(option => 
          size.includes(option.option) && option.stock !== 0
        );

      return matchesSearchTerm && matchesCategory && matchesPriceRange && matchesSize;
    });

    if (sortBy) {
      switch (sortBy) {
        case SortFields.PRICE_ASC:
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case SortFields.PRICE_DESC:
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
          break;
          case SortFields.DATE_ASC:
            filteredProducts = filteredProducts.sort((a, b) => { 
              const dateA = new Date(a.createdAt); // Assuming 'date' is the property holding the date string
              const dateB = new Date(b.createdAt);
          
              // Sort in ascending order
              return dateA.getTime() - dateB.getTime();
            });
            break;
  
        default:
          break;
      }
    }

    return filteredProducts;
  }
);
