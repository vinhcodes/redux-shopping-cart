import React, { useState } from 'react';
import './index.css'

interface AccordionItemProps {
  id?: number,
  title?: string;
  content?: string;
}

interface AccordionProps {
  items: AccordionItemProps[] | undefined;
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items?.map((item, index) => (
        <div key={item.id} className="accordion-item">
          <div 
            className={`accordion-title ${activeIndex === index ? 'active' : ''}`} 
            onClick={() => handleClick(index)}
          >
            {item.title}
          </div>
          <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
            {activeIndex === index && <p>{item.content}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;