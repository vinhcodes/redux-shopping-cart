import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@radix-ui/themes";
import { setFilterSize } from "./FilterSlice";
import FilterClear from "./FilterClear";
import "./index.css";


const FilterBySize: React.FC = () => {
  const [optionList, setOptionList] = React.useState<
    { id: number; title: string }[] | null
  >(null);
  const [selected, setSelected] = React.useState<string[]>([]); // Change to array for multiple selections
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const sort = useSelector((state: RootState) => state.filter.size);

 
  const togglePopover = () => setIsOpen(!isOpen);

  // 1. Create Set of All options  from each products
  React.useEffect(() => {
    const getProductOptions = () => {
      const uniqueOptions = new Map<string, { id: number; title: string }>();

      products.forEach((product) => {
        product.options.forEach((option) => {
          if (!uniqueOptions.has(option.option)) {
            uniqueOptions.set(option.option, {
              id: uniqueOptions.size + 1,
              title: option.option,
            });
          }
        });
      });

      const optionsArray = Array.from(uniqueOptions.values());
      setOptionList(optionsArray);
    };

    if (products.length > 0) {
      getProductOptions();
    } else {
      console.log("No products available to extract options.");
    }
  }, [products]);


  console.log(sort)


  React.useEffect(() => {
    dispatch(setFilterSize(selected))
  }, [selected]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className={`PopoverTrigger ${isOpen ? "active" : ""}`}
          aria-label="Update dimensions"
          onClick={togglePopover}
        >
           <div className="PopoverLabel">
            <label>Size</label>
            <p> {sort ? sort.map( size => size + ',') : ""}</p>
          </div>
          <ChevronDownIcon
            className={
              isOpen ? "chevron-down-icon active" : "chevron-down-icon"
            }
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
         {/* need to modify clear filter feature */}
          <ul className="size-list">
            {optionList ? (
              optionList.map((option) => (
                <li key={option.id} className="toggle-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      checked={selected?.includes(option.title)}
                      onChange={() => {
                        // 1. Checks if its in selected array state
                        if (selected?.includes(option.title)) {
                        // 2. If it is uncheck it by filtered out this item  
                          setSelected(
                            selected?.filter((item) => item !== option.title)
                          );
                        } else {
                        // 3. If its new value than add into selected arrray 
                          setSelected([...selected, option.title]);
                        }
                      }}
                    />
                    {option.title}
                  </label>
                </li>
              ))
            ) : (
              <li>No options available</li>
            )}
          </ul>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterBySize;
