import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import * as Popover from "@radix-ui/react-popover";
import OptionList from "../../components/OptionList";
import { fetchCategory } from "../category/CategorySlice";
import { setCategory } from "./FilterSlice";
import { ChevronDownIcon } from "@radix-ui/themes";
import "./index.css";
import FilterClear from "./FilterClear";

const FilterByCategory: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category.items);
  const status = useSelector((state: RootState) => state.category.status);
  const error = useSelector((state: RootState) => state.category.error);
  const sort = useSelector((state: RootState) => state.filter.category);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}. Please try again, later.</p>;

  React.useEffect(() => {
    if (status === "idle") {
      console.log("fires dis");
      dispatch(fetchCategory());
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    dispatch(setCategory(selected));
  }, [selected]);

  const categoryList = Array.isArray(categories)
    ? categories.map((c) => ({
        id: c.id,
        title: c.name,
      }))
    : [];

  const selectedCategory = categories.find((c) => c.id === selected);
  const closePopover = () => setIsOpen(false);
  const togglePopover = () => setIsOpen(!isOpen);

  const handleClearFilter = () => {
    setSelected(null);
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
            <label>Category</label>
            <p> {selected ? selectedCategory?.name : ""}</p>
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
          <FilterClear setState={setSelected} />
          <OptionList
            selected={selected}
            setSelected={setSelected}
            list={categoryList}
            closePopover={closePopover}
          />
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterByCategory;
