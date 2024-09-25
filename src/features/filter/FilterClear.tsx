import React from "react";

//This resuable button removes State
// we need to pass state updating function

interface FilterClear {
  setState: React.Dispatch<React.SetStateAction<string | null>>;
}

const FilterClear: React.FC<FilterClear> = ({ setState }) => {
  return (
    <div className="clear-filter">
    <button className="clear-filter-btn" onClick={() => setState(null)}>
      Clear
    </button>
    </div>
  );
};

export default FilterClear;
