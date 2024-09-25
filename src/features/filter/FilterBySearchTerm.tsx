import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { setSearchTerm } from "./FilterSlice";
import { SearchIcon } from "lucide-react";


const FilterBySearchTerm = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useDispatch();

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-container">
      <input
        className="filter-btn"
        type="text"
        value={searchValue}
        onChange={handleSearchTermChange}
        placeholder="Search..."
      />
      <button id="search-btn"><SearchIcon className="icons" size={20}/></button>
    </div>
  );
};

export default FilterBySearchTerm;
