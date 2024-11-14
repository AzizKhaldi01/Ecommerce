import { useState } from "react";
import PTable from "./ProductType/PTable";
import AddProductType from "./ProductType/AddProductType";
import AddButton from "./ProductType/AddButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { setProduct } from "../../features/Product/productSlice";

const ProductTypes = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [images, setImages] = useState([]);

  const variants = useSelector((state: RootState) => state.product.variants);
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const deleteType = (id: any) => {
    const updatedVariants = variants.filter((item) => item.id !== id);
    dispatch(setProduct({ ...product, variants: updatedVariants }));
  };

  const noTypes = variants?.length > 0;

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
        <AddProductType
          setImages={setImages}
          images={images}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          noTypes={noTypes}
        />
      </div>
      {noTypes && <PTable deleteType={deleteType} product={variants} />}

      {/* button to add the new type when there is no type */}
      {!noTypes && <AddButton onClick={() => setIsModalOpen(true)} />}
    </div>
  );
};

export default ProductTypes;
