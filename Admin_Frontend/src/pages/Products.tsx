import React, { useEffect, useState } from "react";
import ProductDetails from "../components/Products/ProductDetails";
import ProductList from "../components/Products/ProductList";
import ProductsFilter from "../components/Products/ProductsFilter";
import { getProductInfosAPI, getProducts } from "../Api/productsAPI";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import { ProductType } from "../types/Product";
import DisplaySwitcher from "../components/UI/DisplaySwitcher";
import { PlusSignIcon, ProductLoadingIcon } from "hugeicons-react";
import { FilterItems } from "../types/FilterTypes";
import { ProductInfo } from "../types/ProductInfos";
import { motion } from "framer-motion";
import Skeleton from "../components/UI/Skeleton";
import PageTitle from "../components/UI/PageTitle";
import { avalibaleCategories } from "../assets/data/FilterData";

const Products: React.FC = () => {
  const [productDetails, setproductDetails] = useState<ProductInfo | null>(
    null
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const [slog, setSlog] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [productInfosIsLoading, setProductInfosIsLoading] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterItems | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isTable, setIsTable] = useState<boolean>(false);
  const limit = 10;
  const page = 1;

  // const getProductDetails = () => {
  //   setproductDetails(!productDetails);
  // };

  

  // get all products with pagination
  useEffect(() => {
    const HandelGetProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({ page, limit });

        setProducts(data.products);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
      }
    };
    HandelGetProducts();
  }, []);

  // Product info
  const getProductInfos = async (slog: string) => {
    setProductInfosIsLoading(true);
    console.log(slog);
    try {
      const data = await getProductInfosAPI(slog);
      setSlog(slog);
      setproductDetails(data);
      setProductInfosIsLoading(false);
    } catch (error) {
      setProductInfosIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-row gap-2   lg:mx-3 mx-1 items-start justify-between  ">
      <div
        className={`  lg:p-5 p-[1rem] duration-200 ${
          productDetails ? " md:w-[70%] w-full " : " w-full "
        } bg-white  h-full  gap-10  rounded-md flex flex-col`}
      >
        <div className=" flex w-full  justify-between items-center ">
          <PageTitle
            icon={<ProductLoadingIcon size={27} className=" " />}
            title="Products"
          />
          <Link to={"/Products-add"}>
            <Button variant="outlined" rounded>
              <span className=" flex items-center gap-2 py-1 justify-center">
                <p className=" text-sm">Add Product</p>
                <PlusSignIcon size={16} />
              </span>
            </Button>
          </Link>
        </div>

        <div className=" flex flex-col  justify-start relative  gap-4   w-full">
          {/* search & filter */}
          <div className=" flex  lg:flex-row   gap-3  flex-col-reverse  w-full sticky top-0  justify-between  lg:items-center ">
            <input
              type="text"
              placeholder="Search"
              className="  lg:w-[30%]  w-[100%] h-[2.5rem] rounded-full bg-gray-100 px-3  "
            />
            <div className=" flex   w-full  lg:justify-end justify-between lg:gap-5 gap-1 items-center">
              <ProductsFilter
                selectedFilter={selectedFilter}
                SetSelectedFilter={setSelectedFilter}
                availableCategories={avalibaleCategories}
              />
              <DisplaySwitcher isTable={isTable} setIsTable={setIsTable} />
            </div>
          </div>
          {/* products list */}
          <ProductList
            selectedSlog={slog}
            getProductInfos={getProductInfos}
            isTable={isTable}
            isLoading={loading}
            products={products}
            isProductDetailsOpen={productDetails ? true : false}
          />
        </div>
      </div>
      {/* product details */}
      <ProductDetails
        setproductDetails={setproductDetails}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Products;
