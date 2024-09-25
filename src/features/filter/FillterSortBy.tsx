import React from "react";
import * as Popover from "@radix-ui/react-popover";
import OptionList from "../../components/OptionList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { ChevronDownIcon } from "@radix-ui/themes";
import { setSortBy } from "./FilterSlice";
import FilterClear from "./FilterClear";

enum SortOptions {
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  DateAsc = "date-asc",
}

const FilterSortBy: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null >(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const sort = useSelector((state: RootState) => state.filter.sortBy);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setSortBy(selected));
  }, [selected, dispatch]);

  const closePopover = () => setIsOpen(false);
  const togglePopover = () => setIsOpen(!isOpen);

  const sortPriceOptions = [
    {
      id: SortOptions.PriceAsc,
      title: "Price: low to high",
    },
    {
      id: SortOptions.PriceDesc,
      title: "Price: high to low",
    },
    {
      id: SortOptions.DateAsc,
      title: "Newest",
    },
  ];

   const getSortTitle = (sortId: string | null) => {
    const option = sortPriceOptions.find(option => option.id === sortId);
    return option ? option.title : "";
  };


  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className={`PopoverTrigger ${isOpen ? "active" : ""}`}
          aria-label="Update dimensions"
          onClick={togglePopover}
        >
          <div className="PopoverLabel">
            <label>Sort by Price</label>
            <p>{getSortTitle(sort)}</p>
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
        <FilterClear setState={setSelected}/>
          <OptionList
            selected={selected}
            setSelected={setSelected}
            list={sortPriceOptions}
            closePopover={closePopover}
          />
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterSortBy;
