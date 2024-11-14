import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../Product/Producttypes";

const initialState: ProductState = {
  title: "",
  slog: "",
  status: "visible",
  description: "",
  price: 0,
  category: "",
  subCategory: "",
  rating: 0,
  sold: 0,
  discount: 0,
  images: [],
  gender: "",
  purchase: 0,
  minimumquantity: 0,
  stock: 0,
  variants: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      state.title = action.payload.title;
      state.slog = action.payload.slog;
      state.status = action.payload.status;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.purchase = action.payload.purchase;
      state.minimumquantity = action.payload.minimumquantity;
      state.category = action.payload.category;
      state.subCategory = action.payload.subCategory;
      state.rating = action.payload.rating;
      state.sold = action.payload.sold;
      state.discount = action.payload.discount;
      state.images = action.payload.images;
      state.gender = action.payload.gender;
      state.stock = action.payload.stock;
      state.variants = action.payload.variants;
    },

    setImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },
  },
});

// Export actions for use in components
export const { setProduct , setImages } = productSlice.actions;

// Export reducer for store
export default productSlice.reducer;
