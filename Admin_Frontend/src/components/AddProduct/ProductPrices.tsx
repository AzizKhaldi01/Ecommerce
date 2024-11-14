import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setProduct } from "../../features/Product/productSlice";
import { RootState } from "../../app/store";
import { ProductState } from "../../features/Product/Producttypes";

interface ProductPricesProps {
  price?: number;
  purchasePrice?: number;
  minQuantityAlert?: number;
  stock?: number;
}

const ProductPrices: React.FC<ProductPricesProps> = ({
  price,
  purchasePrice,
  minQuantityAlert,
  stock,
}) => {
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.product);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProductState
  ) => {
    dispatch(setProduct({ ...product, [field]: e.target.value }));
  };

  return (
    <div className="  lg:p-5 p-[1rem] bg-gray-50 rounded-lg lg:flex-col ">
      <h3>Pricing & Stock</h3>
      <div className=" grid  lg:grid-cols-2 grid-cols-1  gap-3 ">
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "price")
          }
          label="Price"
          value={price}
          fullWidth
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "purchase")
          }
          label="Purchase"
          value={purchasePrice}
          fullWidth
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "minimumquantity")
          }
          label="Minimum quantity alert"
          value={minQuantityAlert}
          fullWidth
        />
        <TextField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "stock")
          }
          label="Stock"
          value={stock}
          fullWidth
        />
      </div>
    </div>
  );
};

export default ProductPrices;
