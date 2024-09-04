import React, { useState } from 'react';

interface QuantityDropdownProps {
  initialQuantity?: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantityDropdown: React.FC<QuantityDropdownProps> = ({
  initialQuantity = 1,
  maxQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = parseInt(event.target.value, 10);
    setQuantity(selectedQuantity);
    onQuantityChange(selectedQuantity);
  };

  return (
    <select value={quantity} onChange={handleChange} className='dropdown'>
      {Array.from({ length: maxQuantity }, (_, index) => index + 1).map((qty) => (
        <option key={qty} value={qty} className='dropdown-option'>
          Qty: {qty}
        </option>
      ))}
    </select>
  );
};

export default QuantityDropdown;