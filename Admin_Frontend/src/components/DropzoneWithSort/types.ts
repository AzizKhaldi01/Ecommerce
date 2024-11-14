import { Dispatch } from "redux";
import { setImages } from "../../features/Product/productSlice";

export interface DropzoneWithSortProps {
  images: File[];
  setImages: Dispatch<ReturnType<typeof setImages>>;
}


export interface ImageItemProps {
  file: File;
  index: number;
}
