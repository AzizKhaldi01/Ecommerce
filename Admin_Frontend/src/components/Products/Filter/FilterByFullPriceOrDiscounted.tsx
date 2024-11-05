import React from "react";
import { FilterItems } from "../../../types/FilterTypes";
import {
  ButtonBase,
  Radio,
} from "@mui/material";

interface Props {
  preSelectedFilter: FilterItems | null;
  setPreSelectedFilter: React.Dispatch<
    React.SetStateAction<FilterItems | null>
  >;
}

const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: "4px",
  // Ripple effect styles
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)", // Subtle hover effect
  },
  "&:active": {
    backgroundColor: "rgba(0, 0, 0, 0.08)", // Darker on click
  },
};

const FilterByFullPriceOrDiscounted: React.FC<Props> = ({
  preSelectedFilter,
  setPreSelectedFilter,
}) => {
  const items = [
    {
      title: "Full Price",
      value: "fullprice",
    },
    {
      title: "Discounted",
      value: "discounted",
    },
  ];

  const handleSelectTypeDiscount = (value: string) => {
    setPreSelectedFilter((prevSelectedFilter) => {
      const currentDiscountStatus = prevSelectedFilter?.DiscountStatus || "";

      return {
        ...prevSelectedFilter,
        DiscountStatus: currentDiscountStatus === value ? "" : value,
        category: prevSelectedFilter?.category || [],
        StockStatus: prevSelectedFilter?.StockStatus || "",
        subCategory: prevSelectedFilter?.subCategory || [],
      };
    });
  };

  const IsTheSame = (vale: string) => {
    return vale == preSelectedFilter?.DiscountStatus;
  };

  return (
    <div className=" ">
      <h4>Discount Status</h4>
      <div className=" flex gap-3 pt-1">
        {items.map((item) => (
          <ButtonBase
            className="  flex  justify-between w-full "
            key={item.value}
            onClick={() => handleSelectTypeDiscount(item.value)}
            sx={style}
          >
            <div
              className={` ${
                IsTheSame(item.value) && "border-main"
              } h-full border-[1px] rounded w-full flex justify-between py-1 pl-2 text-sm items-center`}
            >
              {item.title}
              <Radio
                checked={preSelectedFilter?.DiscountStatus == item.value} // Mark selected subcategories
                color="primary"
              />
            </div>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

export default FilterByFullPriceOrDiscounted;
