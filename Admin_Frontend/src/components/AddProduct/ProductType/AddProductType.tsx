import { Add01Icon } from "hugeicons-react";
import React, { useState } from "react";
import Button from "../../UI/Button";
import UiModal from "../../UI/Modal";
import ProductTypeImages from "../ProductType/ProductTypeImages";
import ProductTypeGeneralInfos from "../ProductType/ProductTypeGeneralInfos";
import AvailibleSizes from "../ProductType/AvailibleSizes";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { setProduct } from "../../../features/Product/productSlice";
import { useDispatch } from "react-redux";
import Notification from "../../UI/Notification";

interface AddProductTypeProps {
  availableCategories?: string[];
  noTypes?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: any;
  images: File[];
  setImages: any;
}

const AddProductType: React.FC<AddProductTypeProps> = ({
  noTypes,
  isModalOpen,
  images,
  setImages,
  setIsModalOpen,
}) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    stock: 0,
    price: 0,
  });

  const [sizes, setSizes] = useState<{ size: string; quantity: number }[]>([]);

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product);

  const acceptProductType = () => {
    const variantsData = {
      id: product.variants.length + 1,
      title: inputValues.title,
      availableSizes: sizes,
      images: images,
      quantity: inputValues.stock,
      price: inputValues.price,
    };
    const updatedVariants = [...(product.variants || []), variantsData];
    dispatch(setProduct({ ...product, variants: updatedVariants }));
    setIsModalOpen(false);
  };

  const HandelCloseFilter = () => {
    setIsModalOpen(false);
  };

  const fullImages = images.length > 4;

  return (
    <div className=" relative">
      {product.title}
      {product.description}
      {noTypes && (
        <Button
          onClick={() => setIsModalOpen(true)}
          rippleColor="white"
          variant="contained"
        >
          <div className=" flex   text-white  gap-2 lg:text-sm text-xs items-center">
            <Add01Icon className="  lg:scale-100  scale-75 " />
          </div>
        </Button>
      )}

      <UiModal
        width={" w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]"}
        open={isModalOpen}
        content={
          <div className=" max-h-[90vh] gap-5 flex flex-col ">
            {/* <Notification
              text="Warning: Check your inputs."
              type="fail"
              position="top-right"
            /> */}
            <div className=" gap-5 px-2 flex flex-col overflow-y-auto overflow-x-hidden">
              <h3>Add new type</h3>
              <ProductTypeImages setImages={setImages} images={images} />
              <ProductTypeGeneralInfos
                setInputValues={setInputValues}
                inputValues={inputValues}
              />
              <AvailibleSizes
                maxQuntety={inputValues.stock}
                sizes={sizes}
                setSizes={setSizes}
              />
            </div>

            {/* actions save & cancel */}
            <div className=" pt-1 flex justify-between w-full">
              <Button
                rounded
                onClick={HandelCloseFilter}
                styles="text-black"
                variant="outlined"
              >
                <p className="  font-medium  px-2 py-1 ">Cancel</p>
              </Button>
              <Button rippleColor="white" rounded onClick={acceptProductType}>
                <p className="  font-medium  px-2 py-1 ">Save</p>
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AddProductType;
