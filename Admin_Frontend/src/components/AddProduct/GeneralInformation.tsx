import {
  ListItemText,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";
import subCategory from "../../assets/data/FilterData";
import { avalibaleCategories } from "../../assets/data/FilterData";

interface GeneralInformationProps {}

const GeneralInformation: React.FC<GeneralInformationProps> = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className=" bg-gray-50  rounded-md  lg:p-5 p-[1rem] ">
      <h3>General Information</h3>
      <div className=" flex  lg:flex-row flex-col  gap-3">
        <div className=" flex flex-col   w-full lg:w-[65%] gap-3">
          <div className="">
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              type="text"
              id="productname"
              margin="normal"
            />
          </div>
          <div className="">
            <TextareaAutosize
              id="your-message"
              minRows={6}
              style={{ background: "#F5F5F5" }}
              placeholder="Type your message here"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category selection */}
        <div className=" flex flex-col gap-5 pt-4  lg:w-[35%] w-full ">
          <Select
            onChange={handleChange}
            displayEmpty
            value={selectedCategory || ""}
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

          {selectedCategory && (
            <div>
              <Select
                value={selectedCategory || ""}
                style={{ fontSize: "14px" }}
                displayEmpty
                className="border-[1px] rounded-md w-full"
              >
                <MenuItem value="" disabled>
                  <>Select sub Category</>
                </MenuItem>
                {subCategory[selectedCategory]?.map((subItem) => (
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
