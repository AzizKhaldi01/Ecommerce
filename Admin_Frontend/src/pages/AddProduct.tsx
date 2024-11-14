import React, { useState } from "react";
import PageTitle from "../components/UI/PageTitle";
import { ArrowRight02Icon, ProductLoadingIcon } from "hugeicons-react";
import CustomButton from "../components/UI/Button";
import { Link } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import GeneralInformation from "../components/AddProduct/GeneralInformation";
import ProductTypes from "../components/AddProduct/ProductTypes";
import PImages from "../components/AddProduct/PImages";
import ProductPrices from "../components/AddProduct/ProductPrices";

const AddProduct: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className=" lg:mx-3 mx-1 overflow-hidden">
      <div className=" flex flex-col h-full w-full bg-white rounded-lg   gap-2  lg:p-5 p-[1rem]    ">
        <div className=" flex   justify-between w-full items-center">
          <PageTitle
            icon={<ProductLoadingIcon size={27} className=" " />}
            title="Add Product"
          />
          {/* save & go back btn */}
          <div className=" flex  lg:gap-5 gap-1 items-center">
            <CustomButton rippleColor="white" rounded variant="contained">
              <span className=" px-2 py-1">Save</span>
            </CustomButton>
            <ButtonBase color="white">
              <Link to={"/Products"}>
                <ArrowRight02Icon />
              </Link>
            </ButtonBase>
          </div>
        </div>

        <div className=" flex gap-2 flex-col  lg:flex-row  pt-5">
          {/* left */}
          <div className=" flex flex-col gap-2  lg:w-[65%] w-full ">
            <GeneralInformation />
            <ProductTypes />
          </div>

          {/* right */}
          <div className="  w-full lg:w-[35%] overflow-hidden flex h-[110vh]  flex-col gap-2 ">
            <ProductPrices />
            <PImages images={images} setImages={setImages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
