import { Box, Button, IconButton, TextField } from "@mui/material";
import { Add01Icon, Delete01Icon, Edit01Icon } from "hugeicons-react";
import React, { useState } from "react";

interface SizeInfo {
  size: string;
  quantity: number;
}
interface AvailibleSizesProps {
  sizes: SizeInfo[];
  setSizes: React.Dispatch<React.SetStateAction<SizeInfo[]>>;
  maxQuntety: number;
}

const AvailibleSizes: React.FC<AvailibleSizesProps> = ({
  sizes,
  setSizes,
  maxQuntety,
}) => {
  const [Editedindex, setEditedindex] = useState<number>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [insertedSizes, setInsertedSizes] = useState<{
    size: string;
    quantity: number;
  }>({ size: "", quantity: 0 });

  const IsInputsValid = insertedSizes.quantity && insertedSizes.size;

  const handelDelete = (index: number) => {
    const FiltredSises = sizes.filter((_, i) => i !== index);
    setSizes(FiltredSises);
  };

  const handelSaveEdit = () => {
    setSizes((prevSizes) => {
      const prevSizesA = [...prevSizes];
      prevSizesA[Editedindex || -1] = {
        size: insertedSizes.size,
        quantity: insertedSizes.quantity,
      };
      return prevSizesA;
    });
    setIsAddOpen(false);
  };

  const handleSave = () => {
    setSizes([
      ...sizes,
      { size: insertedSizes.size, quantity: insertedSizes.quantity },
    ]);
    setInsertedSizes({
      quantity: 0,
      size: "",
    });
    setIsAddOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "size" | "quantity"
  ) => {
    if (field == "quantity") {
      if (parseInt(e.target.value, 10) > maxQuntety) {
        alert("sss");
        return
      } 
    }
    const value =
      field === "quantity" ? parseInt(e.target.value, 10) : e.target.value;

    setInsertedSizes((prevSizes) => ({
      ...prevSizes,
      [field]: value,
    }));
  };

  const handelEdit = (index: number) => {
    const selectedSize = sizes[index];
    setEditedindex(index);
    setInsertedSizes({
      size: selectedSize.size,
      quantity: selectedSize.quantity,
    });
    setIsAddOpen(true);
  };

  return (
    <div>
      <h3>Available Sizes</h3>
      <Box display="flex" marginY={2} gap={1} flexWrap="wrap">
        {sizes.map((item, index) => (
          <Box key={index} display="flex" alignItems="center">
            <div className=" flex  items-center flex-col border-[1px] rounded-md ">
              <span className=" px-2 pt-1 text-2xl">
                {item.size} / {item.quantity}
              </span>
              <div className=" flex justify-between w-full  ">
                <IconButton onClick={() => handelEdit(index)}>
                  <Edit01Icon className=" text-blue-500 " size={20} />
                </IconButton>
                <IconButton onClick={() => handelDelete(index)}>
                  <Delete01Icon className="text-red-500" size={20} />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
        {!isAddOpen && (
          <IconButton onClick={() => setIsAddOpen(true)} color="primary">
            <Add01Icon />
          </IconButton>
        )}
      </Box>
      {/* Save and Cancel Buttons */}
      {isAddOpen && (
        <div className="  flex flex-col  w-full lg:w-[50%] gap-3 bg-gray-100 p-2 rounded-md ">
          <div className=" flex gap-3  w-full">
            <TextField
              onChange={(e: any) => handleInputChange(e, "size")}
              label="Size"
              value={insertedSizes.size}
              variant="outlined"
              fullWidth
            />

            <TextField
              onChange={(e: any) => handleInputChange(e, "quantity")}
              label="Quantity"
              value={insertedSizes.quantity}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className=" flex  justify-between">
            <Button
              onClick={() => {
                setIsAddOpen(false);
                setInsertedSizes({ size: "", quantity: 0 });
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              disabled={!IsInputsValid}
              variant="contained"
              color="primary"
              onClick={!Editedindex ? handleSave : handelSaveEdit}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailibleSizes;
