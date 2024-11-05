import React, { useState } from "react";
import Button from "../UI/Button";
import { FilterIcon } from "hugeicons-react";
import UiModal from "../UI/Modal";
import { FilterItems } from "../../types/FilterTypes";
import FilterByCategory from "./Filter/FilterByCategory";
import FilterByFullPriceOrDiscounted from "./Filter/FilterByFullPriceOrDiscounted";
import InAndOutOfStock from "./Filter/InAndOutOfStock";

interface ProductsFilterProps {
  availableCategories: string[];
  selectedFilter: FilterItems | null;
  SetSelectedFilter: React.Dispatch<React.SetStateAction<FilterItems | null>>;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  availableCategories,
  selectedFilter,
  SetSelectedFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preSelectedFilter, setPreSelectedFilter] =
    useState<FilterItems | null>({
      category: [],
      subCategory: [],
      DiscountStatus: "",
      StockStatus: "",
    });

  const HandelCloseFilter = () => {
    setIsModalOpen(false);
    setPreSelectedFilter(selectedFilter);
  };

  const HandelSaveFilter = () => {
    setIsModalOpen(false);
    SetSelectedFilter(preSelectedFilter);
  };

  return (
    <div className="">
      <Button
        onClick={() => setIsModalOpen(true)}
        rippleColor="#6c6c6c"
        variant="outlined"
      >
        <div className=" flex  text-black gap-2  lg:text-sm text-xs items-center">
          Filter <FilterIcon size={18} />
        </div>
      </Button>

      <UiModal
        width={{ xs: "90%", sm: "80%", md: "60%", lg: "30%" }}
        open={isModalOpen}
        onClose={HandelCloseFilter}
        content={
          <div className=" gap-5 flex flex-col ">
            <h2>Filter</h2>
            <FilterByCategory
              setPreSelectedFilter={setPreSelectedFilter}
              preSelectedFilter={preSelectedFilter}
              availableCategories={availableCategories}
            />
            <FilterByFullPriceOrDiscounted
              setPreSelectedFilter={setPreSelectedFilter}
              preSelectedFilter={preSelectedFilter}
            />
            <InAndOutOfStock
              setPreSelectedFilter={setPreSelectedFilter}
              preSelectedFilter={preSelectedFilter}
            />
            <div className=" pt-7 flex justify-between w-full">
              <Button
                onClick={HandelCloseFilter}
                styles="text-black"
                variant="outlined"
              >
                Close
              </Button>
              <Button rippleColor="white" onClick={HandelSaveFilter}>Save</Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProductsFilter;
