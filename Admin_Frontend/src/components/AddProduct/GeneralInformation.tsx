import { MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect } from "react";
import subCategory from "../../assets/data/FilterData";
import { avalibaleCategories } from "../../assets/data/FilterData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setProduct } from "../../features/Product/productSlice";
import { ProductState } from "../../features/Product/Producttypes";

interface GeneralInformationProps {}

const GeneralInformation: React.FC<GeneralInformationProps> = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProductState
  ) => {
    dispatch(setProduct({ ...product, [field]: e.target.value }));
  };

  useEffect(() => {
    dispatch(setProduct({ ...product, subCategory: "" }));
  }, [product.category]);

  return (
    <div className=" bg-gray-50  rounded-md  lg:p-5 p-[1rem] ">
      <h3>General Information</h3>
      {product.category + product.subCategory}

      <div className=" flex  lg:flex-row flex-col  gap-3">
        <div className=" flex flex-col   w-full lg:w-[65%] gap-3">
          <div className="">
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              type="text"
              id="productname"
              value={product.title} // Set the value from the Redux state
              onChange={(e) => handleInputChange(e, "title")}
              margin="normal"
            />
          </div>
          <div className="">
            <TextareaAutosize
              id="your-message"
              minRows={6}
              style={{ background: "#F5F5F5" }}
              value={product.description} // Set the value from the Redux state
              onChange={(e) => handleInputChange(e, "description")}
              placeholder="Type your message here"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category selection */}
        <div className=" flex flex-col gap-5 pt-4  lg:w-[35%] w-full ">
          <Select
            onChange={(e: any) => handleInputChange(e, "category")}
            displayEmpty
            value={product.category || ""}
            style={{ fontSize: "14px" }}
            className="border-[1px] rounded-md w-full"
          >
            <MenuItem value="" disabled>
              <>Select Category</>
            </MenuItem>
            {avalibaleCategories.map((item) => (
              <MenuItem key={item} value={item}>
                <div className=" flex gap-3 items-center text-sm ">
                  <p>{item}</p>
                </div>
              </MenuItem>
            ))}
          </Select>

          {product.category && (
            <div>
              <Select
                onChange={(e: any) => handleInputChange(e, "subCategory")}
                value={product.subCategory || ""}
                style={{ fontSize: "14px" }}
                displayEmpty
                className="border-[1px] rounded-md w-full"
              >
                <MenuItem value="" disabled>
                  <>Select sub Category</>
                </MenuItem>
                {subCategory[product.category]?.map((subItem) => (
                  <MenuItem
                    // onClick={() => handleAddSubCategory(subItem)}
                    key={subItem}
                    value={subItem}
                  >
                    <p>{subItem}</p>
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
