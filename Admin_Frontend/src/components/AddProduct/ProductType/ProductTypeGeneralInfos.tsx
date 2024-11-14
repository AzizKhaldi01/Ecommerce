import React from "react";
import { TextField, Box } from "@mui/material";

interface InputValues {
  title: string;
  stock: number;
  price: number;
}

interface ProductTypeGeneralInfosProps {
  inputValues: InputValues;
  setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;
}

const ProductTypeGeneralInfos: React.FC<ProductTypeGeneralInfosProps> = ({inputValues, setInputValues}) => {
  

  // Handle change for inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {/* Title and Price/Stock Inputs */}
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={inputValues.title}
        onChange={handleChange}
      />
      <Box display="flex" gap={2}>
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          name="stock"
          value={inputValues.stock}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          value={inputValues.price}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default ProductTypeGeneralInfos;
