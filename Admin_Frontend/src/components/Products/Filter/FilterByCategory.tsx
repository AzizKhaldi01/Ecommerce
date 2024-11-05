import React, { useEffect, useState } from "react";
import { FilterItems } from "../../../types/FilterTypes";
import subCategory from "../../../assets/data/FilterData";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

interface FilterByCategoryProps {
  availableCategories: string[];
  preSelectedFilter: FilterItems | null;
  setPreSelectedFilter: React.Dispatch<
    React.SetStateAction<FilterItems | null>
  >;
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  availableCategories,
  preSelectedFilter,
  setPreSelectedFilter,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );

  console.log("selectedSubCategories");
  console.log(selectedSubCategories);

  const handleAddCategory = (cate: string) => {
    setPreSelectedFilter((prevFilter) => {
      const currentCategories = prevFilter?.category || [];

      return {
        ...prevFilter,
        category: currentCategories.includes(cate)
          ? currentCategories.filter((item) => item !== cate) // Remove if already selected
          : [...currentCategories, cate], // Add if not already selected
        DiscountStatus: prevFilter?.DiscountStatus || "",
        StockStatus: prevFilter?.StockStatus || "",
        subCategory: prevFilter?.subCategory || [],
      };
    });
  };

  const getSubCategories = () => {
    const subCategories: string[] = [];
    preSelectedFilter?.category?.map((category) => {
      subCategories.push(...subCategory[category]);
    });
    return subCategories;
  };

  const isCategorySelected = (preSelectedFilter?.category?.length || 0) > 0;

  useEffect(() => {
    const displayedSubCategories = getSubCategories();
    console.log("displayedSubCategories---------");
    console.log(displayedSubCategories);
    setTimeout(() => {
      setSelectedSubCategories((prevSubCate) => {
        return prevSubCate.filter((item) =>
          displayedSubCategories.includes(item)
        );
      });
    }, 200);
  }, [preSelectedFilter?.category]);

  const handleAddSubCategory = (subCate: string) => {
    setPreSelectedFilter((prvselectedFilter) => {
      const currentCategories = prvselectedFilter?.subCategory || [];

      return {
        ...prvselectedFilter,
        subCategory: currentCategories.includes(subCate)
          ? currentCategories.filter((cate) => cate !== subCate)
          : [...currentCategories, subCate],
        category: prvselectedFilter?.category || [],
        StockStatus: prvselectedFilter?.StockStatus || "",
        DiscountStatus: prvselectedFilter?.DiscountStatus || "",
      };
    });
  };

  const isCategoryLenght = availableCategories?.length <= 6;
  let Divstyles = "pt-1  gap-5  flex flex-wrap ";
  let Divstyles01 = "pt-1 w-full";

  return (
    <div className="  flex flex-col gap-2  pt-5">
      {/* Filter by category */}
      <div className="">
        <h4>By Category</h4>
        <div className={isCategoryLenght ? Divstyles : Divstyles01}>
          {isCategoryLenght ? (
            availableCategories.map((item) => (
              <label
                key={item}
                htmlFor={item}
                className={`border-[1px] justify-between  rounded-md flex cursor-pointer gap-4 p-2 px-3 ${
                  preSelectedFilter?.category?.includes(item)
                    ? "border-main"
                    : ""
                }`}
              >
                <p>{item}</p>
                <input
                  checked={preSelectedFilter?.category?.includes(item)}
                  id={item}
                  type="checkbox"
                  name="category" // Group the radio buttons
                  onClick={() => handleAddCategory(item)} // Only call here
                />
              </label>
            ))
          ) : (
            <Select
              multiple
              value={preSelectedFilter?.category || []}
              style={{ fontSize: "14px" }}
              renderValue={(selected) => (selected as string[]).join(", ")}
              className="border-[1px] rounded-md w-full"
            >
              {availableCategories.map((item) => (
                <MenuItem
                  onClick={() => handleAddCategory(item)}
                  key={item}
                  value={item}
                >
                  <Checkbox
                    checked={preSelectedFilter?.category?.includes(item)}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </div>

      {/* subCategory */}
      {isCategorySelected && (
        <div className="">
          <h4>Sub Category</h4>
          <div className={isCategoryLenght ? Divstyles : Divstyles01}>
            {isCategoryLenght ? (
              availableCategories.map((item) => (
                <label
                  key={item}
                  htmlFor={item}
                  className={`border-[1px] justify-between  rounded-md flex cursor-pointer gap-4 p-2 px-3 ${
                    preSelectedFilter?.category?.includes(item)
                      ? "border-main"
                      : ""
                  }`}
                >
                  <p>{item}</p>
                  <input
                    checked={preSelectedFilter?.category?.includes(item)}
                    id={item}
                    style={{ fontSize: "14px" }}
                    type="checkbox"
                    name="category" // Group the radio buttons
                    onClick={() => handleAddCategory(item)} // Only call here
                  />
                </label>
              ))
            ) : (
              <div>
                <Select
                  multiple
                  value={preSelectedFilter?.subCategory || []}
                  style={{ fontSize: "14px" }}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  className="border-[1px] rounded-md w-full"
                >
                  {getSubCategories().map((subItem) => (
                    <MenuItem
                      onClick={() => handleAddSubCategory(subItem)}
                      key={subItem}
                      value={subItem}
                    >
                      {/* <Checkbox checked={preSelectedFilter?.category.indexOf(subItem) > -1} /> */}
                      <ListItemText primary={subItem} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
