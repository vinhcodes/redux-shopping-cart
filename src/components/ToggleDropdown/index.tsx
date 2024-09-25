import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  title: string;
  buttonLabel: string; // Label for the button
  children: React.ReactNode; // Content inside the dropdown modal
}

const Dropdown: React.FC<DropdownProps> = ({ title, buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});

  // Toggle dropdown open/close state
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Position the dropdown modal relative to the button
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        top: buttonRect.bottom + window.scrollY + 8, // 8px offset from the button
        left: buttonRect.left + window.scrollX,
        width: buttonRect.width,
      });
    }
  }, [isOpen]);

  return (
    <div>
      {/* Button Trigger */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="dropdown-button"
      >
        {buttonLabel}
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="dropdown-modal card"
          style={dropdownStyles}
        >
          <div className="header-title">{title}</div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
