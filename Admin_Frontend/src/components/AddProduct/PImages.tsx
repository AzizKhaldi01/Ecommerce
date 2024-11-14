import React from "react";
import DropzoneWithSort from "../DropzoneWithSort/DropzoneWithSort";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setImages } from "../../features/Product/productSlice";

const PImages: React.FC = () => {
  const images = useSelector((state: RootState) => state.product.images);
 
  console.log("images----------**********")
  console.log(images)

  return (
    <div className=" flex flex-col gap-3  h-[60%]  overflow-y-auto overflow-x-hidden lg:p-5 bg-gray-50 p-[1rem] ">
      <h3>images</h3>
      <DropzoneWithSort
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default PImages;
