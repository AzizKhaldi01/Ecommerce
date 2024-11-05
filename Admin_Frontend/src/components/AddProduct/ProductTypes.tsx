import React from "react";
import PTable from "./ProductType/PTable";
import AddProductType from "./ProductType/AddProductType";
import CustomButton from "../UI/Button";

const ProductTypes = () => {
  const sampleProducts = [
    {
      id: 1,
      image: "/path/to/image1.jpg",
      name: "Red",
      stock: 5,
      price: "120$",
      sizes: { XS: 1, S: 1, M: 1, XL: 1, XXL: 1 },
    },
    {
      id: 2,
      image: "/path/to/image2.jpg",
      name: "White",
      stock: 5,
      price: "100$",
      sizes: { XS: 1, S: 1, M: 1, XL: 1, XXL: 1 },
    },
  ];

  return (
    <div className=" flex flex-col bg-gray-50 rounded-md  gap-5 lg:p-5 p-[1rem]">
      <div className="  w-full flex justify-between">
        <span className=" flex flex-col">
          <h3>Product Types</h3>
          <p className=" text-gray-500 ">
            {" "}
            if your products has many types u can add them here{" "}
          </p>
        </span>
        <AddProductType />
      </div>
      <PTable products={sampleProducts} />
    </div>
  );
};

export default ProductTypes;
