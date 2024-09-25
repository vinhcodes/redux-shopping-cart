import React from "react";
import "./index.css";

interface ListItem {
  id: string;
  title: string;
}

interface OptionList {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  list: ListItem[] | null;
  closePopover: () => void; 
}

const OptionList: React.FC<OptionList> = ({selected, setSelected, list, closePopover }) => {

  const handleOnClick = (item: string) => {
    setSelected(item);
    closePopover()
  };


  return (
    <ul className="option-list">
      {list?.map((item) => (
        <li className="option-item" key={item.id}>
          <button
             className={`option-btn ${selected === item.id ? 'selected' : ''}`} 
            role="option"
            aria-selected={selected === item.id}
           
            onClick={() => handleOnClick(item.id)}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
