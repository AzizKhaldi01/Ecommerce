import React from "react";
import { ProductInfo } from "../../../types/ProductInfos";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";

interface ActionsProps {
  setproductDetails: React.Dispatch<React.SetStateAction<ProductInfo | null>>;
  slog: string;
}

const Actions: React.FC<ActionsProps> = ({ setproductDetails, slog }) => {
  const HandelCloseFilter = () => {
    setproductDetails(null);
  };

  return (
    <div className="">
      <div className=" pt-7 flex justify-between w-full">
        <Button
          onClick={HandelCloseFilter}
          styles="text-black"
          variant="outlined"
        >
          Close
        </Button>
        <Button>
          <Link to={`product/${slog}`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
};

export default Actions;
