import { Button } from "@mui/material";
import { ArrowDown01Icon, Delete02Icon, Edit01Icon } from "hugeicons-react";
import React, { useState } from "react";

interface DataTableProp {
  product: any; 
  deleteType: (id: any) => void; 
}

interface Size {
  size: string;
  quantity: number;
}

const PTable: React.FC<DataTableProp> = ({ product, deleteType }) => {
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const toggleDetailPanel = (index: number) => {
    setOpenPanel(openPanel === index ? null : index);
  };

  const headers = [
    { label: "", width: "w-5" },
    { label: "Image" },
    { label: "Name" },
    { label: "Stock" },
    { label: "Price" },
    { label: "Actions" },
  ];

  return (
    <div className="container  overflow-auto">
      <table className="min-w-full bg-white  rounded-md ">
        <thead className=" rounded-md">
          <tr className="  ">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`py-4 px-4 border-b font-medium text-sm ${
                  header.width || ""
                }`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {product.map((row: any, index: number) => (
            <React.Fragment key={index}>
              <tr className="text-center">
                <td className="py-3 px-4 border-b w-5 ">
                  <button
                    onClick={() => toggleDetailPanel(index)}
                    className="text-blue-500 hover:underline"
                  >
                    <ArrowDown01Icon
                      className={`transition-transform ${
                        openPanel === row.id ? "" : "-rotate-90"
                      }`}
                    />
                  </button>
                </td>

                <td className="py-2 px-4 border-b">
                  {typeof row.images[0] === "string" ? (
                    <img
                      src={row.images[0]}
                      alt="Product"
                      className="w-12 h-12 rounded-[50%] mx-auto"
                    />
                  ) : row.images[0] instanceof File ? (
                    <a href={URL.createObjectURL(row.images[0])} download>
                      <img
                        src={URL.createObjectURL(row.images[0])}
                        alt="Product"
                        className="w-12 h-12 rounded-[50%] mx-auto"
                      />
                    </a>
                  ) : null}
                </td>
                <td className="py-2 px-4 border-b">{row.title}</td>
                <td className="py-2 px-4 border-b">{row.quantity}</td>
                <td className="py-2 px-4 border-b">{row.price}</td>
                <td className="py-2 px-4 border-b">
                  <div className=" flex gap-1 items-center justify-center h-full ">
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => console.log("Edit", row.id)}
                    >
                      <Edit01Icon />
                    </Button>
                    <span className=" h-[60%] w-[1px] bg-gray-300 "></span>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deleteType(row.id)}
                    >
                      <Delete02Icon />
                    </Button>
                  </div>
                </td>
              </tr>

              {openPanel === index && (
                <tr className=" w-full ">
                  <td colSpan={6} className="py-4  border-b">
                    <div className=" px-[10%] justify-between flex text-left">
                      {row.availableSizes?.map((size: Size, index: number) => (
                        <div
                          className=" justify-center items-center flex flex-col"
                          key={index}
                        >
                          <p className=" font-medium border-x px-16">
                            {size.quantity}
                          </p>{" "}
                          {size.size}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PTable;
