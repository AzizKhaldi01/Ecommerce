// src/components/ProductsTable/ProductsTable.tsx
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowHeightParams,
} from "@mui/x-data-grid";
import { IconButton, Box, Button, Typography } from "@mui/material";
import { Delete02Icon, Edit01Icon } from "hugeicons-react";

interface ProductType {
  id: number;
  image: string;
  name: string;
  stock: number;
  price: string;
  sizes?: { [key: string]: number };
}

interface ProductsTableProps {
  products: ProductType[];
}

const PTable: React.FC<ProductsTableProps> = ({ products }) => {
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  const toggleRow = (id: number) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const columns: GridColDef[] = [
    {
      field: "expand",
      headerName: "",
      flex:0.2,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => toggleRow(params.row.id)}>
          {openRows[params.row.id] ? "-" : "+"}
        </IconButton>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.value as string}
          alt="Product"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex:1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex:1,
    },
    {
      field: "price",
      headerName: "Price",
      flex:1,
    },
    {
      field: "actions",
      headerName: "Action",
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <div className=" flex gap-1 items-center justify-center h-full " >
          <Button
            variant="text"
            color="primary"
            onClick={() => console.log("Edit", params.row.id)}
          >
            <Edit01Icon/>
          </Button>
          <span className=" h-[60%] w-[1px] bg-gray-300 "></span>
          <Button
            variant="text"
            color="error"
            onClick={() => console.log("Remove", params.row.id)}
          >
            <Delete02Icon/>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={70}
        getRowHeight={(params: GridRowHeightParams) =>
          openRows[params.id as number] ? 150 : 70
        }
        disableRowSelectionOnClick
        hideFooter
      />
      {products.map((product) =>
        openRows[product.id] ? (
          <Box
            key={`detail-${product.id}`}
            sx={{ pl: 6, py: 1, backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="body2">Sizes:</Typography>
            <Box display="flex" gap="16px">
              {product.sizes &&
                Object.entries(product.sizes).map(([size, qty]) => (
                  <Typography key={size} variant="body2">
                    <strong>{size}</strong>: {qty}
                  </Typography>
                ))}
            </Box>
          </Box>
        ) : null
      )}
    </div>
  );
};

export default PTable;
