import React from "react";
import { Options } from "../model/product";

interface DropdownProps {
  options: Options[];
  onOptionChange: (productId: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onOptionChange }) => {
  const [option, setOption] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(event.target.value)
    setOption(event.target.value)
    onOptionChange(productId)
  };

  return (
    <div className="variants-container">
    <select value={option} onChange={handleChange} className="variants-selector" id="variants-selector">
      <option value="" disabled>
        Please select
      </option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.stock !== 0? opt.option : `${opt.option} - Out of Stock`}
        </option>
      ))}
    </select>
    </div>
  );
};

export default Dropdown;
