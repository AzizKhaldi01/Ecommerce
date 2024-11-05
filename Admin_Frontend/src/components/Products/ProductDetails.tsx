import React from "react";
import { motion } from "framer-motion";
import ImageSlider from "../UI/ImageSwiper";
import CustomButton from "../UI/Button";
import { ArrowRight01Icon } from "hugeicons-react";
import PriceDetails from "./ProductDetails/PriceDetails";
import ViwesandOrdersStatus from "./ProductDetails/ViwesandOrdersStatus";
import Actions from "./ProductDetails/Actions";
import GrayLine from "../UI/GrayLine";
import { ProductInfo } from "../../types/ProductInfos";

interface ProductDetailsProps {
  productDetails: ProductInfo | null;
  setproductDetails: React.Dispatch<React.SetStateAction<ProductInfo | null>>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productDetails,
  setproductDetails,
}) => {

  return (
    <div
      className={`md:sticky fixed top-0 z-30 overflow-hidden ${
        productDetails
          ? " md:w-[30%] w-full p-[1rem] px-[1.2rem]  right-0"
          : "  lg:right-0 right-[100%]  md:w-[0%] w-full "
      } bg-white h-[100vh] duration-200 rounded-md`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3>{productDetails?.title}</h3>
          <CustomButton variant="text">
            <div
              onClick={() => setproductDetails(null)}
              className="flex gap-1 text-xs items-center text-black"
            >
              Close <ArrowRight01Icon size={18} />
            </div>
          </CustomButton>
        </div>
        <div className="w-full relative">
          <ImageSlider images={productDetails?.images || []} />
        </div>
        <PriceDetails
          price={productDetails?.price || 0}
          discount={productDetails?.discount || 0}
        />
        <GrayLine />
        <ViwesandOrdersStatus
          orders={productDetails?.orders || 0}
          ViwesNumber={productDetails?.ViwesNumber || 0}
        />
        <Actions
          slog={productDetails?.slog || ""}
          setproductDetails={setproductDetails}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
