import React from "react";
import SliderBar from "../../components/SliderBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { setPriceRange } from "./FilterSlice";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@radix-ui/themes";
import FilterClear from "./FilterClear";
import OptionList from "../../components/OptionList";
import { PriceRange } from "../../model/priceRange";

const FilterByPriceRange: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);

  React.useEffect(() => {
    let min = 0;
    let max = 160;

    switch (selected) {
      case PriceRange.RANGE_10_25:
        min = 10;
        max = 25;
        break;
      case PriceRange.RANGE_25_50:
        min = 25;
        max = 50;
        break;
      case PriceRange.RANGE_50_75:
        min = 50;
        max = 75;
        break;
      case PriceRange.RANGE_OVER_75:
        min = 75;
        max = 160;
        break;
      default:
        break;
    }

    dispatch(setPriceRange([min, max]));
  }, [selected]);

  const closePopover = () => setIsOpen(false);
  const togglePopover = () => setIsOpen(!isOpen);

  const PriceRangeList = [
    {
      id: "RANGE_10_25",
      title: "$10 - $25",
    },
    {
      id: "RANGE_25_50",
      title: "$25 - $50",
    },
    {
      id: "RANGE_50_75",
      title: "$50 - $75",
    },
    {
      id: "RANGE_OVER_75",
      title: "over $75",
    },
  ];

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className={`PopoverTrigger ${isOpen ? "active" : ""}`}
          aria-label="Update dimensions"
          onClick={togglePopover}
        >
          Price
          <ChevronDownIcon
            className={
              isOpen ? "chevron-down-icon active" : "chevron-down-icon"
            }
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <FilterClear setState={setSelected} />
          <OptionList
            selected={selected}
            setSelected={setSelected}
            list={PriceRangeList}
            closePopover={closePopover}
          />
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterByPriceRange;
