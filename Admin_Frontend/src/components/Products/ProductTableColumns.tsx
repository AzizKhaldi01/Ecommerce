// src/components/ProductsTable/ProductsTable.tsx
import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ProductType } from "../../types/Product";
interface ProductsTableProps {
  products: ProductType[];
  onImageClick?: (id: number) => void;
  onTitleClick?: (id: number) => void;
  onSoldClick?: (id: number) => void;
  onStockClick?: (id: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onImageClick,
  onTitleClick,
  onSoldClick,
  onStockClick,
}) => {
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <div className=" flex h-full items-center ">
          <img
            src={params.value as string}
            alt="Product"
             className=" w-[60px] h-[60px]  rounded-[50%] object-cover "
            // onClick={() => onImageClick(params.row.id)}
          />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <span
          // onClick={() => onTitleClick(params.row.id)}
          style={{ cursor: "pointer" }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "sold",
      headerName: "Sold",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <span
          // onClick={() => onSoldClick(params.row.id)}
          style={{ cursor: "pointer" }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <span
          // onClick={() => onStockClick(params.row.id)}
          style={{ cursor: "pointer" }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        rowHeight={70}
        getRowId={(row) => row.title} // Or another unique field
      />
    </div>
  );
};

export default ProductsTable;
