import React from "react";
import { checkLength } from "../../utils/TextLengthChecker";
import ProductsTable from "./ProductTableColumns";
import Skeleton from "../UI/Skeleton";

interface ProductsItem {
  image: string;
  title: string;
  price: number;
  sold: number;
  slog: string;
  stock: number;
}

interface ProductsListProps {
  products: ProductsItem[];
  isLoading: boolean;
  isProductDetailsOpen: boolean;
  isTable: boolean;
  selectedSlog: string;
  getProductInfos: (slog: string) => void;
}
const ProductList: React.FC<ProductsListProps> = ({
  products,
  isLoading,
  selectedSlog,
  isTable,
  getProductInfos,
  isProductDetailsOpen,
}) => {
  return (
    <div className=" flex  flex-col">
      {isTable ? (
        <ProductsTable products={products} />
      ) : (
        <div
        className={`grid gap-4 ${
          !isProductDetailsOpen
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
          {products.map((item, index) => (
            <div
              onClick={() => getProductInfos(item.slog)}
              key={index}
              className={`${
                selectedSlog === item.slog ? "border-[1px] border-main/50" : ""
              }  cursor-pointer group  rounded-xl  overflow-hidden mb-4`}
            >
              <div className=" w-full  lg:h-[13rem] h-[10rem] rounded-xl  overflow-hidden   relative ">
                <img
                  src={item.image}
                  alt={item.title}
                  className=" w-full h-full absolute top-0 right-0  object-cover    group-hover:scale-125  duration-200 "
                />
              </div>

              <div className=" bg-gray-50 flex flex-col text-sm pt-4 -mt-2 gap-1 p-1 px-2 rounded-b-lg ">
                <span className=" flex w-full  justify-between items-center">
                  <h3 className="  mb-1">
                    {checkLength({ text: item.title, Length: 15 })}
                  </h3>
                  <p className="text-gray-700 mb-1"> ${item.price}</p>
                </span>
                <span className=" flex w-full  justify-between items-center">
                  <p className="text-gray-700 mb-1">Sold: {item.sold}</p>
                  <p className="text-gray-700">Stock: {item.stock}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div
          className={`grid  ${
            !isProductDetailsOpen ? " grid-cols-5 " : "grid-cols-4"
          } gap-4`}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              type="product"
              index={index}
              className=" w-full"
              rows={1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
