import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { setSearchTerm } from "./FilterSlice";

import FilterByCategory from "./FilterByCategory";
import FilterSortBy from "./FillterSortBy";
import FilterByPriceRange from "./FilterPriceByRange";
import FilterBySize from "./FilterBySize";


const FilterList = () => {
  return (
    <div className="filter-container">
      <ul className="filter-list">
        <li className="filter-item">
          <FilterSortBy />
        </li>
        <li className="filter-item">
          <FilterByCategory />
        </li>
        <li className="filter-item">
          <FilterBySize />
        </li>
        <li className="filter-item">
          <FilterByPriceRange />
        </li>

        {/* <li className="filter-item">
          <CategoryList handleCategoryChange={handleCategoryChange} 
          />
        
        </li> */}

        {/* <li className="filter-item">
          <PopoverDemo handlePriceRangeChange={handlePriceRangeChange} />
          <ChevronDownIcon className="filter-icon" />
        </li> */}

        {/* <button onClick={() => dispatch(resetFilters())}>Reset Filters</button> */}
      </ul>
    </div>
  );
};

export default FilterList;
